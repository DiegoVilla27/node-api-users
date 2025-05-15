import { AuthRequest } from "@core/middlewares/jwt/interfaces";
import { di } from "@core/di";
import { handleError } from "@posts/infrastructure/errors";
import { Response } from "express";
import { PostIdParamSchema } from "./schema";

/**
 * Service instance for deleting a post.
 *
 * This constant refers to the `deletePostsUseCase` from the post dependency injection container.
 * It encapsulates the business logic required to delete a post by their unique identifier (ID),
 * ensuring any domain-level validations or side effects are handled appropriately.
 */
const postDeleteSvc = di.post.deletePostsUseCase;

/**
 * Deletes a post based on the provided ID in the request parameters.
 * 
 * @param req - The HTTP request object containing the post ID in the parameters.
 * @param res - The HTTP response object used to send back the response.
 * 
 * @returns A JSON response with the result of the delete operation.
 * 
 * @throws Will handle errors using the handleError function, sending an appropriate
 * response with a status code and error message.
 */
const deletePost = async (req: AuthRequest, res: Response): Promise<any> => {
  try {
    const { id } = PostIdParamSchema.parse(req.params);
    const postRes = await postDeleteSvc(id, req.user!.token);

    res.status(200).json(postRes);
  } catch (error) {
    handleError(error, res, 'Error deleting post');
  }
}

export default deletePost;