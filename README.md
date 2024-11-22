# RESTful API - SIMS-PPOB

A RESTful API for SIMS-PPOB (Online Service Payment) built using Node.js, Express, and PostgreSQL. The REST API includes modules for Registration, Login, Balance Check, Top-Up, and Transactions. Transactions include payment services such as Credit, Game Vouchers, and more.

## DDL

For the database schema (DDL), please refer to the following file:
[DDL Schema](https://github.com/takimsry/nutech_api-sims-ppob/blob/master/db/ddl/ddl.sql)

For the banners and services seeder, please refer to the following file:
[Seeder SQL](https://github.com/takimsry/nutech_api-sims-ppob/blob/master/db/seeder/seeder.sql)

## Features

- **Transaction Handling**: Allows users to perform transactions such as paying for Pulsa, Game Vouchers, and other services.
- **Balance Top-Up**: Users can top-up their balance to make payments for services.
- **Profile and General Information**: Users can view their profile, available banners, and services for payments.
- User authentication with JWT (JSON Web Tokens)
- Secure password hashing using bcrypt
- File uploads and image management with Multer and Cloudinary
- PostgreSQL database integration

## Tech Stack

- **Backend Framework**: Express.js
- **Database**: PostgreSQL
- **Authentication**: JSON Web Tokens (JWT)
- **File Uploads**: Multer, Cloudinary
- **Environment Management**: dotenv
- **Others**: bcryptjs, cookie-parser, nanoid

## Setup

### Prerequisites

1. Install Node.js
2. Install PostgreSQL

### Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/takimsry/api_sims-ppob.git
   ```
2. Navigate to the project directory:
   ```bash
   cd api_sims-ppob
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Set up the PostgreSQL database using the provided DDL scripts.
5. Configure environment variables.

## Environment Variables

Create a `.env` file in the root directory and configure the following:

```env
POSTGRES_URI=your_postgresql_connection_string
PORT=3000
JWT_SECRET=your_jwt_secret
NODE_ENV=development_or_production
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

### Run the Application

- **Development**:
  ```bash
  npm run dev
  ```
- **Production**:
  ```bash
  npm start
  ```

## Scripts

- **`npm run dev`**: Runs the server in development mode with Nodemon.
- **`npm start`**: Runs the server in production mode.

## Endpoints

For a complete list of available endpoints and how to use them, please refer to the Postman collections and environment exports available at the following folder:

[Postman Collections & Environment](https://github.com/takimsry/nutech_api-sims-ppob/tree/master/postman)