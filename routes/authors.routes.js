const { Router } = require('express');
const db = require('../models');

const router = Router();

// CREATE
router.post('/', async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ error: 'Name requerido' });
    }

    const author = await db.Author.create({ name });
    res.status(201).json(author);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// READ ALL
router.get('/', async (req, res) => {
  const authors = await db.Author.findAll();
  res.json(authors);
});

// READ ONE
router.get('/:id', async (req, res) => {
  const author = await db.Author.findByPk(req.params.id);

  if (!author) {
    return res.status(404).json({ error: 'Autor no encontrado' });
  }

  res.json(author);
});

// UPDATE
router.patch('/:id', async (req, res) => {
  const author = await db.Author.findByPk(req.params.id);

  if (!author) {
    return res.status(404).json({ error: 'Autor no encontrado' });
  }

  author.name = req.body.name;
  await author.save();
  res.json(author);
});

// DELETE
router.delete('/:id', async (req, res) => {
  const author = await db.Author.findByPk(req.params.id);

  if (!author) {
    return res.status(404).json({ error: 'Autor no encontrado' });
  }

  await author.destroy();
  res.json({ message: 'Autor eliminado correctamente' });
});

module.exports = router;
