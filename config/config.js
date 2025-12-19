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
        }
      },
      // Configuración de Pool optimizada para Render + Supabase
      pool: {
        max: 1,
        min: 0,           // Mantiene al menos una conexión "viva"
        acquire: 30000,   // Tiempo máximo de espera (60 segundos)
        idle: 5000,
        evict: 1000      // Cierra conexiones inactivas después de 10 segundos
      }
    }
  };