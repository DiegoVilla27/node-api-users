import { PostEntity } from "@posts/domain/entities/post";
import { PostResponseEntity } from "@posts/domain/entities/post_response";

/**
 * Interface for post repository operations.
 * Provides methods for managing post entities, including creation, retrieval.
 *
 * This interface abstracts the logic for interacting with the data source (e.g., databases, APIs)
 * and defines a clean contract for performing post-related operations.
 *
 * **Methods:**
 * - `get`: Retrieves all posts.
 * - `create`: Creates a new post in the system.
 * - `update`: Updates the details of an existing post by ID.
 * - `delete`: Deletes a post from the system by ID.
 * - `getById`: Retrieves a post by their unique identifier.
 */
export interface PostRepository {
  /**
   * Retrieves all posts.
   *
   * @returns {Promise<PostResponseEntity>} A promise resolving to the post's information.
   */
  get(): Promise<PostResponseEntity>;

  /**
   * Creates a new post in the system.
   *
   * @param post - The post entity containing the details of the post to be created.
   * @returns {Promise<PostEntity>} A promise resolving to the created post entity.
   */
  create(post: PostEntity): Promise<PostEntity>;

  /**
   * Updates the details of an existing post.
   *
   * @param id - The unique identifier of the post to update.
   * @param post - The updated post entity data.
   * @param token - Token of the user logged JWT.
   * @returns {Promise<void>} A promise resolving to the updated post entity.
   */
  update(id: string, post: PostEntity, token: string): Promise<void>;

  /**
   * Deletes a post from the system.
   *
   * @param id - The unique identifier of the post to delete.
   * @param token - Token of the user logged JWT.
   * @returns {Promise<PostEntity>} A promise resolving to the deleted post entity.
   */
  delete(id: string, token: string): Promise<PostEntity>;

  /**
   * Retrieves a post by their unique identifier.
   *
   * @param id - The unique identifier of the post to retrieve.
   * @returns {Promise<PostEntity>} A promise resolving to the retrieved post entity.
   */
  getById(id: string): Promise<PostEntity>;

  /**
   * Updates the likes of an existing post.
   *
   * @param id - The unique identifier of the post to update.
   */
  like(id: string): Promise<void>;
}

export default PostRepository;