/**
 * Defines the required parameters to upload a file to an AWS S3 bucket.
 *
 * This interface is used to encapsulate all the information needed
 * by the AWS SDK when performing a file upload operation.
 *
 * Properties:
 * - `Bucket`: The name of the S3 bucket where the file will be uploaded.
 * - `Key`: The unique identifier (path/filename) for the file in the S3 bucket.
 * - `Body`: The binary data of the file being uploaded (as a Buffer or Uint8Array).
 * - `ContentType`: The MIME type of the file (e.g., 'image/png', 'application/pdf').
 */
export interface UploadParams {
  Bucket: string;
  Key: string;
  Body: Buffer | Uint8Array;
  ContentType: string;
}