
import { UserApiDataSource } from "@data/data-source/users";
import { UserModel, UserResponseModel } from "@data/models/users";
import { UserEntity, UserResponseEntity } from "@domain/entities/users";
import UserRepository from "@domain/repository/users";

/**
 * Implementation of the UserRepository interface, providing methods to interact
 * with the user data source. This class handles CRUD operations for user entities,
 * converting between UserEntity and UserModel as needed.
 */
export class UserRepositoryImpl implements UserRepository {
  private dataSource: UserApiDataSource;

  constructor() {
    this.dataSource = new UserApiDataSource();
  }

  /**
   * Retrieves user data from the data source and converts it into a UserResponseEntity.
   * 
   * @returns {Promise<UserResponseEntity>} A promise that resolves to a UserResponseEntity
   * containing the user data.
   */
  async get(): Promise<UserResponseEntity> {
    const res = await this.dataSource.get();
    const users: UserEntity[] = [];

    res.forEach((doc) => {
      const data = doc.data();
      const newUser = new UserModel(
        doc.id,
        data.nombre,
        data.edad,
        { pais: data.direccion.pais }
      ).toEntity();
      users.push(newUser);
    });

    const userEntityResponse = new UserResponseModel(0, 0, users.length, users);

    return userEntityResponse.toEntity();
  }

  /**
   * Creates a new user in the data source and returns the created UserEntity.
   *
   * @param user - The UserEntity object containing user details to be created.
   * @returns A promise that resolves to the created UserEntity.
   *
   * This method converts the UserEntity to a UserModel, saves it to the data source,
   * updates the reference with the generated ID, retrieves the saved data, and
   * converts it back to a UserEntity before returning.
   */
  async create(user: UserEntity): Promise<UserEntity> {
    const userRef = await this.dataSource.create(new UserModel(
      user.id,
      user.firstName,
      user.age,
      { pais: user.address.country }
    ));
    await userRef.update({ id: userRef.id });
    const docSnapshot = await userRef.get();

    return new UserModel(
      docSnapshot.data()?.id,
      docSnapshot.data()?.nombre,
      docSnapshot.data()?.edad,
      { pais: docSnapshot.data()?.direccion.pais }
    ).toEntity();
  }

  /**
   * Updates a user entity in the data source with the given ID and returns the updated entity.
   *
   * @param id - The unique identifier of the user to be updated.
   * @param user - The UserEntity object containing updated user information.
   * @returns A promise that resolves to the updated UserEntity.
   */
  async update(id: string, user: UserEntity): Promise<UserEntity> {
    const userRef = await this.dataSource.update(id);

    const userUpdate = new UserModel(
      userRef.id,
      user.firstName,
      user.age,
      { pais: user.address.country }
    );
    await userRef.update(userUpdate.toJSON());
    const docSnapshot = await userRef.get();

    return new UserModel(
      docSnapshot.data()?.id,
      docSnapshot.data()?.nombre,
      docSnapshot.data()?.edad,
      { pais: docSnapshot.data()?.direccion.pais }
    ).toEntity();
  }

  /**
   * Deletes a user by their ID from the data source and returns the deleted user as a UserEntity.
   * 
   * @param id - The unique identifier of the user to be deleted.
   * @returns A promise that resolves to the deleted UserEntity.
   * @throws An error if the user does not exist.
   */
  async delete(id: string): Promise<UserEntity> {
    const userRef = await this.dataSource.delete(id);
    const docSnapshot = await userRef.get();
    
    if (!docSnapshot.exists) {
      throw new Error(`User ${id} does not exist`);
    }

    await userRef.delete();

    return new UserModel(
      docSnapshot.data()?.id,
      docSnapshot.data()?.nombre,
      docSnapshot.data()?.edad,
      { pais: docSnapshot.data()?.direccion.pais }
    ).toEntity();
  }
}
