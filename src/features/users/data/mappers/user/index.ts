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
      user.avatar
    );
  }

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
      user.avatar
    );
  }
}