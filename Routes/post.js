const express= require('express');
const router = express.Router();
const postController= require('../Controllers/postController');
const asyncWrapper= require('../Middleware/asycWrapper');
const {createPostContentSchema} = require('../Middleware/Validators/postValidator');


// Recent post from the dalli E 2
router.get('/graphics/recent', asyncWrapper(postController.getListOfgeneration));
// Call to action for the posts
router.post('/posterContent', createPostContentSchema, asyncWrapper(postController.getPosterContent));

// Generate the graphics using dalli E 2
router.post('/graphics', asyncWrapper(postController.generateGraphics));

// Get the generated graphics from Mid Journey
router.post('/midJourneyGraphics', asyncWrapper(postController.midJourneyGraphics));


module.exports = router;