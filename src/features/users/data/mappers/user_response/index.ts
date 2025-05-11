import { UserResponseModel } from "@users/data/models/user_response";
import { UserResponseEntity } from "@users/domain/entities/user_response";
import { UserMapper } from "@users/data/mappers/user";

/**
 * Mapper class for converting between the response model (`UserResponseModel`) and the domain entity (`UserResponseEntity`).
 *
 * This class provides static methods to convert from the response model, which is typically used in data 
 * retrieval operations, to the domain entity that is used in the business logic layer.
 *
 * @class
 */
export class UserResponseMapper {

  /**
   * Converts a `UserResponseModel` instance to a `UserResponseEntity` instance.
   *
   * This method takes a `UserResponseModel` (used for data transfer or persistence) and maps it to a `UserResponseEntity`
   * (which represents the domain model used in the application logic). It includes a list of users, converting each
   * user from the persistence model to the domain entity using the `UserMapper.toEntity` method.
   * 
   * The `UserResponseModel` typically represents a paginated response with user data, while the `UserResponseEntity`
   * represents the processed business logic model used for application purposes.
   * 
   * @param {UserResponseModel} userResponse - The `UserResponseModel` instance to be converted.
   * @returns {UserResponseEntity} A new `UserResponseEntity` instance, which contains the limit, skip, total, and users
   *         with their data mapped to domain entities.
   */
  static toEntity(userResponse: UserResponseModel): UserResponseEntity {
    return new UserResponseEntity(
      userResponse.limit,
      userResponse.skip,
      userResponse.total,
      userResponse.users.map((user) => UserMapper.toEntity(user))
    );
  }
}