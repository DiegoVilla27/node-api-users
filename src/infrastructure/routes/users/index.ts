import routes from '@app/routes';
import { Router } from 'express';
import { getUsers, createUser, updateUser, deleteUser } from '@infrastructure/controllers/users';

/**
 * Sets up the user-related routes for the application.
 * 
 * This router handles the following endpoints:
 * - GET /users: Retrieves a list of users.
 * - POST /users: Creates a new user.
 * - PUT /users/:id: Updates an existing user by ID.
 * - DELETE /users/:id: Deletes a user by ID.
 * 
 * Utilizes organization-specific controllers for handling
 * user operations and Express for routing.
 */
const router = Router();

router.get(routes.users, getUsers);

router.post(routes.users, createUser);

router.put(`${routes.users}/:id`, updateUser);

router.delete(`${routes.users}/:id`, deleteUser);

export default router;