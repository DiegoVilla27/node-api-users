import { UsersUseCase } from "@/domain/use-cases/users";
import { UserRepositoryImpl } from "@data/repository/users";

/**
 * Singleton class that provides access to user-related use cases.
 * 
 * This class ensures that only one instance of UserServicesSingleton exists,
 * providing a centralized point to access the UsersUseCase.
 * 
 * The UsersUseCase is initialized with a UserRepositoryImpl, which handles
 * data operations for user entities.
 * 
 * Methods:
 * - getInstance(): Returns the single instance of UserServicesSingleton.
 * - getUserUseCase(): Provides access to the UsersUseCase instance.
 */
class UserServicesSingleton {
  private static instance: UserServicesSingleton;
  private readonly userUseCase: UsersUseCase;

  private constructor() {
    const userRepository = new UserRepositoryImpl();
    this.userUseCase = new UsersUseCase(userRepository);
  }

  public static getInstance(): UserServicesSingleton {
    if (!UserServicesSingleton.instance) {
      UserServicesSingleton.instance = new UserServicesSingleton();
    }
    return UserServicesSingleton.instance;
  }

  public getUserUseCase(): UsersUseCase {
    return this.userUseCase;
  }
}

export default UserServicesSingleton;