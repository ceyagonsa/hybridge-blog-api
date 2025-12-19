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
      protocol: 'postgres',
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false
        },
        // 🔹 CRÍTICO: Esto desactiva los Prepared Statements que el pooler de Supabase no soporta
        prepareThreshold: 0, 
        keepAlive: true
      },
      pool: {
        max: 2,             // Mantiene pocas conexiones para no saturar el plan gratuito
        min: 0,
        acquire: 60000,     // Tiempo de espera para obtener conexión (60 seg)
        idle: 5000,         // Libera la conexión tras 5 segundos de inactividad
        evict: 1000         // Limpia conexiones muertas cada segundo
      },
      // 🔹 Ayuda a que las consultas SQL sean más simples y compatibles
      minifyAliases: true,
      logging: false        // Cambia a console.log si necesitas ver las consultas en los logs
    }
  };