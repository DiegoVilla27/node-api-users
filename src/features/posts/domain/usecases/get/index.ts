import { PostResponseEntity } from "@posts/domain/entities/post_response";
import PostRepository from "@posts/domain/repository";

/**
 * Creates a use case function for retrieving all posts.
 *
 * @param postRepository - The repository instance responsible for fetching posts.
 * @returns An asynchronous function that returns a PostResponseEntity containing the list of posts.
 */
export const GetPostsUseCase = (postRepository: PostRepository) => {
  return async (): Promise<PostResponseEntity> => {
    return await postRepository.get();
  }
}