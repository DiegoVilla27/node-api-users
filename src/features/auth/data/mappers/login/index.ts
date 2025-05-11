import { AuthLoginEntity } from "@auth/domain/entities/login";
import { AuthLoginModel } from "@auth/data/models/login";

/**
 * Mapper class for converting between domain entities (`UserEntity`) and persistence models (`UserModel`).
 * 
 * This class provides static methods to convert from one representation to another, ensuring separation
 * between the domain model and the persistence model. 
 *
 * @class
 */
export class AuthLoginMapper {

  static toEntity(user: AuthLoginModel): AuthLoginEntity {
    return new AuthLoginEntity(
      user.email,
      user.password
    );
  }

  static toModel(user: AuthLoginEntity): AuthLoginModel {
    return new AuthLoginModel(
      user.email,
      user.password
    );
  }
}