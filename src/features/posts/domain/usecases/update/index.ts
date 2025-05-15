import { PostEntity } from "@posts/domain/entities/post";
import PostRepository from "@posts/domain/repository";

/**
 * Creates a use case function for updating an existing post by ID.
 *
 * @param postRepository - The repository instance responsible for post data operations.
 * @returns An asynchronous function that takes a post ID and a PostEntity with the updated data
 */
export const UpdatePostUseCase = (postRepository: PostRepository) => {
  return async (id: string, post: PostEntity, token: string): Promise<void> => {
    return await postRepository.update(id, post, token);
  }
}