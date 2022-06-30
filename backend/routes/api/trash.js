const express = require("express");
const asyncHandler = require("express-async-handler");
const { requireAuth } = require("../../utils/auth");
const { Note, Tag, Notebook, NoteTag } = require("../../db/models");

const router = express.Router();

router.get(
	"/",
	requireAuth,
	asyncHandler(async (req, res) => {
		const userId = req.user.id;
		const trash = await Note.findAll({
			include: [
				{
					model: Notebook,
					where: { userId },
				},
				Tag,
			],
			where: { isTrashed: true },
		});
        console.log(trash)
		res.json(trash);
	})
);

router.delete(
	"/:noteId",
	requireAuth,
	asyncHandler(async (req, res) => {
		const noteId = parseInt(req.params.noteId, 10);

		const note = await Note.findByPk(noteId, {
			include: Tag,
		});

		if (note.Tags.length > 0) {
			for (let i = 0; i < note.Tags.length; i++) {
				let tagId = note.Tags[i].id;
				await NoteTag.destroy({ where: { tagId, noteId } });
			}
		}
		await note.destroy();
		res.json(noteId);
	})
);

router.delete(
	"/",
	requireAuth,
	asyncHandler(async (req, res) => {
		const userId = req.user.id;
		const trash = await Note.findAll({
			include: [
				{
					model: Notebook,
					where: { userId },
				},
				Tag,
			],
			where: { isTrashed: true },
		});

		for (let i = 0; i < trash.length; i++) {
			const note = trash[i];
			const noteId = note.id;
			if (note.Tags.length > 0) {
				for (let j = 0; j < note.Tags.length; j++) {
					let tagId = note.Tags[j].id;
					await NoteTag.destroy(
                        { where: { tagId, noteId } }
                    );
				}
			}
		}

		await Note.destroy({
			include: [
				{
					model: Notebook,
					where: { userId },
				},
			],
			where: { trash: true },
		});

		res.json({ message: "success" });
	})
);

module.exports = router;
