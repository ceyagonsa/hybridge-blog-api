'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Author extends Model {
    /**
     * Helper method for defining associations.
     */
    static associate(models) {
      // Un autor tiene muchos posts
      // Importante: La foreignKey debe llamarse igual en ambos modelos
      Author.hasMany(models.Post, { 
        foreignKey: 'authorId',
        as: 'posts'
      });
    }
  }

  Author.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Author',
    // ESTO CORRIGE LA CONEXIÓN:
    // Debe ser 'Authors' (Plural y con A mayúscula como en Supabase)
    tableName: 'Authors', 
    underscored: false, // Usamos false porque tus columnas son authorId (CamelCase)
    paranoid: true,     // Para que funcione el soft delete
    timestamps: true    // Asegúrate de tener created_at/updated_at o createdAt/updatedAt
  });

  return Author;
};