const express = require("express");
const asyncHandler = require("express-async-handler");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { requireAuth } = require("../../utils/auth");
const { User, Notebook, Note } = require("../../db/models");

const router = express.Router();

const validateNotebook = [
	check("name")
		// .exists({ checkFalsy: true })
		.isLength({ min: 1, max: 50 })
		.withMessage("Notebook name must be unique and between 1 and 50 characters"),
	handleValidationErrors,
];

router.get(
	"/",
	requireAuth,
	asyncHandler(async (req, res) => {
		const userId = req.user.id;
		const notebooks = await Notebook.findAll({
			where: { userId },
		});
		res.json(notebooks);
	})
);

router.post(
	"/",
	requireAuth,
	validateNotebook,
	asyncHandler(async (req, res) => {
		const userId = req.user.id;
		const { title } = req.body;
		const notebook = await Notebook.create({ userId, title });
		res.json(notebook);
	})
);

//Patch applies ONLY to the title
router.patch(
	"/:notebookId",
	requireAuth,
	validateNotebook,
	asyncHandler(async (req, res) => {
		const notebookId = parseInt(req.params.notebookId, 10);
		const { name } = req.body;

		const notebookToUpdate = await Notebook.findByPk(notebookId);

		notebookToUpdate.name = name;

		const notebook = await notebookToUpdate.save();

		res.json(notebook);
	})
);

router.delete(
	"/:notebookId",
	requireAuth,
	asyncHandler(async (req, res, next) => {
		const notebookId = parseInt(req.params.notebookId, 10);
        const notebook = await Notebook.findByPk(notebookId);
        const notes = await Note.findAll({ where: { notebookId } });

		for (let i = 0; i < notes.length; i++) {
			let note = notes[i];
			note.isTrashed = true;
			await note.save();
		}
		await notebook.destroy();
		res.json(notebookId);   
	})
);

module.exports = router;

