const { Router } = require('express');
const db = require('../models');

const router = Router();

// CREATE
router.post('/', async (req, res) => {
  const { title, content, authorId } = req.body;

  if (!title || !content || !authorId) {
    return res.status(400).json({ error: 'Campos requeridos' });
  }

  const post = await db.Post.create({ title, content, authorId });
  res.status(201).json(post);
});

// READ ALL
router.get('/', async (req, res) => {
  const posts = await db.Post.findAll({
    include: db.Author
  });
  res.json(posts);
});

// READ ONE
router.get('/:id', async (req, res) => {
  const post = await db.Post.findByPk(req.params.id, {
    include: db.Author
  });

  if (!post) {
    return res.status(404).json({ error: 'Post no encontrado' });
  }

  res.json(post);
});

// UPDATE
router.patch('/:id', async (req, res) => {
  const post = await db.Post.findByPk(req.params.id);

  if (!post) {
    return res.status(404).json({ error: 'Post no encontrado' });
  }

  Object.assign(post, req.body);
  await post.save();
  res.json(post);
});

// DELETE
router.delete('/:id', async (req, res) => {
  const post = await db.Post.findByPk(req.params.id);

  if (!post) {
    return res.status(404).json({ error: 'Post no encontrado' });
  }

  await post.destroy();
  res.json({ message: 'Post eliminado correctamente' });
});

module.exports = router;
