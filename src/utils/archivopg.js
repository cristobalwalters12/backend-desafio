const { Pool } = require('pg');
require('dotenv').config(); 

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  allowExitOnIdle: true,
});

const createPost = async (titulo, img, descripcion, likes) => {
  const result = await pool.query(
    'INSERT INTO posts (titulo, img, descripcion, likes) VALUES ($1, $2, $3, $4) RETURNING *',
    [titulo, img, descripcion, likes]
  );

  return result.rows[0];
}

const getPosts = async () => {
  const { rows } = await pool.query('SELECT * FROM posts');
  return rows;
}

