import { Response } from "express";

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
export const handleError = (error: unknown, res: Response, message: string) => {
  if (error instanceof Error) {
    const status = error.message.includes("does not exist") ? 404 : 500;
    return res.status(status).json({
      message: error.message,
      status,
    });
  }
  return res.status(500).json({
    message: message ?? "Unknown error occurred",
    status: 500,
  });
};
