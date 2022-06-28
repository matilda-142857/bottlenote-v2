const express = require("express");
const asyncHandler = require("express-async-handler");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { requireAuth } = require("../../utils/auth");
const { Notebook, Note, Tag, NoteTag } = require("../../db/models");

const router = express.Router();

const validateNotes = [
    check('title')
    .isLength({ min: 1, max: 50 })
	.withMessage("Title must be between 1 and 50 characters long"),
	handleValidationErrors,
];

//READ (all)
router.get(
	"/",
	requireAuth,
	asyncHandler(async (req, res) => {
		const userId = req.user.id;
		const notes = await Note.findAll({
			include: [
				{
					model: Notebook,
					where: { userId },
				},
				{ model: Tag },
			],
			where: { isTrashed: false },
			order: [["updatedAt", "DESC"]],
		});
		res.json(notes);
	})
);

//READ (one)
router.get(
	"/:noteId",
	requireAuth,
	asyncHandler(async (req, res) => {
		const noteId = parseInt(req.params.noteId, 10);
		const note = await Note.findByPk(noteId, {
			include: [Tag, Notebook],
		});
		res.json(note);
	})
);

// CREATE
router.post(
	"/new",
	requireAuth,
	validateNotes,
	asyncHandler(async (req, res) => {
		const { title, content, notebookId, trash, tagsArr } = req.body;
		const newNote = await Note.create({ title, content, notebookId, trash });
		const noteId = newNote.id;

		for (let i = 0; i < tagsArr.length; i++) {
			const tagId = tagsArr[i].id;
			await NoteTag.create({ noteId, tagId });
		}
		const note = await Note.findByPk(noteId, {
			include: [Tag, Notebook],
		});
		res.json(note);
	})
);


module.exports = router;
