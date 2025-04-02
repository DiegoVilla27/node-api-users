import { Router } from 'express';
import userRoutes from './users';

/**
 * Configures and exports the main API router.
 * 
 * This router mounts user-related routes under the '/api' path.
 * It utilizes the Express Router to organize and manage API endpoints.
 */
const api = Router()
  .use(userRoutes);

export default Router().use('/api', api);