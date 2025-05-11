import { LoginUseCase } from "@auth/domain/usecases/login";
import { RegisterUseCase } from "@auth/domain/usecases/register";
import { AuthApiDataSourceImpl } from "@auth/data/datasources";
import { AuthRepositoryImpl } from "@auth/data/repository";

/**
 * Dependency injection container for user-related use cases.
 *
 * This object initializes and provides all user use cases with the necessary dependencies injected.
 * It wires together the data source (`UserApiDataSourceImpl`) with the repository (`UserRepositoryImpl`)
 * and then injects that repository into each use case (CRUD).
 *
 * @property getUsersUseCase         - Use case for retrieving all users.
 * @property createUsersUseCase      - Use case for creating a new user.
 */
const authApiDataSource = new AuthApiDataSourceImpl();
const authRepository = new AuthRepositoryImpl(authApiDataSource);

export const diAuth = {
  loginUseCase: LoginUseCase(authRepository),
  registerUseCase: RegisterUseCase(authRepository)
};