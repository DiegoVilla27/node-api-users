import { AuthRegisterModel } from "@auth/data/models/register";
import { AuthRegisterEntity } from "@auth/domain/entities/register";

/**
 * Mapper class for transforming between `AuthRegisterModel` and `AuthRegisterEntity`.
 *
 * `AuthRegisterMapper` provides static methods to convert data between the registration model
 * used for API interactions and the domain entity used for business logic.
 *
 * This transformation helps decouple the application's domain logic from external layers, ensuring
 * that each layer works with its own model or entity format.
 *
 * Responsibilities:
 * - Convert `AuthRegisterModel` to `AuthRegisterEntity` and vice versa.
 * - Ensure that the domain layer works with domain entities, while the API layer works with
 *   data transfer objects (DTOs) or models.
 *
 * @class
 */
export class AuthRegisterMapper {

  /**
   * Converts an `AuthRegisterModel` to an `AuthRegisterEntity`.
   *
   * - Takes an `AuthRegisterModel`, which represents the data used in user registration forms,
   *   and transforms it into an `AuthRegisterEntity`, which is used within the domain layer.
   * - This transformation isolates the domain logic from the details of API models or data transfer
   *   objects, allowing for cleaner and more maintainable code.
   *
   * @param user The `AuthRegisterModel` representing the user's registration data.
   * @returns An `AuthRegisterEntity` representing the same user data in a domain-friendly format.
   */
  static toEntity(user: AuthRegisterModel): AuthRegisterEntity {
    return new AuthRegisterEntity(
      user.id,
      user.firstName,
      user.lastName,
      user.email,
      user.password,
      user.emailVerified,
      user.role ?? 'guest'
    );
  }

  /**
   * Converts an `AuthRegisterEntity` to an `AuthRegisterModel`.
   *
   * - Takes an `AuthRegisterEntity`, which represents the user registration data in the domain layer,
   *   and transforms it into an `AuthRegisterModel`, which is typically used for API requests or data
   *   transfer.
   * - This conversion enables the domain layer to work with business entities, while still allowing
   *   interaction with external systems using a model that is suitable for data transfer.
   *
   * @param user The `AuthRegisterEntity` representing the user's registration data in the domain layer.
   * @returns An `AuthRegisterModel` that is suited for API requests or other data transfer purposes.
   */
  static toModel(user: AuthRegisterEntity): AuthRegisterModel {
    return new AuthRegisterModel(
      user.id,
      user.firstName,
      user.lastName,
      user.email,
      user.password,
      user.emailVerified,
      user.role ?? 'guest'
    );
  }
}
