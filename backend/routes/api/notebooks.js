const express = require("express");
const asyncHandler = require("express-async-handler");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { requireAuth } = require("../../utils/auth");
const { Notebook, Note } = require("../../db/models");

const router = express.Router();

const validateNotebook = [
	check("title")
		.exists({ checkFalsy: true })
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
		    }
        );
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
		const newTitle = await Notebook.findByPk(notebookId);
        const { title } = req.body;
		    newTitle.title = title;
		const notebook = await newTitle.save();
		res.json(notebook);
	})
);

router.delete(
	"/:notebookId",
	requireAuth,
	asyncHandler(async (req, res) => {
        const userId = req.user.id;
		const notebookId = parseInt(req.params.notebookId, 10);
		const primaryNotebook = await Notebook.findAll({
			where: { userId },
			order: [["id", "ASC"]],
			limit: 1,
		});

		if (notebookId !== primaryNotebook[0].id) {
			const notes = await Note.findAll({ where: { notebookId } });

            //restoring a note puts it back in the primary nb
			for (let i = 0; i < notes.length; i++) {
				let note = notes[i];
				note.notebookId = primaryNotebook[0].id;
				note.isTrashed = true;
				await note.save();
			}
             await Notebook.destroy({
                where: { id: notebookId },
            });
            res.json(notebookId);
		    } else {
			let err = new Error("You cannot delete your primary notebook!");
			next(err);
		}
	})
);

module.exports = router;

