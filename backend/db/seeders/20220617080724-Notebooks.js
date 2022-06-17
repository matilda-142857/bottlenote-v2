"use strict";

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert(
			"Notebooks",
			[
				{ title: "First Notebook", userId: 1 },
				{ title: "Second Notebook", userId: 1 },
				{ title: "Third Notebook", userId: 1 },
				{ title: "First Notebook", userId: 2 },
			],
			{}
		);
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete("Notebooks", null, {});
	},
};
