'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert(
			"Tags",
			[
				{ label: "Favorites", userId: 1 },
				{ label: "To Do", userId: 1 },
				{ label: "Tag1", userId: 1 },
				{ label: "Tag2", userId: 1 },
        { label: "Favorites", userId: 2 },
				{ label: "AppAcademy", userId: 2 },
			],
			{}
		);
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete("Tags", null, {});
	},
};