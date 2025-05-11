/**
 * Interface representing the structure of route paths.
 * 
 * @property {string} users - The route path for user-related operations.
 * @property {string} auth - The route path for auth-related operations.
 */
interface IRoutes {
  users: string;
  auth: string;
}

/**
 * Defines the routes for the application.
 * 
 * @constant {IRoutes} routes - An object representing the application's routes.
 * @property {string} users - The endpoint for user-related operations.
 * @property {string} auth - The endpoint for auth-related operations.
 */
const routes: IRoutes = {
  users: '/users',
  auth: '/auth',
}

export default routes;
