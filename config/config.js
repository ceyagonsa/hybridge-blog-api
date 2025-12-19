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
      // El 'pool' es vital para que la conexión no se quede colgada
      pool: {
        max: 5,
        min: 0,
        acquire: 30000, 
        idle: 10000
      }
    }
  };