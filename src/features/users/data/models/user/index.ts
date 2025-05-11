import { Gender } from '@shared/interfaces/gender/index';

/**
 * Represents a user model with properties and methods to convert to different formats.
 *
 * @property {string} id - The unique identifier for the user.
 * @property {string} firstName - The first name of the user.
 * @property {string} lastName - The last name of the user.
 * @property {Gender} gender - The gender of the user. Can be 'male', 'female', or 'other'.
 * @property {string} birthDate - The birth date of the user, stored as a string in ISO 8601 format.
 * @property {number} age - The age of the user, calculated from the birth date.
 * @property {string} email - The email address of the user.
 * @property {string} phoneNumber - The phone number of the user.
 * @property {Object} address - The address details of the user.
 * @property {string} address.country - The country of the user's address.
 * @property {string} address.city - The city of the user's address.
 * @property {string} address.postalCode - The postal code of the user's address.
 * @property {string} avatar - The avatar of the user.
 * @property {boolean} emailVerified - The email verified of the user.
*/
export class UserModel {
  id: string;
  firstName: string;
  lastName: string;
  gender: Gender;
  birthDate: string;
  age: number;
  email: string;
  phoneNumber: string;
  address: {
    country: string;
    city: string;
    postalCode: string;
  };
  avatar: string;
  emailVerified?: boolean;

  constructor(
    id: string,
    firstName: string,
    lastName: string,
    gender: Gender,
    birthDate: string,
    age: number,
    email: string,
    phoneNumber: string,
    address: {
      country: string,
      city: string,
      postalCode: string
    },
    avatar: string,
    emailVerified: boolean = false
  ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.gender = gender;
    this.birthDate = birthDate;
    this.age = age;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.address = address;
    this.avatar = avatar;
    this.emailVerified = emailVerified;
  }

  /**
   * Converts the current instance of the user to a plain JavaScript object.
   *
   * This method is used to transform the instance properties of a class (or object)
   * into a simple JavaScript object that can be easily serialized or returned
   * in API responses. The `toJSON()` method excludes any methods and returns
   * only the essential user data.
   * 
   * **Returns:**
   * - A plain object containing the user's properties, formatted for JSON serialization.
   * 
   * **Returned Object Structure:**
   * - `id`: The unique identifier for the user.
   * - `firstName`: The user's first name.
   * - `lastName`: The user's last name.
   * - `gender`: The gender of the user, can be one of 'male', 'female', or 'other'.
   * - `birthDate`: The user's birth date, formatted as a string (yyyy-MM-dd).
   * - `age`: The user's age, a positive integer.
   * - `email`: The user's email address.
   * - `phoneNumber`: The user's phone number.
   * - `address`: An object containing:
   *    - `country`: The user's country.
   *    - `city`: The user's city.
   *    - `postalCode`: The postal code of the user's address.
   * - `avatar`: The URL of the user's avatar image, if available.
   * - `emailVerified`: A boolean indicating if the user's email is verified.
   */
  toJSON(): object {
    return {
      id: this.id,
      firstName: this.firstName,
      lastName: this.lastName,
      gender: this.gender,
      birthDate: this.birthDate,
      age: this.age,
      email: this.email,
      phoneNumber: this.phoneNumber,
      address: {
        country: this.address.country,
        city: this.address.city,
        postalCode: this.address.postalCode
      },
      avatar: this.avatar,
      emailVerified: this.emailVerified
    }
  }
}