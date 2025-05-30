import { Response } from "express";
import { ZodError } from "zod";

/**
 * Handles application-level errors and sends a structured HTTP response.
 *
 * This function centralizes the error-handling logic to provide consistent
 * API responses for validation errors (Zod), application errors (Error), and unknown errors.
 *
 * @param error - The error object to handle. Can be an instance of `ZodError`, `Error`, or an unknown value.
 * @param res - The Express `Response` object used to send the HTTP response.
 * @param message - Optional fallback message for unknown errors. Defaults to `"Unknown error occurred"`.
 *
 * ## Behavior:
 *
 * - **ZodError**: Parses and formats field-level validation errors into a single-line message.
 *   Responds with HTTP 400 and includes a human-readable list of field errors.
 *
 * - **Error**: If the message includes `"does not exist"` (case-insensitive), responds with HTTP 404.
 *   Otherwise, responds with HTTP 500 and the original error message.
 *
 * - **Unknown errors**: Returns a generic 500 error with the optional fallback message.
 */
export const handleError = (
  error: unknown,
  res: Response,
  message: string = "Unknown error occurred"
) => {
  if (error instanceof ZodError) {
    const formatted = formatZodErrors(error);
    return res.status(400).json({
      message: formatted,
      status: 400,
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

/**
 * Formats errors generated by a ZodError into a readable string.
 *
 * This function takes the errors (issues) generated by Zod and converts them into
 * a concatenated, readable format. Errors from nested fields are represented
 * with their full "path".
 *
 * @param {ZodError} error - The ZodError object containing the details of the failed validations.
 * 
 * @returns {string} - A string where each error is separated by `|`. 
 *                     Each error consists of the field name and the corresponding error message.
 */
function formatZodErrors(error: ZodError): string {
  return error.issues
    .map((issue) => {
      const path = issue.path.join('.');
      return `${path} - ${issue.message}`;
    })
    .join(' | ');
}