import { UserEntity, UserResponseEntity } from "@domain/entities/users";

export abstract class UserRepository {

  abstract get(): Promise<UserResponseEntity>;
  abstract create(user: UserEntity): Promise<UserEntity>;
  abstract update(id: string, user: UserEntity): Promise<UserEntity>;
  abstract delete(id: string): Promise<UserEntity>;
}

export default UserRepository;