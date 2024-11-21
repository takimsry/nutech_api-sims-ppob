import { pool } from '../db/connectDB.js';

export const createUserBalance = async (userEmail) => {
  const client = await pool.connect();

  try {
    await client.query(
      'INSERT INTO user_balance (user_email) VALUES ($1);',
      [userEmail]
    );
  } catch (error) {
    throw error;
  } finally {
    client.release();
  }
}

export const getUserBalance = async (userEmail) => {
  const client = await pool.connect();

  try {
    const result = await client.query(
      'SELECT balance FROM user_balance WHERE user_email = $1;',
      [userEmail]
    );
    return result.rows[0];
  } catch (error) {
    throw error;
  } finally {
    client.release();
  }
}

export const updateUserBalance = async (userEmail, balance, updatedOn) => {
  const client = await pool.connect();

  try {
    await client.query(
      'UPDATE user_balance SET balance = $1, updated_on = $2 WHERE user_email = $3;',
      [balance, updatedOn, userEmail]
    );
  } catch (error) {
    throw error;
  } finally {
    client.release();
  }
}