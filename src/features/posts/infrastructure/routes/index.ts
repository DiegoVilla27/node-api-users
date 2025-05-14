import authMiddleware from '@core/middlewares/jwt';
import checkRoleMiddleware from '@core/middlewares/role';
import routes from '@core/routes/interfaces';
import createPost from '@posts/infrastructure/controllers/create';
import deletePost from '@posts/infrastructure/controllers/delete';
import getPosts from '@posts/infrastructure/controllers/get';
import getPostById from '@posts/infrastructure/controllers/get_by_id';
import likePostById from '@posts/infrastructure/controllers/like';
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
 * - POST /posts/:id:/like Update like a post by ID.
 * 
 * Utilizes organization-specific controllers for handling
 * post operations and Express for routing.
 */
const postRoutes = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     PostEntity:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The unique identifier of the post.
 *         title:
 *           type: string
 *           description: The title of the post.
 *         description:
 *           type: string
 *           description: The content or description of the post.
 *         createDate:
 *           type: string
 *           format: date-time
 *           description: The creation date of the post in ISO 8601 format.
 *         likes:
 *           type: integer
 *           minimum: 0
 *           description: The number of likes the post has received.
 *       required:
 *         - id
 *         - title
 *         - description
 *         - createDate
 *         - likes
 * 
 *     PostResponseEntity:
 *       type: object
 *       properties:
 *         limit:
 *           type: integer
 *           description: The maximum number of posts to return.
 *         skip:
 *           type: integer
 *           description: The number of posts to skip before starting to collect the result set.
 *         total:
 *           type: integer
 *           description: The total number of posts available.
 *         posts:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/PostEntity'
 *           description: An array of post entities.
 *       required:
 *         - limit
 *         - skip
 *         - total
 *         - posts
 * 
 * /api/posts:
 *   get:
 *     summary: Get all posts
 *     description: Fetches a list of posts from the database with pagination support.
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of posts retrieved successfully, including pagination details.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PostResponseEntity'
 *       500:
 *         description: Internal server error occurred while fetching posts.
 *       404:
 *         description: No posts found or post data does not exist.
 */
postRoutes.get(routes.posts, authMiddleware, checkRoleMiddleware(['guest']), getPosts);

/**
 * @swagger
 * /api/posts:
 *   post:
 *     summary: Create a new post
 *     description: Creates a new post by providing necessary post details.
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the post.
 *               description:
 *                 type: string
 *                 description: The content or description of the post.
 *               createDate:
 *                 type: string
 *                 format: date-time
 *                 description: The creation date of the post in ISO 8601 format.
 *             required:
 *               - title
 *               - description
 *               - createDate
 *     responses:
 *       200:
 *         description: Post successfully created.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PostEntity'
 *       400:
 *         description: Bad request, validation failed (missing or invalid fields).
 *       500:
 *         description: Internal server error occurred while creating the post.
 */
postRoutes.post(routes.posts, authMiddleware, checkRoleMiddleware(['guest']), createPost);

/**
 * @swagger
 * /api/posts/{id}:
 *   put:
 *     summary: Update an existing post
 *     description: Updates the details of an existing post identified by the post ID.
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the post to be updated.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The updated title of the post.
 *               description:
 *                 type: string
 *                 description: The updated content or description of the post.
 *               createDate:
 *                 type: string
 *                 format: date-time
 *                 description: The updated creation date in ISO 8601 format.
 *             required:
 *               - title
 *               - description
 *               - createDate
 *     responses:
 *       200:
 *         description: Post successfully updated.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PostEntity'
 *       400:
 *         description: Bad request, validation failed (missing or invalid fields).
 *       404:
 *         description: Post not found with the specified ID.
 *       500:
 *         description: Internal server error occurred while updating the post.
 */
postRoutes.put(`${routes.posts}/:id`, authMiddleware, checkRoleMiddleware(['guest']), updatePost);

/**
 * @swagger
 * /api/posts/{id}:
 *   delete:
 *     summary: Delete a post
 *     description: Deletes an existing post identified by the post ID.
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the post to be deleted.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Post successfully deleted.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PostEntity'
 *       400:
 *         description: Bad request, validation failed (e.g., invalid ID format).
 *       404:
 *         description: Post not found with the specified ID.
 *       500:
 *         description: Internal server error occurred while deleting the post.
 */
postRoutes.delete(`${routes.posts}/:id`, authMiddleware, checkRoleMiddleware(['guest']), deletePost);

/**
 * @swagger
 * /api/posts/{id}:
 *   get:
 *     summary: Get a post by ID
 *     description: Retrieves a single post by its unique identifier.
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The unique ID of the post to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Post retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PostEntity'
 *       404:
 *         description: Post not found with the specified ID.
 *       500:
 *         description: Internal server error occurred while retrieving the post.
 */
postRoutes.get(`${routes.posts}/:id`, authMiddleware, checkRoleMiddleware(['guest']), getPostById);

/**
 * @swagger
 * /api/posts/{id}/like:
 *   put:
 *     summary: Like a post by ID
 *     description: Increments the number of likes for the specified post by its unique identifier.
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The unique ID of the post to like.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Post liked successfully. Returns the updated post.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PostEntity'
 *       404:
 *         description: Post not found with the specified ID.
 *       500:
 *         description: Internal server error occurred while updating the likes of the post.
 */
postRoutes.put(`${routes.posts}/:id/like`, authMiddleware, checkRoleMiddleware(['guest']), likePostById);

export default postRoutes;