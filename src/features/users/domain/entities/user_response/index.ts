import { UserEntity } from '@users/domain/entities/user';
/**
 * Represents a response entity for user data.
 * 
 * @property {number} limit - The maximum number of users to return.
 * @property {number} skip - The number of users to skip before starting to collect the result set.
 * @property {number} total - The total number of users available.
 * @property {UserEntity[]} users - An array of user entities.
 */
export class UserResponseEntity {
  limit: number;
  skip: number;
  total: number;
  users: UserEntity[];

  constructor(limit: number, skip: number, total: number, users: UserEntity[]) {
    this.limit = limit;
    this.skip = skip;
    this.total = total;
    this.users = users;
  }
}