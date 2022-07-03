'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert(
			"NoteTags",
			[
			// 	{ noteId: 1, tagId: 1 },
			// 	{ noteId: 1, tagId: 2 },
			// 	{ noteId: 1, tagId: 3 },
			// 	{ noteId: 2, tagId: 1 },
			// 	{ noteId: 2, tagId: 3 },
			// 	{ noteId: 4, tagId: 1 },
			// 	{ noteId: 4, tagId: 4 },
				{ noteId: 5, tagId: 5 },
			// 	{ noteId: 6, tagId: 5 },
			// 	{ noteId: 6, tagId: 6 },
			],
			{}
		);
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete("NoteTags", null, {});
	},
};
