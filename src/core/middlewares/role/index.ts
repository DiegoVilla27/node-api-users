import { di } from '@core/di';
import { Role } from '@shared/interfaces/role';
import { NextFunction, RequestHandler, Response } from 'express';
import { AuthRequest } from '@core/middlewares/jwt/interfaces';

/**
 * Service instance for retrieving a user by their ID.
 *
 * This constant references the `getByIdUserUseCase` from the user dependency injection container.
 * It encapsulates the business logic required to fetch a specific user by their unique identifier (ID) 
 * from the data source.
 */
const userGetByIdSvc = di.user.getByIdUserUseCase;

/**
 * Middleware to check if the user has the required role(s) to access a route.
 *
 * - Expects the token to be sent in the `Authorization` header as a Bearer token.
 * - If no token is provided, responds with 401 Unauthorized.
 * - If the token is invalid or expired, responds with 401 Unauthorized and a specific message.
 * - If the user role is not found, responds with a 403 Forbidden message.
 * - If the user role does not match any of the allowed roles, responds with a 403 Forbidden message.
 * - If the user is an 'admin', allows access to all routes without role validation.
 */
export function checkRoleMiddleware(allowedRoles: Role[]): RequestHandler {
  return async (req: AuthRequest, res: Response, next: NextFunction): Promise<any> => {
    try {
      const { role } = await userGetByIdSvc(req.user!.id);

      if (!role) {
        return res.status(403).json({ message: 'User role not found' });
      }

      // Allow all routes to be accessible if the user is an 'admin'
      if (role === 'admin') {
        return next(); // Admin can access everything
      }

      // Check if user role matches allowed roles
      if (!allowedRoles.includes(role)) {
        return res.status(403).json({ message: 'Access denied: insufficient permissions' });
      }

      return next(); // Proceed to next middleware or route handler
    } catch (error) {
      return res.status(401).json({ message: 'Invalid or expired token' });
    }
  };
}

export default checkRoleMiddleware;