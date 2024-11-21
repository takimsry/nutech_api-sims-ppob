import { pool } from '../db/connectDB.js';

export const createUser = async (email, firstName, lastName, password) => {
  const client = await pool.connect();

  try {
    const result = await client.query(
      'INSERT INTO users (email, first_name, last_name, password) VALUES ($1, $2, $3, $4) RETURNING id, email, first_name, last_name;',
      [email, firstName, lastName, password]
    );
    return result.rows[0];
  } catch (error) {
    throw error;
  } finally {
    client.release();
  }
}

export const getUser = async (email) => {
  const client = await pool.connect();

  try {
    const result = await client.query(
      'SELECT * FROM users WHERE email = $1;',
      [email]
    );
    return result.rows[0];
  } catch (error) {
    throw error;
  } finally {
    client.release();
  }
}

export const updateUser = async (email, firstName, lastName, updatedOn) => {
  const client = await pool.connect();

  try {
    const result = await client.query(
      'UPDATE users SET first_name = $1, last_name = $2, updated_on = $3 WHERE email = $4 RETURNING first_name, last_name, profile_image;',
      [firstName, lastName? lastName : '', updatedOn, email]
    );
    return result.rows[0];
  } catch (error) {
    throw error;
  } finally {
    client.release();
  }
}

export const updateProfileImg = async (email, profileImage, updatedOn) => {
  const client = await pool.connect();

  try {
    const result = await client.query(
      'UPDATE users SET profile_image = $1, updated_on = $2 WHERE email = $3 RETURNING first_name, last_name, profile_image;',
      [profileImage, updatedOn, email]
    );
    return result.rows[0];
  } catch (error) {
    throw error;
  } finally {
    client.release();
  }
}