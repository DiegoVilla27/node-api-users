import { PostModel } from "@posts/data/models/post";
import { PostEntity } from "@posts/domain/entities/post";

/**
 * Mapper class for converting between domain entities (`PostEntity`) and persistence models (`PostModel`).
 * 
 * This class provides static methods to convert from one representation to another, ensuring separation
 * between the domain model and the persistence model. 
 *
 * @class
 */
export class PostMapper {

  /**
   * Converts a `PostModel` instance to a `PostEntity` instance.
   *
   * This method takes a persistence model (`PostModel`) and maps it to a domain entity (`PostEntity`).
   * The domain entity contains the necessary business logic and rules, while the persistence model is typically
   * used for database operations. This method helps in separating concerns between different layers of the application.
   * 
   * @param {PostModel} post - The `PostModel` instance to be converted.
   * @returns {PostEntity} A new `PostEntity` instance.
   */
  static toEntity(post: PostModel): PostEntity {
    return new PostEntity(
      post.id,
      post.title,
      post.description,
      post.createDate
    );
  }

  /**
   * Converts a `PostEntity` instance to a `PostModel` instance.
   *
   * This method takes a domain entity (`PostEntity`) and maps it to a persistence model (`PostModel`).
   * The persistence model is typically used for interacting with the database, while the domain entity
   * is used for business logic and manipulation. This method allows for smooth conversion between layers
   * of the application.
   * 
   * @param {PostEntity} post - The `PostEntity` instance to be converted.
   * @returns {PostModel} A new `PostModel` instance.
   */
  static toModel(post: PostEntity): PostModel {
    return new PostModel(
      post.id,
      post.title,
      post.description,
      post.createDate
    );
  }
}