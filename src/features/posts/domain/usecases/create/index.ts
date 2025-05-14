import { PostEntity } from "@posts/domain/entities/post";
import PostRepository from "@posts/domain/repository";

/**
 * Creates a use case function for creating a new post.
 *
 * @param postRepository - The repository instance responsible for handling post persistence.
 * @returns An asynchronous function that takes a PostEntity and returns the created PostEntity.
 */
export const CreatePostUseCase = (postRepository: PostRepository) => {
  return async (post: PostEntity): Promise<PostEntity> => {
    return await postRepository.create(post);
  }
}