const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const notesRouter = require('./notes');
const notebooksRouter = require('./notebooks');
const scratchPadRouter = require('./scratchpad');
const tagsRouter = require('./tags');
const trashRouter = require('./trash');

router.use('/session', sessionRouter);
router.use("/scratchpad", scratchPadRouter);
router.use('/users', usersRouter);
router.use('/notes', notesRouter);
router.use('/notebooks', notebooksRouter);
router.use('/tags', tagsRouter);
router.use('/trash', trashRouter);

router.post('/test', (req, res) => {
  res.json({ requestBody: req.body });
});

// if (process.env.NODE_ENV === 'production') {
//   const path = require('path');
//   // Serve the frontend's index.html file at the root route
//   router.get('/', (req, res) => {
//     res.cookie('XSRF-TOKEN', req.csrfToken());
//     res.sendFile(
//       path.resolve(__dirname, '../../frontend', 'build', 'index.html')
//     );
//   });

//   // Serve the static assets in the frontend's build folder
//   router.use(express.static(path.resolve("../frontend/build")));

//   // Serve the frontend's index.html file at all other routes NOT starting with /api
//   router.get(/^(?!\/?api).*/, (req, res) => {
//     res.cookie('XSRF-TOKEN', req.csrfToken());
//     res.sendFile(
//       path.resolve(__dirname, '../../frontend', 'build', 'index.html')
//     );
//   });
// }

// // Add a XSRF-TOKEN cookie in development
// if (process.env.NODE_ENV !== 'production') {
//   router.get('/api/csrf/restore', (req, res) => {
//     res.cookie('XSRF-TOKEN', req.csrfToken());
//     res.status(201).json({});
//   });
// }

// Static routes
// Serve React build files in production


module.exports = router;