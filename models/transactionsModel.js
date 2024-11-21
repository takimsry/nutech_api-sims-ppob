import { pool } from '../db/connectDB.js';

export const createTransaction = async (invoiceNumber, transactionType, description, total_amount, userEmail) => {
  const client = await pool.connect();

  try {
    const result = await client.query(
      'INSERT INTO transactions (invoice_number, transaction_type, description, total_amount, user_email) VALUES ($1, $2, $3, $4, $5) RETURNING *;',
      [invoiceNumber, transactionType, description, total_amount, userEmail]
    );
    return result.rows[0];
  } catch (error) {
    throw error;
  } finally {
    client.release();
  }
}

export const getAllTransactions = async (userEmail) => {
  const client = await pool.connect();

  try {
    const result = await client.query(
      'SELECT invoice_number, transaction_type, description, total_amount, created_on FROM transactions WHERE user_email = $1;',
      [userEmail]
    );
    return result.rows;
  } catch (error) {
    throw error;
  } finally {
    client.release();
  }
}