import { di } from "@core/di";
import { handleError } from "@posts/infrastructure/errors";
import { Request, Response } from "express";
import { PostIdParamSchema } from "./schema";

/**
 * Service instance for retrieving a post by their ID.
 *
 * This constant references the `getByIdPostUseCase` from the post dependency injection container.
 * It encapsulates the business logic required to fetch a specific post by their unique identifier (ID) 
 * from the data source.
 */
const postGetByIdSvc = di.post.getByIdPostUseCase;

/**
 * Handles the HTTP request to retrieve a specific post by their ID.
 *
 * This function:
 * - Extracts the `id` parameter from the request URL.
 * - Invokes the corresponding use case to fetch the post entity from the data source.
 * - Returns the post entity in JSON format with HTTP status 200.
 * - Handles any errors that occur during the process and sends an appropriate error response.
 *
 * @param req - The incoming HTTP request containing the post ID in `req.params`.
 * @param res - The HTTP response object used to send back the retrieved post or an error message.
 */
const getPostById = async (req: Request, res: Response) => {
  try {
    const { id } = PostIdParamSchema.parse(req.params);
    const postRef = await postGetByIdSvc(id);

    res.status(200).json(postRef);
  } catch (error) {
    handleError(error, res, 'Error fetching post');
  }
};

export default getPostById;