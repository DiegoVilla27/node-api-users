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