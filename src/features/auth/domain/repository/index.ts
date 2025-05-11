import { AuthLoginEntity } from "@auth/domain/entities/login";
import { AuthRegisterEntity } from "@auth/domain/entities/register";

/**
 * Interface for auth repository operations.
 * Provides methods to perform CRUD operations on user entities.
 *
 * @method login - Retrieves a list of users wrapped in a UserResponseEntity.
 * @method register - Adds a new user and returns the created UserEntity.
 */
export interface AuthRepository {
  login(user: AuthLoginEntity): Promise<void>;
  register(user: AuthRegisterEntity): Promise<void>;
}

export default AuthRepository;