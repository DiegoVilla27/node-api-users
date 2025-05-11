import routes from '@core/routes/interfaces';
import { Router } from 'express';
import loginUser from '@auth/infrastructure/controllers/login';
import registerUser from '@auth/infrastructure/controllers/register';

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
const authRoutes = Router();

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
authRoutes.post(`${routes.auth}/login`, loginUser);

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
authRoutes.post(`${routes.auth}/register`, registerUser);

export default authRoutes;