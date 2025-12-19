'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    static associate(models) {
      // Usamos 'Author' porque así se llama el modelo en Sequelize
      // Y la foreignKey debe coincidir con el nombre exacto en tu tabla
      Post.belongsTo(models.Author, { 
        foreignKey: 'authorId', 
        as: 'author' 
      });
    }
  }

  Post.init({
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    authorId: DataTypes.INTEGER,
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Post',
    // ESTO ES LO MÁS IMPORTANTE:
    // Debe coincidir letra por letra con lo que viste en Supabase
    tableName: 'Posts', 
    // Si en Supabase las columnas NO tienen guion bajo (como authorId), 
    // deja 'underscored' en false o quítalo.
    underscored: false, 
    paranoid: true,
  });

  return Post;
};