'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const db = {};

let sequelize;

// =======================================
// PRODUCCIÓN (Render / Supabase)
// =======================================
if (process.env.DATABASE_URL) {
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false // necesario para Supabase Free
      }
    },
    pool: {
      max: 3,        // 🔴 Supabase free: máximo 3 conexiones
      min: 0,
      acquire: 20000, // tiempo máximo para obtener conexión
      idle: 5000      // libera conexiones inactivas rápido
    },
    define: {
      timestamps: true // ⬅️ timestamps automáticos en todos los modelos
    },
    logging: false // ⬅️ opcional: puedes poner console.log para debug
  });
} else {
  // =======================================
  // LOCAL
  // =======================================
  const env = process.env.NODE_ENV || 'development';
  const config = require(__dirname + '/../config/config.json')[env];

  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    {
      ...config,
      define: {
        timestamps: true
      },
      logging: console.log // útil para desarrollo
    }
  );
}

// =======================================
// Cargar modelos
// =======================================
fs.readdirSync(__dirname)
  .filter(file =>
    file.indexOf('.') !== 0 &&
    file !== basename &&
    file.endsWith('.js')
  )
  .forEach(file => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

// =======================================
// Asociaciones
// =======================================
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
