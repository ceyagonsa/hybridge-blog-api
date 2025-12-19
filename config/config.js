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
        max: 3,            // Estricto: 1 sola conexión para evitar saturación
        min: 0,
        acquire: 30000,    // 60 segundos de paciencia para conectar
        idle: 10000,        // Libera la conexión en 1 segundo
        // evict: 500         // Limpieza constante de conexiones muertas
      }
    }
  };