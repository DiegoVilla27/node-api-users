import 'module-alias/register';
import express from 'express';
import routes from '@core/routes';
import bodyParser from 'body-parser';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './swaggerConfig';
import dotenv from 'dotenv';

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