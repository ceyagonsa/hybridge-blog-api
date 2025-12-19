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
        max: 2,           
        min: 0,
        acquire: 60000,    // Aumentamos a 60s para dar margen a Render
        idle: 5000,        
        evict: 1000       
      },
      // Esto evita que Sequelize intente usar prepared statements que rompen el puerto 6543
      minifyAliases: true 
    }
  };