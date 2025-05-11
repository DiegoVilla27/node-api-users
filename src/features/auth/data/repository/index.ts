
import { AuthApiDataSourceImpl } from "@auth/data/datasources";
import { AuthLoginMapper } from "@auth/data/mappers/login";
import { AuthRegisterMapper } from "@auth/data/mappers/register";
import { AuthLoginEntity } from "@auth/domain/entities/login";
import { AuthRegisterEntity } from "@auth/domain/entities/register";
import AuthRepository from "@auth/domain/repository";
import bcrypt from "bcrypt";

/**
 * Implementation of the UserRepository interface, providing methods to interact
 * with the user data source. This class handles CRUD operations for user entities,
 * converting between UserEntity and UserModel as needed.
 */
export class AuthRepositoryImpl implements AuthRepository {
  constructor(private dataSource: AuthApiDataSourceImpl) { }

  async login(user: AuthLoginEntity): Promise<void> {
    const loginRef = await this.dataSource.login(AuthLoginMapper.toModel(user));
    const loginSnapshot = await loginRef.docs[0].data();

    if (!loginSnapshot.password) {
      throw new Error('User has not been registered');
    }

    if (!loginSnapshot.emailVerified) {
      throw new Error('User has not verified the email');
    }

    const isMatch = await bcrypt.compare(user.password, loginSnapshot.password);
    if (!isMatch) {
      throw new Error('Invalid password');
    }
  }

  async register(user: AuthRegisterEntity): Promise<void> {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
    user.emailVerified = false;

    const authRef = await this.dataSource.register(AuthRegisterMapper.toModel(user));
    await authRef.update({ id: authRef.id });
  }
}
