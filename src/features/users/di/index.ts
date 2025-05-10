import { UserApiDataSourceImpl } from "@users/data/datasources";
import { UserRepositoryImpl } from "@users/data/repository";
import { CreateUserUseCase } from "@users/domain/usecases/create";
import { DeleteUserUseCase } from "@users/domain/usecases/delete";
import { GetUsersUseCase } from "@users/domain/usecases/get";
import { UpdateUserUseCase } from "@users/domain/usecases/update";
import { GetByIdUserUseCase } from "@users/domain/usecases/get_by_id";
import { UploadUserUseCase } from "@users/domain/usecases/upload";

/**
 * Dependency injection container for user-related use cases.
 *
 * This object initializes and provides all user use cases with the necessary dependencies injected.
 * It wires together the data source (`UserApiDataSourceImpl`) with the repository (`UserRepositoryImpl`)
 * and then injects that repository into each use case (CRUD).
 *
 * @property getUsersUseCase    - Use case for retrieving all users.
 * @property createUsersUseCase - Use case for creating a new user.
 * @property updateUsersUseCase - Use case for updating an existing user by ID.
 * @property deleteUsersUseCase - Use case for deleting a user by ID.
 * @property getByIdUserUseCase - Use case for get user by ID.
 * @property uploadUserUseCase  - Use case for upload image to user.
 */
const userApiDataSource = new UserApiDataSourceImpl();
const userRepository = new UserRepositoryImpl(userApiDataSource);

export const diUsers = {
  getUsersUseCase: GetUsersUseCase(userRepository),
  createUsersUseCase: CreateUserUseCase(userRepository),
  updateUsersUseCase: UpdateUserUseCase(userRepository),
  deleteUsersUseCase: DeleteUserUseCase(userRepository),
  getByIdUserUseCase: GetByIdUserUseCase(userRepository),
  uploadUserUseCase: UploadUserUseCase(userRepository),
};