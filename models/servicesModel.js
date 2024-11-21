import { pool } from '../db/connectDB.js';

export const getAllServices = async (email) => {
  const client = await pool.connect();

  try {
    const result = await client.query(
      'SELECT service_code, service_name, service_icon, service_tariff FROM services'
    );
    return result.rows;
  } catch (error) {
    throw error;
  } finally {
    client.release();
  }
}

export const getService = async (serviceCode) => {
  const client = await pool.connect();

  try {
    const result = await client.query(
      'SELECT service_code, service_name, service_icon, service_tariff FROM services WHERE service_code = $1;',
      [serviceCode]
    );
    return result.rows[0];
  } catch (error) {
    throw error;
  } finally {
    client.release();
  }
}