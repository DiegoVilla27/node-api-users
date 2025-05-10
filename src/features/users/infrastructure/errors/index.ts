import { Response } from "express";
import { ZodError } from "zod";

/**
 * Handles errors by sending an appropriate HTTP response.
 *
 * @param error - The error object or unknown error to handle.
 * @param res - The Express response object used to send the HTTP response.
 *
 * If the error is an instance of Error, it checks the error message to determine
 * the status code. If the message includes "does not exist", it sends a 404 status.
 * Otherwise, it sends a 500 status. For unknown errors, it defaults to a 500 status
 * with a generic error message.
 */
export const handleError = (
  error: unknown,
  res: Response,
  message: string = "Unknown error occurred"
) => {
  if (error instanceof ZodError) {
    const { formErrors, fieldErrors } = error.flatten();

    const allErrors = [
      ...formErrors,
      ...Object.values(fieldErrors).flat()
    ].join(' | ');

    return res.status(400).json({
      message: allErrors,
      status: 400
    });
  }

  if (error instanceof Error) {
    const isNotFound: boolean = error.message.toLowerCase().includes('does not exist');
    return res.status(isNotFound ? 404 : 500).json({
      message: error.message,
      status: isNotFound ? 404 : 500,
    });
  }
  return res.status(500).json({
    message: message,
    status: 500,
  });
};
