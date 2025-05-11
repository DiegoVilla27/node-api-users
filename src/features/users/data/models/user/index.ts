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
  emailVerified: boolean;

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
    emailVerified: boolean
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