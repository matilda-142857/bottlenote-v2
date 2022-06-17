'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
			"Notes",
			[
				{
					title: "First Note",
					content: "Testing, one two three",
					isTrashed: false,
          notebookId: 1,
				},
				{
					title: "Second Note",
					content: "Testing, one two three four",
					isTrashed: false,
          notebookId: 1,
				},
				{
					title: "Third Note",
					content: "This note has been trashed",
					isTrashed: true,
          notebookId: 1,
				},
				{
					title: "Fourth Note",
					content: "Testing, one two three, 123",
					isTrashed: false,
          notebookId: 2,
				},
        {
					title: "Fifth Note",
					content: "Testing, un deux trois",
					isTrashed: false,
          notebookId: 4,
				},
        {
					title: "Sixth Note",
					content: "This is also in the trash",
					isTrashed: true,
          notebookId: 4,
				},
			],
			{}
		);
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete("Notes", null, {});
	},
};