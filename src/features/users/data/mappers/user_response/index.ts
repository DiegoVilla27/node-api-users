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
  static toEntity(userResponse: UserResponseModel): UserResponseEntity {
    return new UserResponseEntity(
      userResponse.limit,
      userResponse.skip,
      userResponse.total,
      userResponse.users.map((user) => UserMapper.toEntity(user))
    );
  }
}