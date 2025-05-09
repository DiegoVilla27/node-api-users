
/**
 * Represents a user model with properties and methods to convert to different formats.
 *
 * @property {string} id - The unique identifier for the user.
 * @property {string} firstName - The first name of the user.
 * @property {number} age - The age of the user.
 * @property {Object} address - The address details of the user.
 * @property {string} address.country - The country of the user's address.
 */
export class UserModel {
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

  toJSON(): object {
    return {
      id: this.id,
      firstName: this.firstName,
      age: this.age,
      address: { country: this.address.country },
    }
  }
}