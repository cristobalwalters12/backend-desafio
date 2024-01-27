const express = require('express');
const cors = require('cors');
const { getPosts, createPost,updateLikes, deletePost} = require('../utils/archivopg');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/posts', async (_, res) => {
  try {
    const posts = await getPosts();
    res.json(posts);
  } catch (error) {
    console.error('Error al obtener los posts:', error);
    res.status(500).send('Error interno del servidor');
  }
});

app.post('/posts', async (req, res) => {
  const { id, titulo, img, descripcion, likes } = req.body;

  try {
    const newPost = await createPost(id, titulo, img, descripcion, likes);
    res.json(newPost);
  } catch (error) {
    console.error('Error al agregar el post:', error);
    res.status(500).send('Error interno del servidor');
  }
});

app.put('/posts/like/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const updatedPost = await updateLikes(id);
    res.json(updatedPost);
  } catch (error) {
    console.error('Error al actualizar los likes del post:', error);
    res.status(500).send('Error interno del servidor');
  }
});

app.delete('/posts/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedPost = await deletePost(id);
    res.json(deletedPost);
  } catch (error) {
    console.error('Error al eliminar el post:', error);
    res.status(500).send('Error interno del servidor');
  }
});

app.listen(port, () => {
  console.log(`Servidor Like Me en ejecución en http://localhost:${port}`);
});