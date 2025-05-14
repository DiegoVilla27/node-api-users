import { PostEntity } from "@posts/domain/entities/post";
import PostRepository from "@posts/domain/repository";

/**
 * Creates a use case function for retrieving a post by their unique identifier.
 *
 * @param postRepository - The repository instance responsible for accessing post data.
 * @returns An asynchronous function that takes a post ID (string) and returns a Promise resolving to a PostEntity.
 */
export const GetByIdPostUseCase = (postRepository: PostRepository) => {
  return async (id: string): Promise<PostEntity> => {
    return await postRepository.getById(id);
  }
}