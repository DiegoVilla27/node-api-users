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

/**
 * @swagger
 * components:
 *   schemas:
 *     UserEntity:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The unique identifier for the user.
 *         firstName:
 *           type: string
 *           description: The first name of the user.
 *         age:
 *           type: integer
 *           description: The age of the user.
 *         address:
 *           type: object
 *           properties:
 *             country:
 *               type: string
 *               description: The country of the user's address.
 *       required:
 *         - id
 *         - firstName
 *         - age
 *         - address
 * 
 *     UserResponseEntity:
 *       type: object
 *       properties:
 *         limit:
 *           type: integer
 *           description: The maximum number of users to return.
 *         skip:
 *           type: integer
 *           description: The number of users to skip before starting to collect the result set.
 *         total:
 *           type: integer
 *           description: The total number of users available.
 *         users:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/UserEntity'
 *           description: An array of user entities.
 *       required:
 *         - limit
 *         - skip
 *         - total
 *         - users
 * 
 * /api/users:
 *   get:
 *     summary: Get all users
 *     description: Fetches a list of all users from the database with pagination support.
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: A list of users retrieved successfully, including pagination details.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponseEntity'
 *       500:
 *         description: Internal server error occurred while fetching users.
 *       404:
 *         description: No users found or users data does not exist.
 */
userRoutes.get(routes.users, getUsers);

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Create a new user
 *     description: Creates a new user by providing necessary user details.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 description: The first name of the user.
 *               age:
 *                 type: integer
 *                 description: The age of the user.
 *               address:
 *                 type: object
 *                 properties:
 *                   country:
 *                     type: string
 *                     description: The country of the user's address.
 *             required:
 *               - firstName
 *               - age
 *               - address
 *     responses:
 *       200:
 *         description: User successfully created.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserEntity'
 *       400:
 *         description: Bad request, validation failed (missing or invalid fields).
 *       500:
 *         description: Internal server error occurred while creating the user.
 */
userRoutes.post(routes.users, createUser);

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Update an existing user
 *     description: Updates the details of an existing user identified by the user ID.
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user to be updated.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 description: The first name of the user.
 *               age:
 *                 type: integer
 *                 description: The age of the user.
 *               address:
 *                 type: object
 *                 properties:
 *                   country:
 *                     type: string
 *                     description: The country of the user's address.
 *             required:
 *               - firstName
 *               - age
 *               - address
 *     responses:
 *       200:
 *         description: User successfully updated.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserEntity'
 *       400:
 *         description: Bad request, validation failed (missing or invalid fields).
 *       404:
 *         description: User not found with the specified ID.
 *       500:
 *         description: Internal server error occurred while updating the user.
 */
userRoutes.put(`${routes.users}/:id`, updateUser);

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Delete a user
 *     description: Deletes an existing user identified by the user ID.
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user to be deleted.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User successfully deleted.
 *       400:
 *         description: Bad request, validation failed (e.g., invalid ID format).
 *       404:
 *         description: User not found with the specified ID.
 *       500:
 *         description: Internal server error occurred while deleting the user.
 */
userRoutes.delete(`${routes.users}/:id`, deleteUser);

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     description: Retrieves a single user by their unique identifier.
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The unique ID of the user to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserEntity'
 *       404:
 *         description: User not found with the specified ID.
 *       500:
 *         description: Internal server error occurred while retrieving the user.
 */

/**
 * @swagger
 * /api/users/{id}/image:
 *   post:
 *     summary: Upload an image for a user
 *     description: Uploads an image (profile picture or any other) for a user identified by their unique ID.
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The unique ID of the user for whom the image is being uploaded.
 *         schema:
 *           type: string
 *       - in: formData
 *         name: image
 *         required: true
 *         description: The image file to upload.
 *         type: file
 *     responses:
 *       200:
 *         description: Image uploaded successfully for the user.
 *       400:
 *         description: Bad request, validation failed (e.g., invalid file format).
 *       404:
 *         description: User not found with the specified ID.
 *       500:
 *         description: Internal server error occurred while uploading the image.
 */

export default userRoutes;