# RESTful API - SIMS-PPOB

A RESTful API for SIMS-PPOB (Payment Point Online Bank) built using Node.js, Express, and PostgreSQL.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technologies](#technologies)
- [Setup](#setup)
- [Environment Variables](#environment-variables)
- [Scripts](#scripts)
- [Endpoints](#endpoints)

## Overview

The REST API includes modules for Registration, Login, Balance Check, Top-Up, and Transactions. Transactions include payment services such as Credit, Game Vouchers, and more.

## Features

- User authentication with JWT (JSON Web Tokens)
- Secure password hashing using bcrypt
- File uploads and image management with Multer and Cloudinary
- PostgreSQL database integration

## Technologies

- **Backend Framework**: [Express](https://expressjs.com/)
- **Database**: PostgreSQL
- **Authentication**: JSON Web Tokens (JWT)
- **File Uploads**: Multer, Cloudinary
- **Environment Management**: dotenv
- **Others**: bcryptjs, cookie-parser, nanoid

## Setup

### Prerequisites

1. Install [Node.js](https://nodejs.org/)
2. Install [PostgreSQL](https://www.postgresql.org/)

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
5. Configure environment variables (see [Environment Variables](#environment-variables)).

### Run the Application

- **Development**:
  ```bash
  npm run dev
  ```
- **Production**:
  ```bash
  npm start
  ```

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

## Scripts

- **`npm run dev`**: Runs the server in development mode with Nodemon.
- **`npm start`**: Runs the server in production mode.

## Endpoints

For a complete list of available endpoints and how to use them, please refer to the Postman collections and environment exports available at the following link:

[Postman Collections](https://github.com/takimsry/nutech_api-sims-ppob/postman)