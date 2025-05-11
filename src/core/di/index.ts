import { diAuth } from "@auth/di";
import { diUsers } from "@users/di";

/**
 * Dependency Injection (DI) configuration for user-related use cases.
 *
 * This object encapsulates the dependency injection setup for the various use cases related to user
 * management, such as creating, retrieving, updating, and deleting users. It holds a reference to the
 * `diUsers` object, which includes the individual use cases and their dependencies.
 *
 * @constant
 */
export const di = {
  user: diUsers,
  auth: diAuth,
};