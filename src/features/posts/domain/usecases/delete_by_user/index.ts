import PostRepository from "@posts/domain/repository";

/**
 * Creates a use case for deleting a post by user ID.
 *
 * @param postRepository - The repository instance to interact with post data.
 * @returns An asynchronous function that deletes a post associated with the given user ID.
 * @async
 * @param id - The ID of the user whose post is to be deleted.
 */
export const DeleteByUserUseCase = (postRepository: PostRepository) => {
  return async (id: string): Promise<void> => {
    return await postRepository.deleteByUser(id);
  }
}