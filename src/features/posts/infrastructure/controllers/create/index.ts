import { di } from "@core/di";
import { PostEntity } from "@posts/domain/entities/post";
import { handleError } from "@posts/infrastructure/errors";
import { Request, Response } from "express";
import { PostCreateSchema } from "./schema";

/**
 * Service instance for creating a new post.
 *
 * This constant holds the reference to the `createPostsUseCase` from the post dependency container.
 * It is used to handle the post creation logic by interacting with the domain layer, ensuring
 * all necessary business rules and validations are applied before persisting the data.
 */
const postCreateSvc = di.post.createPostsUseCase;

/**
 * Handles the creation of a new post.
 *
 * @param req - The HTTP request object, containing the post data in the body.
 * @param res - The HTTP response object used to send back the response.
 *
 * Attempts to create a new post using the data provided in the request body.
 * On success, sends a JSON response with the created post data and a 200 status code.
 * If an error occurs, it is handled and an appropriate error response is sent.
 */
const createPost = async (req: Request, res: Response) => {
  try {
    const postParsed = PostCreateSchema.parse(req.body) as PostEntity;
    const postRes = await postCreateSvc(postParsed);

    res.status(200).json(postRes);
  } catch (error) {
    handleError(error, res, 'Error creating post');
  }
};

export default createPost;