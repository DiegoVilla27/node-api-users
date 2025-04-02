# Clean Architecture with Node.js Express Project and Firebase Integration

This project is a simple Node.js application built using Express and Firebase. Baesed in Clean Architecture. It requires Firebase configuration to connect to Firebase services.

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 20.12.2)
- [npm](https://npmjs.com) (Node package manager version 10.5.0)

Additionally, you'll need a Firebase project for authentication and database services.

## Getting Started

- npm install
- npm run dev (server port is 3100)
- Config firebase keys json (create a file in src/infrastructure/database/firebaseServiceAccount.json with your data):
  - The name collection must be _users_
  - File json in firebase is located in: Configuration -> Project configuration -> Services account -> Generate new private key

```json
{
  "type": "",
  "project_id": "",
  "private_key_id": "",
  "private_key": "",
  "client_email": "",
  "client_id": "",
  "auth_uri": "",
  "token_uri": "",
  "auth_provider_x509_cert_url": "",
  "client_x509_cert_url": "",
  "universe_domain": ""
}
```