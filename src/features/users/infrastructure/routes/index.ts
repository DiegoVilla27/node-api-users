import authMiddleware from '@core/middlewares/jwt';
import routes from '@core/routes/interfaces';
import createUser from '@users/infrastructure/controllers/create';
import deleteUser from '@users/infrastructure/controllers/delete';
import deleteImageUser from '@users/infrastructure/controllers/delete_image';
import getUsers from '@users/infrastructure/controllers/get';
import getUserById from '@users/infrastructure/controllers/get_by_id';
import updateUser from '@users/infrastructure/controllers/update';
import { upload, uploadImageUser } from '@users/infrastructure/controllers/upload_image';
import { Router } from 'express';

/**
 * Sets up the user-related routes for the application.
 * 
 * This router handles the following endpoints:
 * - GET /users: Retrieves a list of users.
 * - POST /users: Creates a new user.
 * - PUT /users/:id: Updates an existing user by ID.
 * - DELETE /users/:id: Deletes a user by ID.
 * - UPLOAD IMAGE /users/:id:/image_upload Upload a user avatar by ID.
 * - DELETE IMAGE /users/:id:/image_delete Delete a user avatar by ID.
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
 *         lastName:
 *           type: string
 *           description: The last name of the user.
 *         gender:
 *           type: string
 *           enum: [male, female, other]
 *           description: The gender of the user.
 *         birthDate:
 *           type: string
 *           format: date
 *           description: The birth date of the user in the format yyyy-MM-dd.
 *         age:
 *           type: integer
 *           description: The age of the user.
 *         email:
 *           type: string
 *           format: email
 *           description: The email address of the user.
 *         phoneNumber:
 *           type: string
 *           description: The phone number of the user.
 *         address:
 *           type: object
 *           properties:
 *             country:
 *               type: string
 *               description: The country of the user's address.
 *             city:
 *               type: string
 *               description: The city of the user's address.
 *             postalCode:
 *               type: string
 *               description: The postal code of the user's address.
 *         avatar:
 *           type: string
 *           format: uri
 *           description: The avatar URL of the user.
 *       required:
 *         - id
 *         - firstName
 *         - lastName
 *         - gender
 *         - birthDate
 *         - age
 *         - email
 *         - phoneNumber
 *         - address
 *         - avatar
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
userRoutes.get(routes.users, authMiddleware, getUsers);

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
 *               lastName:
 *                 type: string
 *                 description: The last name of the user.
 *               gender:
 *                 type: string
 *                 enum: [male, female, other]
 *                 description: The gender of the user.
 *               birthDate:
 *                 type: string
 *                 format: date
 *                 description: The birth date of the user in the format yyyy-MM-dd.
 *               age:
 *                 type: integer
 *                 description: The age of the user.
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The email address of the user.
 *               phoneNumber:
 *                 type: string
 *                 description: The phone number of the user.
 *               address:
 *                 type: object
 *                 properties:
 *                   country:
 *                     type: string
 *                     description: The country of the user's address.
 *                   city:
 *                     type: string
 *                     description: The city of the user's address.
 *                   postalCode:
 *                     type: string
 *                     description: The postal code of the user's address.
 *               avatar:
 *                 type: string
 *                 format: uri
 *                 description: The avatar URL of the user.
 *             required:
 *               - firstName
 *               - lastName
 *               - gender
 *               - birthDate
 *               - age
 *               - email
 *               - phoneNumber
 *               - address
 *               - avatar
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
userRoutes.post(routes.users, authMiddleware, createUser);

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
 *               lastName:
 *                 type: string
 *                 description: The last name of the user.
 *               gender:
 *                 type: string
 *                 enum: [male, female, other]
 *                 description: The gender of the user.
 *               birthDate:
 *                 type: string
 *                 format: date
 *                 description: The birth date of the user in the format yyyy-MM-dd.
 *               age:
 *                 type: integer
 *                 description: The age of the user.
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The email address of the user.
 *               phoneNumber:
 *                 type: string
 *                 description: The phone number of the user.
 *               address:
 *                 type: object
 *                 properties:
 *                   country:
 *                     type: string
 *                     description: The country of the user's address.
 *                   city:
 *                     type: string
 *                     description: The city of the user's address.
 *                   postalCode:
 *                     type: string
 *                     description: The postal code of the user's address.
 *               avatar:
 *                 type: string
 *                 format: uri
 *                 description: The avatar URL of the user.
 *             required:
 *               - firstName
 *               - lastName
 *               - gender
 *               - birthDate
 *               - age
 *               - email
 *               - phoneNumber
 *               - address
 *               - avatar
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
userRoutes.put(`${routes.users}/:id`, authMiddleware, updateUser);

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
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserEntity'
 *       400:
 *         description: Bad request, validation failed (e.g., invalid ID format).
 *       404:
 *         description: User not found with the specified ID.
 *       500:
 *         description: Internal server error occurred while deleting the user.
 */
userRoutes.delete(`${routes.users}/:id`, authMiddleware, deleteUser);

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
userRoutes.get(`${routes.users}/:id`, authMiddleware, getUserById);

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
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'File upload successfully'
 *       400:
 *         description: Bad request, validation failed (e.g., invalid file format).
 *       404:
 *         description: User not found with the specified ID.
 *       500:
 *         description: Internal server error occurred while uploading the image.
 */
userRoutes.post(`${routes.users}/:id/image_upload`, authMiddleware, upload.single('image'), uploadImageUser);

/**
 * @swagger
 * /api/users/{id}/image:
 *   post:
 *     summary: Delete an image for a user
 *     description: Delete an image (profile picture or any other) for a user identified by their unique ID.
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The unique ID of the user for whom the image is being deleted.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Image deleted successfully for the user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'File deleted successfully'
 *       404:
 *         description: User not found with the specified ID.
 *       500:
 *         description: Internal server error occurred while deleting the image.
 */
userRoutes.post(`${routes.users}/:id/image_delete`, authMiddleware, deleteImageUser);

export default userRoutes;