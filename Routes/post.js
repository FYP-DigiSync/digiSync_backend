const express= require('express');
const router = express.Router();
const postController= require('../Controllers/postController');
const asyncWrapper= require('../Middleware/asycWrapper');
const {createPostContentSchema} = require('../Middleware/Validators/postValidator');


router.post('/graphics', asyncWrapper(postController.generateGraphics));
router.post('/posterContent', createPostContentSchema, asyncWrapper(postController.getPosterContent));


module.exports = router;