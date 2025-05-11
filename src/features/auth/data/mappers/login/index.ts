import { AuthLoginEntity } from "@auth/domain/entities/login";
import { AuthLoginModel } from "@auth/data/models/login";

/**
 * Mapper class for transforming between `AuthLoginModel` and `AuthLoginEntity`.
 *
 * `AuthLoginMapper` provides static methods for converting data between different representations
 * of a user login. This is useful to decouple the different layers of the application, such as
 * the data source layer and the domain layer, while ensuring that each layer works with its own
 * respective model or entity format.
 *
 * Responsibilities:
 * - Convert `AuthLoginModel` to `AuthLoginEntity` and vice versa.
 * - Abstract the transformation logic to ensure that the models/entities remain independent
 *   of the persistence or API layer.
 *
 * @class
 */
export class AuthLoginMapper {

  /**
   * Converts an `AuthLoginModel` to an `AuthLoginEntity`.
   *
   * - Takes an `AuthLoginModel`, which represents the data used in the application's input forms,
   *   and transforms it into an `AuthLoginEntity`, which is used within the domain layer.
   * - This allows the domain logic to remain decoupled from the specifics of data transfer objects
   *   (DTOs) or API models.
   *
   * @param user The `AuthLoginModel` representing the user's login data.
   * @returns An `AuthLoginEntity` representing the same user data in a domain-friendly format.
   */
  static toEntity(user: AuthLoginModel): AuthLoginEntity {
    return new AuthLoginEntity(
      user.email,
      user.password
    );
  }

  /**
   * Converts an `AuthLoginEntity` to an `AuthLoginModel`.
   *
   * - Takes an `AuthLoginEntity`, which represents the user login data in the domain layer,
   *   and transforms it into an `AuthLoginModel`, which is used for API communication or data
   *   transfer purposes.
   * - This allows the application to use domain entities for internal logic while sending and
   *   receiving simpler models for API calls or data persistence.
   *
   * @param user The `AuthLoginEntity` representing the user's login data in the domain layer.
   * @returns An `AuthLoginModel` that is suited for API requests or other data transfer purposes.
   */
  static toModel(user: AuthLoginEntity): AuthLoginModel {
    return new AuthLoginModel(
      user.email,
      user.password
    );
  }
}
