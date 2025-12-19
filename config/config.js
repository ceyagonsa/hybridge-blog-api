module.exports = {
    development: {
      username: "postgres",
      password: "password",
      database: "database_dev",
      host: "127.0.0.1",
      dialect: "postgres"
    },
    production: {
      url: process.env.DATABASE_URL, // Cambiamos 'use_env_variable' por 'url'
      dialect: 'postgres',
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false
        }
      }
    }
  };