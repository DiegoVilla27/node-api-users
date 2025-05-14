import { di } from "@core/di";
import { handleError } from "@posts/infrastructure/errors";
import { Request, Response } from "express";

/**
 * Service instance for retrieving all posts.
 *
 * This constant references the `getPostsUseCase` from the post dependency injection container.
 * It handles the business logic required to fetch a list of posts from the data source,
 * potentially applying filtering, sorting, or pagination logic depending on the implementation.
 */
const postGetSvc = di.post.getPostsUseCase;

/**
 * Handles the HTTP request to retrieve a list of posts.
 *
 * This function interacts with the post services to fetch post data
 * and sends a JSON response with the retrieved posts. In case of an error,
 * it utilizes the handleError function to send an appropriate error response.
 *
 * @param _ - The incoming HTTP request object (unused).
 * @param res - The HTTP response object used to send back the desired HTTP response.
 */
const getPosts = async (_: Request, res: Response): Promise<any> => {
  try {
    const postsRef = await postGetSvc();

    return res.status(200).json(postsRef);
  } catch (error) {
    return handleError(error, res, 'Error fetching posts');
  }
};

export default getPosts;