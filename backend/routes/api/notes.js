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

//notes from a notebook
router.get(
	"/:notebookId",
	requireAuth,
	asyncHandler(async (req, res) => {
        const notebookId = parseInt(req.params.notebookId, 10);
		const notes = await Note.findAll({
			where: { isTrashed: false, notebookId },
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
		const { title, content, notebookId, isTrashed} = req.body;

        //make the base model, then turn Tags into NoteTag models
		const newNote = await Note.create({ title, content, notebookId, isTrashed});
		const noteId = newNote.id;

        //create NoteTag Models for each created note too
		// for (let i = 0; i < setTags.length; i++) {
		// 	const tagId = setTags[i].id;
		// 	await NoteTag.create({ noteId, tagId });
		// }
		const note = await Note.findByPk(noteId, {
			include: [Tag, Notebook],
		});
		res.json(note);
	})
);

// UPDATE/ TRASH
router.post(
	"/:noteId",
	requireAuth,
	validateNotes,
	asyncHandler(async (req, res) => {

		const noteId = parseInt(req.params.noteId, 10);
		const oldNote = await Note.findByPk(noteId);

        //bring in the tags that the user wants via req.body
		const { title, content, notebookId, isTrashed } = req.body;
        console.log(req.body)

        const updatedNote = await oldNote.update({
            title,
            content,
            notebookId,
            isTrashed,
        }) 

        //if setTags has been touched/has data
		// if (setTags) {

		// 	let setTags = setTags.map((tag) => tag.id);

        //     //tag already exists
		// 	for (let i = 0; i < setTags.length; i++) {
		// 		let tagId = setTags[i];
		// 		const found = await NoteTag.findOne({ where: { tagId, noteId } });

        //     //tag is being added
		// 		if (!found) {
		// 			await NoteTag.create ({ tagId, noteId });
		// 		}
		// 	}

		// 	const UpdatedNoteTags = await NoteTag.findAll({ where: { noteId } });

		// 	for (let j = 0; j < UpdatedNoteTags.length; j++) {
		// 		let currentTag = UpdatedNoteTags[j];

        //     //if we removed the tag, destroy the corresponding NoteTag model 
		// 		if (!setTags.has(currentTag.tagId)) {
		// 			await currentTag.destroy();
		// 		}
		// 	}
		// }
		await updatedNote.save();
		const finalNote = await Note.findByPk(noteId, {
			include: [Tag, Notebook],
		});

		res.json(finalNote);
        
	})
);

module.exports = router;