const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const notesRouter = require('./notes');
const notebooksRouter = require('./notebooks');
const scratchPadRouter = require('./scratchpad');

router.use('/session', sessionRouter);
router.use("/scratchpad", scratchPadRouter);
router.use('/users', usersRouter);
router.use('/notes', notesRouter);
router.use('/notebooks', notebooksRouter);

router.post('/test', (req, res) => {
  res.json({ requestBody: req.body });
});

module.exports = router;