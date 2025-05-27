
import { PostApiDataSourceImpl } from "@posts/data/datasources";
import { PostRepositoryImpl } from "@posts/data/repository";
import { CreatePostUseCase } from "@posts/domain/usecases/create";
import { DeletePostUseCase } from "@posts/domain/usecases/delete";
import { GetPostsUseCase } from "@posts/domain/usecases/get";
import { GetByIdPostUseCase } from "@posts/domain/usecases/get_by_id";
import { LikePostUseCase } from "@posts/domain/usecases/like";
import { UpdatePostUseCase } from "@posts/domain/usecases/update";
import { DeleteByUserUseCase } from "../domain/usecases/delete_by_user";

/**
 * Instance of the post API data source.
 *
 * `PostApiDataSourceImpl` is the concrete implementation responsible for handling
 * all low-level operations related to post data, such as making HTTP requests to an external API
 * or backend service. It acts as the data provider for the repository layer.
 *
 * Responsibilities:
 * - Send HTTP requests (GET, POST, PUT, DELETE) to external APIs.
 * - Serialize and deserialize post data.
 * - Handle API-specific logic such as endpoints, headers, and response formats.
 */
const postApiDataSource = new PostApiDataSourceImpl();

/**
 * Instance of the post repository.
 *
 * `PostRepositoryImpl` is the concrete implementation of the post domain repository.
 * It receives a data source (`postApiDataSource`) and abstracts the data retrieval and
 * manipulation logic for higher layers (such as use cases).
 *
 * Responsibilities:
 * - Act as a bridge between the data source layer and the domain layer.
 * - Map and transform raw data into domain entities.
 * - Encapsulate business logic related to post persistence.
 * - Provide a clean and consistent API for post operations (CRUD, image upload, etc.).
 */
const postRepository = new PostRepositoryImpl(postApiDataSource);

/**
 * Dependency injection container for post-related use cases.
 *
 * The `diPosts` object serves as a centralized provider for all post domain use cases.
 * Each use case is instantiated with the necessary dependencies, particularly the `postRepository`,
 * which abstracts the data access layer.
 *
 * This structure supports separation of concerns and allows easier testing and scalability.
 */
export const diPosts = {
  /**
   * Use case responsible for retrieving all posts from the repository.
   *
   * - Calls the repository's method to fetch a list of posts.
   * - Returns domain-mapped post entities.
   * - Typically used in listing or administrative views.
   */
  getPostsUseCase: GetPostsUseCase(postRepository),

  /**
   * Use case responsible for creating a new post.
   *
   * - Receives post creation data (e.g., title, description, etc.).
   * - Validates and sends the data to the repository for persistence.
   * - Returns the created post or status confirmation.
   */
  createPostsUseCase: CreatePostUseCase(postRepository),

  /**
   * Use case responsible for updating an existing post by ID.
   *
   * - Accepts an identifier and updated post data.
   * - Delegates to the repository to perform the update.
   * - Returns the updated post or success status.
   */
  updatePostsUseCase: UpdatePostUseCase(postRepository),

  /**
   * Use case responsible for deleting a post by ID.
   *
   * - Receives a post identifier.
   * - Invokes the repository to remove the post from the data source.
   * - Returns a success/failure status.
   */
  deletePostsUseCase: DeletePostUseCase(postRepository),

  /**
   * Use case responsible for retrieving a single post by ID.
   *
   * - Accepts a post identifier.
   * - Fetches and returns the corresponding post entity from the repository.
   * - Used in detail or profile views.
   */
  getByIdPostUseCase: GetByIdPostUseCase(postRepository),

  /**
   * Use case responsible for updating like an existing post by ID.
   *
   * - Accepts an identifier and updated post data.
   * - Delegates to the repository to perform the update.
   * - Returns the updated post or success status.
   */
  likePostsUseCase: LikePostUseCase(postRepository),

  /**
   * Use case responsible for deleting posts by a specific user ID.
   * 
   * This use case:
   * - Accepts a user ID as input.
   * - Delegates the deletion operation to the post repository.
   * - Returns a promise that resolves when all posts of the user have been deleted.
   */
  getPostsByUserUseCase: DeleteByUserUseCase(postRepository),
};
