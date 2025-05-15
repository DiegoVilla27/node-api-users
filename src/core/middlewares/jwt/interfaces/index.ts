import { Request } from "express";

/**
 * Extends the Express Request interface to include an optional user object.
 * The user object contains an token, id, role, and can include additional properties.
 */
export interface AuthRequest extends Request {
  user?: {
    token: string;
    id: string;
    role: string;
    [key: string]: any;
  };
}