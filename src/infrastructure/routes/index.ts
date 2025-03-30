import { Router } from 'express';
import userRoutes from './users';

const api = Router()
  .use(userRoutes);

export default Router().use('/api', api);