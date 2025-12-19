require('dotenv').config();
const express = require('express');
const db = require('./models');
const authorsRoutes = require('./routes/authors.routes');
const postsRoutes = require('./routes/posts.routes');

const app = express();
const PORT = process.env.PORT || 10000; // Render usa el 10000 por defecto

app.use(express.json());

app.use('/api/authors', authorsRoutes);
app.use('/api/posts', postsRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Bienvenido a la API de Hybridge Blog' });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});