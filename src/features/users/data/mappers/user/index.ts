import { UserModel } from "@users/data/models/user";
import { UserEntity } from "@users/domain/entities/user";

/**
 * Mapper class for converting between domain entities (`UserEntity`) and persistence models (`UserModel`).
 * 
 * This class provides static methods to convert from one representation to another, ensuring separation
 * between the domain model and the persistence model. 
 *
 * @class
 */
export class UserMapper {

  /**
   * Converts a `UserModel` instance to a `UserEntity` instance.
   *
   * This method takes a persistence model (`UserModel`) and maps it to a domain entity (`UserEntity`).
   * The domain entity contains the necessary business logic and rules, while the persistence model is typically
   * used for database operations. This method helps in separating concerns between different layers of the application.
   * 
   * @param {UserModel} user - The `UserModel` instance to be converted.
   * @returns {UserEntity} A new `UserEntity` instance.
   */
  static toEntity(user: UserModel): UserEntity {
    return new UserEntity(
      user.id,
      user.firstName,
      user.lastName,
      user.gender,
      user.birthDate,
      user.age,
      user.email,
      user.phoneNumber,
      {
        country: user.address.country,
        city: user.address.city,
        postalCode: user.address.postalCode
      },
      user.avatar,
      user.role,
      user.emailVerified
    );
  }

  /**
   * Converts a `UserEntity` instance to a `UserModel` instance.
   *
   * This method takes a domain entity (`UserEntity`) and maps it to a persistence model (`UserModel`).
   * The persistence model is typically used for interacting with the database, while the domain entity
   * is used for business logic and manipulation. This method allows for smooth conversion between layers
   * of the application.
   * 
   * @param {UserEntity} user - The `UserEntity` instance to be converted.
   * @returns {UserModel} A new `UserModel` instance.
   */
  static toModel(user: UserEntity): UserModel {
    return new UserModel(
      user.id,
      user.firstName,
      user.lastName,
      user.gender,
      user.birthDate,
      user.age,
      user.email,
      user.phoneNumber,
      {
        country: user.address.country,
        city: user.address.city,
        postalCode: user.address.postalCode
      },
      user.avatar,
      user.role,
      user.emailVerified ?? false
    );
  }
}