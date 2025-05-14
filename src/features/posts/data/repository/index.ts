
import { PostApiDataSourceImpl } from "@posts/data/datasources";
import { PostMapper } from "@posts/data/mappers/post";
import { PostResponseMapper } from "@posts/data/mappers/post_response";
import { PostModel } from "@posts/data/models/post";
import { PostResponseModel } from "@posts/data/models/post_response";
import { PostEntity } from "@posts/domain/entities/post";
import { PostResponseEntity } from "@posts/domain/entities/post_response";
import PostRepository from "@posts/domain/repository";
import { DeleteImageParams, UploadImageParams } from "@shared/interfaces/upload";

/**
 * Implementation of the PostRepository interface, providing methods to interact
 * with the post data source. This class handles CRUD operations for post entities,
 * converting between PostEntity and PostModel as needed.
 */
export class PostRepositoryImpl implements PostRepository {
  constructor(private dataSource: PostApiDataSourceImpl) { }

  /**
   * Retrieves all posts from the data source, maps them to domain models, and returns them as a PostResponseEntity.
   *
   * This method:
   * - Fetches raw post documents from the data source.
   * - Converts each document into a `PostModel` instance.
   * - Wraps the list of models into a `PostResponseModel`.
   * - Maps the response model to a domain-level `PostResponseEntity` using `PostResponseMapper`.
   *
   * @returns A promise that resolves to a `PostResponseEntity` containing the list of posts.
   */
  async get(): Promise<PostResponseEntity> {
    const res = await this.dataSource.get();
    const posts: PostModel[] = [];

    res.forEach((doc) => {
      const data = doc.data();
      const newPostModel = new PostModel(
        doc.id,
        data.title,
        data.description,
        data.createDate ?? ''
      );
      posts.push(newPostModel);
    });

    const postEntityResponse = PostResponseMapper.toEntity(new PostResponseModel(0, 0, posts.length, posts));
    return postEntityResponse;
  }

  /**
   * Creates a new post in the data source and returns the created PostEntity.
   *
   * This method:
   * - Converts the domain-level PostEntity to a persistence model using `PostMapper.toModel`.
   * - Sends the model to the data source for creation.
   * - Updates the created document with its own ID (e.g., for consistency in the stored data).
   * - Retrieves the created document snapshot.
   * - Converts the persisted data back into a domain-level PostEntity using `PostMapper.toEntity`.
   *
   * @param post - The PostEntity to be created.
   * @returns A promise that resolves to the created PostEntity.
   * @throws Will throw an error if the created document does not exist or its data is missing.
   */
  async create(post: PostEntity): Promise<PostEntity> {
    const postRef = await this.dataSource.create(PostMapper.toModel(post));

    await postRef.update({ id: postRef.id });

    const docSnapshot = await postRef.get();
    if (!docSnapshot.exists) {
      throw new Error(`Post "${postRef.id}" does not exist`);
    }

    const data = docSnapshot.data();
    if (!data) {
      throw new Error('Failed to retrieve post data after creation');
    }

    return PostMapper.toEntity(new PostModel(
      data.id,
      data.title,
      data.description,
      data.createDate ?? ''
    ));
  }

  /**
   * Updates an existing post in the data source and returns the updated PostEntity.
   *
   * This method:
   * - Obtains a reference to the post document using the provided ID.
   * - Maps the input `PostEntity` to a persistence model using `PostMapper.toModel`.
   * - Updates the post document with the new data.
   * - Fetches the updated document snapshot.
   * - Validates the existence and data of the updated document.
   * - Converts the updated data back into a domain-level `PostEntity`.
   *
   * @param id - The ID of the post to update.
   * @param post - The `PostEntity` containing the new post data.
   * @returns A promise that resolves to the updated `PostEntity`.
   * @throws Will throw an error if the document does not exist or its data is missing after update.
   */
  async update(id: string, post: PostEntity): Promise<PostEntity> {
    const postRef = await this.dataSource.update(id);

    const postModel = PostMapper.toModel(post);
    await postRef.update(postModel.toJSON());

    const docSnapshot = await postRef.get();
    if (!docSnapshot.exists) {
      throw new Error(`Post "${id}" does not exist`);
    }

    const data = docSnapshot.data();
    if (!data) {
      throw new Error('Failed to retrieve post data after update');
    }

    return PostMapper.toEntity(new PostModel(
      data.id,
      data.title,
      data.description,
      data.createDate ?? ''
    ));
  }

  /**
   * Deletes a post from the data source and returns the deleted post's data as a `PostEntity`.
   *
   * This method:
   * - Obtains a reference to the post document by ID.
   * - Fetches the current snapshot of the post before deletion.
   * - Verifies the document exists and contains data.
   * - Deletes the document from the data source.
   * - Maps the previously fetched data to a domain-level `PostEntity` for return.
   *
   * @param id - The ID of the post to be deleted.
   * @returns A promise that resolves to the deleted `PostEntity`, containing the post's last known state.
   * @throws Will throw an error if the document does not exist or its data is missing before deletion.
   */
  async delete(id: string): Promise<PostEntity> {
    const postRef = await this.getById(id);

    if (!postRef) {
      throw new Error(`Post "${id}" does not exist`);
    }

    await this.dataSource.delete(id);

    return postRef;
  }

  /**
   * Retrieves a post from the data source by their unique ID and returns it as a `PostEntity`.
   *
   * This method:
   * - Requests a reference to the post document using the provided ID.
   * - Checks whether the document exists.
   * - Verifies that the document contains valid post data.
   * - Maps the retrieved data to a domain-level `PostEntity` object.
   *
   * @param id - The unique identifier of the post to retrieve.
   * @returns A promise that resolves to the corresponding `PostEntity`.
   * @throws Will throw an error if the document does not exist or its data is missing.
   */
  async getById(id: string): Promise<PostEntity> {
    const postRef = await this.dataSource.getById(id);

    if (!postRef.exists) {
      throw new Error(`Post "${id}" does not exist`);
    }

    const data = postRef.data();
    if (!data) {
      throw new Error('Failed to retrieve post data after get');
    }

    return PostMapper.toEntity(new PostModel(
      data.id,
      data.title,
      data.description,
      data.createDate ?? ''
    ));
  }
}
