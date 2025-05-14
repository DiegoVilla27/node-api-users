import { PostResponseModel } from "@posts/data/models/post_response";
import { PostResponseEntity } from "@posts/domain/entities/post_response";
import { PostMapper } from "@posts/data/mappers/post";

/**
 * Mapper class for converting between the response model (`PostResponseModel`) and the domain entity (`PostResponseEntity`).
 *
 * This class provides static methods to convert from the response model, which is typically used in data 
 * retrieval operations, to the domain entity that is used in the business logic layer.
 *
 * @class
 */
export class PostResponseMapper {

  /**
   * Converts a `PostResponseModel` instance to a `PostResponseEntity` instance.
   *
   * This method takes a `PostResponseModel` (used for data transfer or persistence) and maps it to a `PostResponseEntity`
   * (which represents the domain model used in the application logic). It includes a list of posts, converting each
   * post from the persistence model to the domain entity using the `PostMapper.toEntity` method.
   * 
   * The `PostResponseModel` typically represents a paginated response with post data, while the `PostResponseEntity`
   * represents the processed business logic model used for application purposes.
   * 
   * @param {PostResponseModel} postResponse - The `PostResponseModel` instance to be converted.
   * @returns {PostResponseEntity} A new `PostResponseEntity` instance, which contains the limit, skip, total, and posts
   *         with their data mapped to domain entities.
   */
  static toEntity(postResponse: PostResponseModel): PostResponseEntity {
    return new PostResponseEntity(
      postResponse.limit,
      postResponse.skip,
      postResponse.total,
      postResponse.posts.map((post) => PostMapper.toEntity(post))
    );
  }
}