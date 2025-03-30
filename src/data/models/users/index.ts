import { UserEntity, UserResponseEntity } from "@domain/entities/users";

export class UserModel {
  id: string;
  nombre: string;
  edad: number;
  direccion: {
    pais: string;
  };

  constructor(id: string, nombre: string, edad: number, direccion: { pais: string }) {
    this.id = id;
    this.nombre = nombre;
    this.edad = edad;
    this.direccion = direccion;
  }

  toEntity(): UserEntity {
    return new UserEntity(this.id, this.nombre, this.edad, { country: this.direccion.pais });
  }

  toJSON() {
    return {
      id: this.id,
      nombre: this.nombre,
      edad: this.edad,
      direccion: { pais: this.direccion.pais },
    };
  }
}

export class UserResponseModel {
  limit: number;
  skip: number;
  total: number;
  users: UserEntity[];

  constructor(limit: number, skip: number, total: number, users: UserEntity[]) {
    this.limit = limit;
    this.skip = skip;
    this.total = total;
    this.users = users;
  }

  toEntity(): UserResponseEntity {
    return new UserResponseEntity(
      this.limit,
      this.skip,
      this.total,
      this.users.map((user) =>
        new UserModel(
          user.id,
          user.firstName,
          user.age,
          { pais: user.address.country }
        ).toEntity()
      )
    );
  }
}