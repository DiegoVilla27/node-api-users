import { UserModel } from "@users/data/models/user";

/**
 * Represents the response model for a list of users, including pagination information.
 *
 * This model encapsulates the data returned from user-related queries, including:
 * - Pagination metadata (`limit`, `skip`, `total`).
 * - The list of users as an array of `UserModel`.
 *
 * @class
 */
export class UserResponseModel {
  limit: number;
  skip: number;
  total: number;
  users: UserModel[];

  constructor(limit: number, skip: number, total: number, users: UserModel[]) {
    this.limit = limit;
    this.skip = skip;
    this.total = total;
    this.users = users;
  }
}