import { pool } from '../db/connectDB.js';

export const getAllBanners = async () => {
  const client = await pool.connect();

  try {
    const result = await client.query(
      'SELECT banner_name, banner_image, description FROM banners ORDER BY banner_name ASC;'
    );
    return result.rows;
  } catch (error) {
    throw error;
  } finally {
    client.release();
  }
}