const { Pool } = require('pg');
require('dotenv').config(); 


const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
  allowExitOnIdle: true,
});

const getPosts = async () => {
  const { rows } = await pool.query('SELECT * FROM posts');
  return rows;
}
const createPost = async (id, titulo, img, descripcion, likes) => {
  const existingPost = await pool.query(
    'SELECT * FROM posts WHERE id = $1',
    [id]
  );
  if (existingPost.rows.length > 0) {
    throw new Error('Ya existe un post con ese id');
  }else{
    const result = await pool.query(
      'INSERT INTO posts (id,titulo, img, descripcion, likes) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [id,titulo, img, descripcion, likes]
    );
    return result.rows[0];
  }
}

const updateLikes = async (id) => {
  const result = await pool.query(
    'UPDATE posts SET likes = likes + 1 WHERE id = $1 RETURNING *',
    [id]
  );

  return result.rows[0];
}

const deletePost = async (id) => {
  const existingPost = await pool.query(
    'SELECT * FROM posts WHERE id = $1',
    [id]
  );
  if(existingPost.rows.length === 0){
    throw new Error('No existe un post con ese id');
  }
  else{
    const result = await pool.query(
      'DELETE FROM posts WHERE id = $1 RETURNING *',
      [id]
    );
    return result.rows[0];
  }
}
module.exports = { getPosts, createPost, updateLikes, deletePost };