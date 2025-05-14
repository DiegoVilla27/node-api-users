import { PostEntity } from "@posts/domain/entities/post";
import PostRepository from "@posts/domain/repository";

/**
 * Creates a use case function for deleting a post by ID.
 *
 * @param postRepository - The repository instance responsible for handling post operations.
 * @returns An asynchronous function that takes a post ID and returns the deleted PostEntity.
 */
export const DeletePostUseCase = (postRepository: PostRepository) => {
  return async (id: string): Promise<PostEntity> => {
    return await postRepository.delete(id);
  }
}