import routes from '@core/routes/interfaces';
import { Router } from 'express';
import loginUser from '@auth/infrastructure/controllers/login';
import registerUser from '@auth/infrastructure/controllers/register';

/**
 * Sets up the authentication-related routes for the application.
 * 
 * This router handles the following endpoints:
 * - POST /auth/login: Authenticates a user and returns a JWT token.
 * - POST /auth/register: Registers a new user in the system.
 * 
 * Utilizes controllers responsible for user authentication and registration,
 * and defines endpoints for login and registration flows.
 */
const authRoutes = Router();

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: User login
 *     description: Authenticates a user by email and password, and returns a JWT token if successful.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The email address of the user.
 *               password:
 *                 type: string
 *                 description: The password of the user.
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: Successful login, token returned.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: The JWT token for the authenticated user.
 *       401:
 *         description: Invalid credentials.
 *       500:
 *         description: Internal server error during login.
 */
authRoutes.post(`${routes.auth}/login`, loginUser);

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: User registration
 *     description: Registers a new user by providing necessary details such as email, password, and other profile information.
 *     tags: [Auth]
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
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The email address of the user.
 *               password:
 *                 type: string
 *                 description: The password of the user.
 *             required:
 *               - firstName
 *               - lastName
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: User successfully registered.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: The confirmation message upon successful registration.
 *       400:
 *         description: Bad request, validation failed (e.g., missing or invalid fields).
 *       409:
 *         description: Conflict, email already exists.
 *       500:
 *         description: Internal server error occurred while registering the user.
 */
authRoutes.post(`${routes.auth}/register`, registerUser);

export default authRoutes;