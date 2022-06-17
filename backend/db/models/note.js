'use strict';
module.exports = (sequelize, DataTypes) => {
  const Note = sequelize.define('Note', {
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    isTrashed: DataTypes.BOOLEAN,
    notebookId: DataTypes.INTEGER
  }, {});
  Note.associate = function(models) {
    Note.belongsTo(models.Notebook, { 
      foreignKey: "notebookId" 
    });
		Note.belongsToMany(models.Tag, {
			through: "NoteTag",
			otherKey: "tagId",
			foreignKey: "noteId",
		});
  };
  return Note;
};