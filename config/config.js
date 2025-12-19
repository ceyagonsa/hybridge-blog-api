module.exports = {
    development: {
      username: "postgres",
      password: "password",
      database: "database_dev",
      host: "127.0.0.1",
      dialect: "postgres"
    },
    production: {
      use_env_variable: 'DATABASE_URL',
      dialect: 'postgres',
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false
        },
        keepAlive: true
      },
      pool: {
        max: 2,           // Solo 2 conexiones para no saturar el plan gratuito
        min: 0,           
        acquire: 60000,   // 60 segundos de espera (crítico para Render)
        idle: 5000,       // Cerrar conexión inactiva tras 5 segundos
        evict: 1000       // Limpiar conexiones muertas cada segundo
      },
      // Ayuda a la estabilidad en conexiones con poolers
      minifyAliases: true 
    }
  };