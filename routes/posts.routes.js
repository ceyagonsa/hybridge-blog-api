const express = require('express');
const router = express.Router();
const { Post, Author } = require('../models'); 

router.get('/', async (req, res) => {
  console.log('--- Nueva petición: Intentando obtener posts ---');
  
  try {
    // Buscamos los posts e incluimos al autor para que la respuesta sea completa
    const posts = await Post.findAll({
      include: [{
        model: Author,
        as: 'author' // Debe coincidir con el 'as' de tu modelo Post
      }],
      order: [['createdAt', 'DESC']] // Opcional: los más nuevos primero
    });
    
    if (!posts || posts.length === 0) {
      console.log('Consulta exitosa: No hay posts.');
      return res.status(200).json([]); // Devolvemos array vacío para que el frontend no rompa
    }
    
    console.log(`Consulta exitosa: Se encontraron ${posts.length} posts.`);
    return res.status(200).json(posts);

  } catch (error) {
    console.error('--- ERROR DETALLADO EN RUTA POSTS ---');
    console.error('Nombre:', error.name);
    console.error('Mensaje:', error.message);
    
    // Si el error es de timeout, enviamos un aviso claro
    if (error.name === 'SequelizeConnectionAcquireTimeoutError') {
      return res.status(504).json({
        error: 'La base de datos tardó demasiado en responder. Intenta refrescar.',
        type: error.name
      });
    }

    return res.status(500).json({ 
      error: 'Hubo un problema con la base de datos',
      message: error.message 
    });
  }
});

module.exports = router;