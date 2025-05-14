import checkRoleMiddleware from '@core/middlewares/role';
import authMiddleware from '@core/middlewares/jwt';
import routes from '@core/routes/interfaces';
import createPost from '@posts/infrastructure/controllers/create';
import deletePost from '@posts/infrastructure/controllers/delete';
import getPosts from '@posts/infrastructure/controllers/get';
import getPostById from '@posts/infrastructure/controllers/get_by_id';
import updatePost from '@posts/infrastructure/controllers/update';
import { Router } from 'express';

/**
 * Sets up the post-related routes for the application.
 * 
 * This router handles the following endpoints:
 * - GET /posts: Retrieves a list of posts.
 * - POST /posts: Creates a new post.
 * - PUT /posts/:id: Updates an existing post by ID.
 * - DELETE /posts/:id: Deletes a post by ID.
 * - GET /posts/:id: Get a post by ID.
 * 
 * Utilizes organization-specific controllers for handling
 * post operations and Express for routing.
 */
const postRoutes = Router();

postRoutes.get(routes.posts, authMiddleware, checkRoleMiddleware(['guest']), getPosts);

postRoutes.post(routes.posts, authMiddleware, checkRoleMiddleware(['guest']), createPost);

postRoutes.put(`${routes.posts}/:id`, authMiddleware, checkRoleMiddleware(['guest']), updatePost);

postRoutes.delete(`${routes.posts}/:id`, authMiddleware, checkRoleMiddleware(['guest']), deletePost);

postRoutes.get(`${routes.posts}/:id`, authMiddleware, checkRoleMiddleware(['guest']), getPostById);

export default postRoutes;