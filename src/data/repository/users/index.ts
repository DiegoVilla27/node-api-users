
import { UserApiDataSource } from "@data/data-source/users";
import { UserModel, UserResponseModel } from "@data/models/users";
import { UserEntity, UserResponseEntity } from "@domain/entities/users";
import UserRepository from "@domain/repository/users";

export class UserRepositoryImpl implements UserRepository {
  private dataSource: UserApiDataSource;

  constructor() {
    this.dataSource = new UserApiDataSource();
  }

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
