'use strict';
module.exports = (sequelize, DataTypes) => {
  const Notebook = sequelize.define('Notebook', {
    title: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {});
  Notebook.associate = function(models) {
    Notebook.belongsTo(models.User, { 
      foreignKey: "userId" 
    });
		Notebook.hasMany(models.Note, { 
      foreignKey: "notebookId" ,
      onDelete: "CASCADE",
      hooks: true,
    });
  };
  return Notebook;
};