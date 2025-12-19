const express = require('express');
const router = express.Router();
const { Post, Author } = require('../models'); 

router.get('/', async (req, res) => {
  console.log('--- [PASO 1] Petición recibida en /posts ---');
  
  try {
    console.log('--- [PASO 2] Consultando a la base de datos... ---');
    
    const posts = await Post.findAll({
      include: [{
        model: Author,
        as: 'author'
      }],
      order: [['createdAt', 'DESC']]
    });
    
    console.log(`--- [PASO 3] Éxito: ${posts.length} posts encontrados ---`);
    return res.status(200).json(posts);

  } catch (error) {
    console.error('--- [ERROR] Error en la ruta de posts ---');
    console.error('Tipo de Error:', error.name);
    console.error('Mensaje:', error.message);
    
    // Respuesta específica para problemas de conexión
    if (error.name === 'SequelizeConnectionAcquireTimeoutError') {
      return res.status(504).json({
        error: 'Tiempo de espera agotado. La base de datos está tardando en responder.',
        suggestion: 'Refresca la página en 10 segundos.'
      });
    }

    return res.status(500).json({ 
      error: 'Error interno del servidor',
      detail: error.message 
    });
  }
});

module.exports = router;