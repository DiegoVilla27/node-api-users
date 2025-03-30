import { UserEntity, UserResponseEntity } from "@domain/entities/users";
import UserRepository from "@domain/repository/users";

export class UsersUseCase {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async get(): Promise<UserResponseEntity> {
    return await this.userRepository.get();
  }

  async create(user: UserEntity): Promise<UserEntity> {
    return await this.userRepository.create(user);
  }

  async update(id: string, user: UserEntity): Promise<UserEntity> {
    return await this.userRepository.update(id, user);
  }

  async delete(id: string): Promise<UserEntity> {
    return await this.userRepository.delete(id);
  }
}
