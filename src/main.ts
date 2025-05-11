import 'module-alias/register';
import express from 'express';
import routes from '@core/routes';
import bodyParser from 'body-parser';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './swaggerConfig';
import dotenv from 'dotenv';
import xssClean from 'xss-clean';
import rateLimit from 'express-rate-limit';

const app = express();

// Load environment variables from .env file
dotenv.config();

/**
 * Enable CORS for all origins.
 */
app.use(cors());

/**
 * Parse incoming requests with JSON payloads.
 */
app.use(express.json());

/**
 * Parse application/x-www-form-urlencoded payloads.
 * @param {boolean} extended - When true, uses the qs library for rich objects and arrays support.
 */
app.use(bodyParser.urlencoded({ extended: true }));

// Sanitize incoming data against XSS
app.use(xssClean());

/**
 * Apply global rate limiting to incoming requests.
 *
 * This rate limiter middleware restricts each IP address to a maximum of 100 requests 
 * every 60 minutes. It helps protect the API from brute-force attacks, denial-of-service 
 * attempts, or excessive client requests.
 *
 * Configuration:
 * - `windowMs`: The time frame for which requests are checked/remembered (60 minutes).
 * - `max`: Maximum number of requests allowed per IP within the time window (100).
 * - `standardHeaders`: Sends rate limit info in the `RateLimit-*` headers.
 * - `legacyHeaders`: Disables the deprecated `X-RateLimit-*` headers.
 * - `message`: Custom response message sent when the limit is exceeded.
 *
 * This middleware is applied globally to all routes.
 */
const limiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Too many requests from this IP, please try again after an hour.', status: 429 },
});
app.use(limiter);

/**
 * Setup Swagger API documentation route.
 * Accessible at /api-docs
 */
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * Mount all application routes.
 */
app.use(routes);

/**
 * Start the server on the specified port.
 * Defaults to port 3100 if not provided in the environment variables.
 */
const PORT: number = process.env.PORT ? parseInt(process.env.PORT) : 3100;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});