# 👤 User Management API

A RESTful API built with **Node.js (v20.12.2)** and **Express (v4.21.2)** to manage user data including creation, reading, updating, deleting, and image uploads. It follows **Clean Architecture** principles and integrates with **Firebase** for data persistence.

---

## 🚀 Features

- ✅ **CRUD** operations for users  
- 📄 Get user by ID  
- 📤 Upload user images (Firebase Storage)  
- 🧱 Clean Architecture  
- 🔥 Firebase Firestore as the database  
- ⚙️ Environment variable support with `.env`  
- 📚 API documentation with Swagger

---

## ⚙️ Requirements

- **Node.js:** v20.12.2
- **npm:** v10.5.0
- **Firebase Project:** With Firestore and Storage enabled

---

## 📦 Installation

1. **Clone the repository:**

```bash
git clone https://github.com/DiegoVilla27/node-api-users
cd node-api-users
```

2. **Install dependencies:**

```bash
npm install
```

3. **Set environment variables:**

Create a `.env` file in the root:

```env
PORT=3100
```

You may also use a `firebaseServiceAccount.json` and load it from `src/core/database/firebase`.

4. **Run the server:**

```bash
npm run dev
```

---

## 🧪 Example Endpoints

- **Auth**

----------------------------------------------------------------
| Method   | Endpoint                | Description             |
|----------|-------------------------|-------------------------|
| LOGIN    | `/login`                | Login user              |
| REGISTER | `/register`             | Register an user        |
----------------------------------------------------------------
- **Users**

----------------------------------------------------------------
| Method | Endpoint                  | Description             |
|--------|---------------------------|-------------------------|
| GET    | `/users`                  | List all users          |
| GET    | `/users/:id`              | Get user by ID          |
| POST   | `/users`                  | Create a new user       |
| PUT    | `/users/:id`              | Update a user           |
| DELETE | `/users/:id`              | Delete a user           |
| POST   | `/users/:id/upload_image` | Upload user image       |
| POST   | `/users/:id/delete_image` | Delete user image       |
----------------------------------------------------------------
---

## 🏗️ Clean Architecture Layers

- **Core**: DI, Routes, Database
- **Domain Layer**: Entities, UseCases, Repository
- **Data Layer**: Models, Mappers, Repositories, DataSources
- **Infrastructure Layer**: Controllers, Errors, Routes, DI

---

## 🔐 Environment Variables

| Name                      | Description                          |
|---------------------------|--------------------------------------|
| `PORT`                    | Port where the server runs           |
| `AWS_ACCESS_KEY_ID`       | AWS access key                       |
| `AWS_SECRET_ACCESS_KEY`   | AWS secret access key                |
| `AWS_BUCKET_NAME`         | AWS Bucket name                      |
| `AWS_URL_IMAGES`          | AWS Url API Images                   |
| `JWT_SECRET`              | JWT secret key                       |

---

## 🧑‍💻 Author

- Diego Villa
- Frontend Software Engineer

---

## 📄 License

MIT