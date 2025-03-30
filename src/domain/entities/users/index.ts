/**
 * Represents a user entity with basic personal information.
 *
 * @property {string} id - The unique identifier for the user.
 * @property {string} firstName - The first name of the user.
 * @property {number} age - The age of the user.
 * @property {Object} address - The address details of the user.
 * @property {string} address.country - The country of the user's address.
 */
export class UserEntity {
  id: string;
  firstName: string;
  age: number;
  address: {
    country: string;
  };

  constructor(id: string, firstName: string, age: number, address: { country: string }) {
    this.id = id;
    this.firstName = firstName;
    this.age = age;
    this.address = address;
  }
}

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