import forgotPasswordUser from '@auth/infrastructure/controllers/forgot_password';
import loginUser from '@auth/infrastructure/controllers/login';
import registerUser from '@auth/infrastructure/controllers/register';
import resetPasswordUser from '@auth/infrastructure/controllers/reset_password';
import verifyEmailUser from '@auth/infrastructure/controllers/verify_email';
import routes from '@core/routes/interfaces';
import { Router } from 'express';

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
 *                 access_token:
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

/**
 * @swagger
 * /api/auth/forgot-password:
 *   post:
 *     summary: Request password reset
 *     description: Sends a reset password token to the user's email if the account exists.
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
 *                 description: Registered user's email.
 *             required:
 *               - email
 *     responses:
 *       200:
 *         description: Password reset email sent.
 *       400:
 *         description: Email is required or invalid.
 *       500:
 *         description: Internal server error while processing the request.
 */
authRoutes.post(`${routes.auth}/forgot-password`, forgotPasswordUser);

/**
 * @swagger
 * /api/auth/reset-password:
 *   post:
 *     summary: Reset user password
 *     description: Resets the user's password using a valid reset token.
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
 *                 description: Registered user's email.
 *               password:
 *                 type: string
 *                 format: password
 *                 description: The new password to set.
 *               confirmPassword:
 *                 type: string
 *                 format: password
 *                 description: Must match the new password.
 *             required:
 *               - email
 *               - password
 *               - confirmPassword
 *     parameters:
 *       - in: query
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: The password reset token received via email.
 *     responses:
 *       200:
 *         description: Password has been successfully reset.
 *       400:
 *         description: Invalid token or passwords do not match.
 *       500:
 *         description: Internal server error during password reset.
 */
authRoutes.post(`${routes.auth}/reset-password`, resetPasswordUser);

/**
 * @swagger
 * /api/auth/verify-email:
 *   post:
 *     summary: Verify user email
 *     description: Verifies the user's email using a valid verification token.
 *     tags: [Auth]
 *     parameters:
 *       - in: query
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: The email verification token received via email.
 *     responses:
 *       200:
 *         description: Email has been successfully verified.
 *       400:
 *         description: Invalid token or token has expired.
 *       500:
 *         description: Internal server error during email verification.
 */
authRoutes.post(`${routes.auth}/verify-email`, verifyEmailUser);

export default authRoutes;