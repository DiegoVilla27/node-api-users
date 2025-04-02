import { UserEntity, UserResponseEntity } from "@domain/entities/users";

export interface UserRepository {
  get(): Promise<UserResponseEntity>;
  create(user: UserEntity): Promise<UserEntity>;
  update(id: string, user: UserEntity): Promise<UserEntity>;
  delete(id: string): Promise<UserEntity>;
}

export default UserRepository;