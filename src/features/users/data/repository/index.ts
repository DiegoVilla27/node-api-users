
import { UploadParams } from "@/shared/interfaces/upload";
import { UserApiDataSourceImpl } from "@users/data/datasources";
import { UserMapper } from "@users/data/mappers/user";
import { UserResponseMapper } from "@users/data/mappers/user_response";
import { UserModel } from "@users/data/models/user";
import { UserResponseModel } from "@users/data/models/user_response";
import { UserEntity } from "@users/domain/entities/user";
import { UserResponseEntity } from "@users/domain/entities/user_response";
import UserRepository from "@users/domain/repository";

/**
 * Implementation of the UserRepository interface, providing methods to interact
 * with the user data source. This class handles CRUD operations for user entities,
 * converting between UserEntity and UserModel as needed.
 */
export class UserRepositoryImpl implements UserRepository {
  constructor(private dataSource: UserApiDataSourceImpl) { }

  /**
   * Retrieves all users from the data source, maps them to domain models, and returns them as a UserResponseEntity.
   *
   * This method:
   * - Fetches raw user documents from the data source.
   * - Converts each document into a `UserModel` instance.
   * - Wraps the list of models into a `UserResponseModel`.
   * - Maps the response model to a domain-level `UserResponseEntity` using `UserResponseMapper`.
   *
   * @returns A promise that resolves to a `UserResponseEntity` containing the list of users.
   */
  async get(): Promise<UserResponseEntity> {
    const res = await this.dataSource.get();
    const users: UserModel[] = [];

    res.forEach((doc) => {
      const data = doc.data();
      const newUserModel = new UserModel(
        doc.id,
        data.firstName,
        data.age,
        { country: data.address.country },
        data.avatar
      );
      users.push(newUserModel);
    });

    const userEntityResponse = UserResponseMapper.toEntity(new UserResponseModel(0, 0, users.length, users));
    return userEntityResponse;
  }


  /**
   * Creates a new user in the data source and returns the created UserEntity.
   *
   * This method:
   * - Converts the domain-level UserEntity to a persistence model using `UserMapper.toModel`.
   * - Sends the model to the data source for creation.
   * - Updates the created document with its own ID (e.g., for consistency in the stored data).
   * - Retrieves the created document snapshot.
   * - Converts the persisted data back into a domain-level UserEntity using `UserMapper.toEntity`.
   *
   * @param user - The UserEntity to be created.
   * @returns A promise that resolves to the created UserEntity.
   * @throws Will throw an error if the created document does not exist or its data is missing.
   */
  async create(user: UserEntity): Promise<UserEntity> {
    const userRef = await this.dataSource.create(UserMapper.toModel(user));

    await userRef.update({ id: userRef.id });

    const docSnapshot = await userRef.get();
    if (!docSnapshot.exists) {
      throw new Error(`User "${userRef.id}" does not exist`);
    }

    const data = docSnapshot.data();
    if (!data) {
      throw new Error('Failed to retrieve user data after creation');
    }

    return UserMapper.toEntity(new UserModel(
      data.id,
      data.firstName,
      data.age,
      { country: data.address.country },
      data.avatar
    ));
  }

  /**
   * Updates an existing user in the data source and returns the updated UserEntity.
   *
   * This method:
   * - Obtains a reference to the user document using the provided ID.
   * - Maps the input `UserEntity` to a persistence model using `UserMapper.toModel`.
   * - Updates the user document with the new data.
   * - Fetches the updated document snapshot.
   * - Validates the existence and data of the updated document.
   * - Converts the updated data back into a domain-level `UserEntity`.
   *
   * @param id - The ID of the user to update.
   * @param user - The `UserEntity` containing the new user data.
   * @returns A promise that resolves to the updated `UserEntity`.
   * @throws Will throw an error if the document does not exist or its data is missing after update.
   */
  async update(id: string, user: UserEntity): Promise<UserEntity> {
    const userRef = await this.dataSource.update(id);

    const userModel = UserMapper.toModel(user);
    await userRef.update(userModel.toJSON());

    const docSnapshot = await userRef.get();
    if (!docSnapshot.exists) {
      throw new Error(`User "${id}" does not exist`);
    }

    const data = docSnapshot.data();
    if (!data) {
      throw new Error('Failed to retrieve user data after update');
    }

    return UserMapper.toEntity(new UserModel(
      data.id,
      data.firstName,
      data.age,
      { country: data.address.country },
      data.avatar
    ));
  }

  /**
   * Deletes a user from the data source and returns the deleted user's data as a `UserEntity`.
   *
   * This method:
   * - Obtains a reference to the user document by ID.
   * - Fetches the current snapshot of the user before deletion.
   * - Verifies the document exists and contains data.
   * - Deletes the document from the data source.
   * - Maps the previously fetched data to a domain-level `UserEntity` for return.
   *
   * @param id - The ID of the user to be deleted.
   * @returns A promise that resolves to the deleted `UserEntity`, containing the user's last known state.
   * @throws Will throw an error if the document does not exist or its data is missing before deletion.
   */
  async delete(id: string): Promise<UserEntity> {
    const userRef = await this.dataSource.delete(id);
    const docSnapshot = await userRef.get();

    if (!docSnapshot.exists) {
      throw new Error(`User "${id}" does not exist`);
    }

    await userRef.delete();

    const data = docSnapshot.data();
    if (!data) {
      throw new Error('Failed to retrieve user data after update');
    }

    return UserMapper.toEntity(new UserModel(
      data.id,
      data.firstName,
      data.age,
      { country: data.address.country },
      data.avatar
    ));
  }

  /**
   * Retrieves a user from the data source by their unique ID and returns it as a `UserEntity`.
   *
   * This method:
   * - Requests a reference to the user document using the provided ID.
   * - Checks whether the document exists.
   * - Verifies that the document contains valid user data.
   * - Maps the retrieved data to a domain-level `UserEntity` object.
   *
   * @param id - The unique identifier of the user to retrieve.
   * @returns A promise that resolves to the corresponding `UserEntity`.
   * @throws Will throw an error if the document does not exist or its data is missing.
   */
  async getById(id: string): Promise<UserEntity> {
    const userRef = await this.dataSource.getById(id);

    if (!userRef.exists) {
      throw new Error(`User "${id}" does not exist`);
    }

    const data = userRef.data();
    if (!data) {
      throw new Error('Failed to retrieve user data after get');
    }

    return UserMapper.toEntity(new UserModel(
      data.id,
      data.firstName,
      data.age,
      { country: data.address.country },
      data.avatar
    ));
  }

  /**
   * Uploads a user image to the external storage (e.g., AWS S3) and updates the user's avatar URL.
   *
   * This method:
   * - Retrieves the user entity by its ID to ensure it exists.
   * - Uploads the provided image using the storage data source with the given parameters.
   * - Once uploaded, updates the `avatar` field of the user entity with the returned image URL.
   * - Persists the updated user entity back to the data source.
   *
   * @param params - The parameters required for uploading the image, such as bucket, key, body, and content type.
   * @param id - The unique identifier of the user whose avatar will be updated.
   * @returns A Promise that resolves when the upload and update are successfully completed.
   * @throws Will throw an error if the user does not exist or if the upload or update fails.
   */
  async uploadImage(params: UploadParams, id: string): Promise<void> {
    const userRef = await this.getById(id);
    if (!userRef) {
      throw new Error(`User "${id}" does not exist`);
    }

    (await this.dataSource.uploadImage(params)).promise().then(async (res) => {
      userRef.avatar = res.Location;
      await this.update(id, userRef);
    });
  }
}
