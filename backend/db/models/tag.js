'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tag = sequelize.define('Tag', {
    label: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {});
  Tag.associate = function(models) {
    Tag.belongsTo(models.User, 
      { foreignKey: "userId" });
		Tag.belongsToMany(models.Note, {
			through: "NoteTag",
			otherKey: "noteId",
			foreignKey: "tagId",
		});
  };
  return Tag;
};