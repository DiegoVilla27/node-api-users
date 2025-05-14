import PostRepository from "@posts/domain/repository";

/**
 * Use case function for Add like post by ID.
 *
 * @param postRepository - The repository instance responsible for post data operations.
 */
export const LikePostUseCase = (postRepository: PostRepository) => {
  return async (id: string): Promise<void> => {
    return await postRepository.like(id);
  }
}