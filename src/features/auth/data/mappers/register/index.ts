import { AuthRegisterModel } from "@auth/data/models/register";
import { AuthRegisterEntity } from "@auth/domain/entities/register";

/**
 * Mapper class for converting between domain entities (`UserEntity`) and persistence models (`UserModel`).
 * 
 * This class provides static methods to convert from one representation to another, ensuring separation
 * between the domain model and the persistence model. 
 *
 * @class
 */
export class AuthRegisterMapper {

  static toEntity(user: AuthRegisterModel): AuthRegisterEntity {
    return new AuthRegisterEntity(
      user.id,
      user.firstName,
      user.lastName,
      user.email,
      user.password,
      user.emailVerified
    );
  }

  static toModel(user: AuthRegisterEntity): AuthRegisterModel {
    return new AuthRegisterModel(
      user.id,
      user.firstName,
      user.lastName,
      user.email,
      user.password,
      user.emailVerified
    );
  }
}