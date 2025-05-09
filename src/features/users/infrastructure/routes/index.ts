import routes from '@core/routes/interfaces';
import createUser from '@users/infrastructure/controllers/create';
import deleteUser from '@users/infrastructure/controllers/delete';
import getUsers from '@users/infrastructure/controllers/get';
import updateUser from '@users/infrastructure/controllers/update';
import { Router } from 'express';

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
const userRoutes = Router();

userRoutes.get(routes.users, getUsers);
userRoutes.post(routes.users, createUser);
userRoutes.put(`${routes.users}/:id`, updateUser);
userRoutes.delete(`${routes.users}/:id`, deleteUser);

export default userRoutes;