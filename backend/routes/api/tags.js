const express = require("express");
const asyncHandler = require("express-async-handler");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { requireAuth } = require("../../utils/auth");
const { Note, Tag, NoteTag } = require("../../db/models");

const router = express.Router();

const validateTag = [
	check("title")
		.exists({ checkFalsy: true })
		.isLength({ max: 20, min: 1 })
		.withMessage("Tag must be between 1 and 20 characters long"),
	handleValidationErrors,
];

router.get(
	"/",
	requireAuth,
	asyncHandler(async (req, res) => {
		const userId = req.user.id;
		const tags = await Tag.findAll({
			where: { userId },
			include: {
				model: Note,
				include: Tag,
			},
			order: [["updatedAt", "DESC"]],
		});
		res.json(tags);
	})
);

router.post(
	"/",
	requireAuth,
	validateTag,
	asyncHandler(async (req, res) => {
		const userId = req.user.id;
		const { label } = req.body;

		const newTag = await Tag.create({
			userId,
			label
		});

		const tag = await Tag.findByPk(
        newTag.id, {
            include: {
                model: Note,
                include: Tag,
            },
		});
		res.json(tag);
	})
);

router.delete(
	"/:tagId",
	requireAuth,
	asyncHandler(async (req, res) => {
		const tagId = parseInt(req.params.tagId, 10);
		await NoteTag.destroy({ where: { tagId } });
		await Tag.destroy({ where: { id: tagId } });
		res.json(tagId);
	})
);

module.exports = router;
