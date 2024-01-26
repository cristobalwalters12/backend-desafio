const express = require('express');
const cors = require('cors');
const database = require('../utils/database');
require('dotenv').config(); 
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());


app.get('/posts', async (_, res) => {
  try {
    const { rows } = await database.query('SELECT * FROM posts');
    res.json(rows);
  } catch (error) {
    console.error('Error al obtener los posts:', error);
    res.status(500).send('Error interno del servidor');
  }
});


app.post('/posts', async (req, res) => {
  const { titulo, img, descripcion, likes } = req.body;

  try {
    const result = await database.query(
      'INSERT INTO posts (titulo, img, descripcion, likes) VALUES ($1, $2, $3, $4) RETURNING *',
      [titulo, img, descripcion, likes]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error al agregar el post:', error);
    res.status(500).send('Error interno del servidor');
  }
});

app.listen(port, () => {
  console.log(`Servidor Like Me en ejecución en http://localhost:${port}`);
});
