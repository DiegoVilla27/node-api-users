import { di } from "@core/di";
import { PostEntity } from "@posts/domain/entities/post";
import { handleError } from "@posts/infrastructure/errors";
import { Request, Response } from "express";
import { PostCreateSchema, PostIdParamSchema } from "./schema";

/**
 * Service instance for updating an existing post.
 *
 * This constant references the `updatePostsUseCase` from the post dependency injection container.
 * It encapsulates the business logic for updating the details of an existing post 
 * in the data source using their unique identifier (ID).
 */
const postUpdateSvc = di.post.updatePostsUseCase;

/**
 * Updates a post entity based on the provided request parameters and body.
 * 
 * @param req - The HTTP request object containing post ID in params and post data in the body.
 * @param res - The HTTP response object used to send back the updated post data or an error message.
 * 
 * @throws Will handle and respond with an error if the update process fails.
 */
const updatePost = async (req: Request, res: Response) => {
  try {
    const { id } = PostIdParamSchema.parse(req.params);
    const postParsed = PostCreateSchema.parse(req.body) as PostEntity;
    const postRes = await postUpdateSvc(id, postParsed);

    res.status(200).json(postRes);
  } catch (error) {
    handleError(error, res, 'Error updating post');
  }
};

export default updatePost;