import { UserEntity, UserResponseEntity } from "@domain/entities/users";

/**
 * Represents a user model with properties and methods to convert to different formats.
 *
 * @property {string} id - Unique identifier for the user.
 * @property {string} nombre - First name of the user.
 * @property {number} edad - Age of the user.
 * @property {Object} direccion - Address details of the user.
 * @property {string} direccion.pais - Country of the user's address.
 *
 * @method toEntity - Converts the user model to a UserEntity instance.
 * @returns {UserEntity} A new UserEntity object with the user's data.
 *
 * @method toJSON - Converts the user model to a JSON object.
 * @returns {Object} A JSON representation of the user model.
 */
export class UserModel {
  id: string;
  nombre: string;
  edad: number;
  direccion: {
    pais: string;
  };

  constructor(id: string, nombre: string, edad: number, direccion: { pais: string }) {
    this.id = id;
    this.nombre = nombre;
    this.edad = edad;
    this.direccion = direccion;
  }

  toEntity(): UserEntity {
    return new UserEntity(this.id, this.nombre, this.edad, { country: this.direccion.pais });
  }

  toJSON() {
    return {
      id: this.id,
      nombre: this.nombre,
      edad: this.edad,
      direccion: { pais: this.direccion.pais },
    };
  }
}

/**
 * Represents a model for user response data, including pagination details and a list of users.
 *
 * @property {number} limit - The maximum number of users to return.
 * @property {number} skip - The number of users to skip before starting to collect the result set.
 * @property {number} total - The total number of users available.
 * @property {UserEntity[]} users - An array of user entities.
 *
 * @constructor
 * @param {number} limit - The maximum number of users to return.
 * @param {number} skip - The number of users to skip before starting to collect the result set.
 * @param {number} total - The total number of users available.
 * @param {UserEntity[]} users - An array of user entities.
 *
 * @method toEntity
 * Converts the UserResponseModel instance to a UserResponseEntity instance.
 *
 * @returns {UserResponseEntity} A new UserResponseEntity instance with the same data.
 */
export class UserResponseModel {
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

  toEntity(): UserResponseEntity {
    return new UserResponseEntity(
      this.limit,
      this.skip,
      this.total,
      this.users.map((user) =>
        new UserModel(
          user.id,
          user.firstName,
          user.age,
          { pais: user.address.country }
        ).toEntity()
      )
    );
  }
}