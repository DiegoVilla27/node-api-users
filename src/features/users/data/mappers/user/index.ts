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

  static toEntity(user: UserModel): UserEntity {
    return new UserEntity(user.id, user.firstName, user.age, { country: user.address.country });
  }

  static toModel(user: UserEntity): UserModel {
    return new UserModel(user.id, user.firstName, user.age, { country: user.address.country });
  }
}