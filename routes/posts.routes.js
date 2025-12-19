const express = require('express');
const router = express.Router();
const { Post } = require('../models'); // Asegúrate de que la ruta a models sea correcta

router.get('/', async (req, res) => {
  console.log('Intentando obtener posts...'); // Esto saldrá en los logs de Render
  
  try {
    // Agregamos un timeout manual para que no se quede cargando por siempre
    const posts = await Post.findAll({ timeout: 10000 }); 
    
    if (!posts || posts.length === 0) {
      return res.json({ message: "No hay posts registrados aún", data: [] });
    }
    
    res.json(posts);
  } catch (error) {
    console.error('--- ERROR DETALLADO ---');
    console.error('Nombre:', error.name);
    console.error('Mensaje:', error.message);
    
    res.status(500).json({ 
      error: 'Hubo un problema con la base de datos',
      name: error.name,
      message: error.message 
    });
  }
});

module.exports = router;