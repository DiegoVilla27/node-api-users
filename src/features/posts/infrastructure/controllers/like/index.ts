import { di } from "@core/di";
import { handleError } from "@posts/infrastructure/errors";
import { Request, Response } from "express";
import { PostIdParamSchema } from "./schema";

/**
 * Service instance for updating an existing post.
 *
 * This constant references the `likePostsUseCase` from the post dependency injection container.
 * It encapsulates the business logic for updating the details of an existing post 
 * in the data source using their unique identifier (ID).
 */
const postLikeSvc = di.post.likePostsUseCase;

/**
 * Updates a post entity based on the provided request parameter.
 * 
 * @param req - The HTTP request object containing post ID in params.
 * @param res - The HTTP response object used to send back the updated post data or an error message.
 * 
 * @throws Will handle and respond with an error if the update process fails.
 */
const likePostById = async (req: Request, res: Response) => {
  try {
    const { id } = PostIdParamSchema.parse(req.params);
    await postLikeSvc(id);

    res.status(200).json({ message: 'Likes updated successfully' });
  } catch (error) {
    handleError(error, res, 'Error updating like post');
  }
};

export default likePostById;