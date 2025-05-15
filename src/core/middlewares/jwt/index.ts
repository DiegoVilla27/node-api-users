import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import { AuthRequest } from './interfaces';

const JWT_SECRET = String(process.env.JWT_SECRET!);

/**
 * Middleware to authenticate requests using a JWT token.
 *
 * - Expects the token to be sent in the `Authorization` header as a Bearer token.
 * - If no token is provided, responds with 401 Unauthorized.
 * - If the token is expired, responds with 401 and a specific message.
 * - If the token is invalid, responds with 401 and a specific message.
 * - On unexpected errors, responds with 500 Internal Server Error.
 *
 * Usage: Attach this middleware to any route that requires authentication.
 */
const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction): any => {
  const token = req.headers.authorization?.split(' ')[1]; // Expected format: 'Bearer <token>'

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload;
    req.user = {
      token,
      id: decoded['id'],
      role: decoded['role'],
      email: decoded['email'],
      ...decoded
    };

    return next(); // Proceed to next middleware or route handler
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ message: 'Token has expired' });
    } else if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ message: 'Invalid token' });
    } else {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }
};

export default authMiddleware;
