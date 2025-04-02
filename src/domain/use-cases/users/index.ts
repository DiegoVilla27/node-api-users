import { UserEntity, UserResponseEntity } from "@domain/entities/users";
import UserRepository from "@domain/repository/users";

/**
 * UsersUseCase class provides methods to interact with user data through the UserRepository.
 * It includes operations to get, create, update, and delete user entities.
 *
 * @class UsersUseCase
 * @property {UserRepository} userRepository - The repository instance for user data operations.
 *
 * @method get - Retrieves a list of users wrapped in a UserResponseEntity.
 * @returns {Promise<UserResponseEntity>} A promise that resolves to a UserResponseEntity containing user data.
 *
 * @method create - Creates a new user entity.
 * @param {UserEntity} user - The user entity to be created.
 * @returns {Promise<UserEntity>} A promise that resolves to the created UserEntity.
 *
 * @method update - Updates an existing user entity.
 * @param {string} id - The ID of the user to be updated.
 * @param {UserEntity} user - The updated user entity data.
 * @returns {Promise<UserEntity>} A promise that resolves to the updated UserEntity.
 *
 * @method delete - Deletes a user entity.
 * @param {string} id - The ID of the user to be deleted.
 * @returns {Promise<UserEntity>} A promise that resolves to the deleted UserEntity.
 */
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
