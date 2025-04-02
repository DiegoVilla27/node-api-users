import { IRoutes } from "./interfaces";

/**
 * Defines the routes for the application.
 * 
 * @constant {IRoutes} routes - An object representing the application's routes.
 * @property {string} users - The endpoint for user-related operations.
 */
const routes: IRoutes = {
  users: '/users',
}

export default routes;