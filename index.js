require('dotenv').config();
const express = require('express');
const db = require('./models');
const authorsRoutes = require('./routes/authors.routes');
const postsRoutes = require('./routes/posts.routes'); // 1. Importar posts

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Registrar rutas
app.use('/api/authors', authorsRoutes);
app.use('/api/posts', postsRoutes); // 2. Usar posts

app.get('/', (req, res) => {
  res.json({ message: 'Bienvenido a la API de Hybridge Blog' });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});