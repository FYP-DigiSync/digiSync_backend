const express= require('express');
const router = express.Router();
const postController= require('../Controllers/postController');
const asyncWrapper= require('../Middleware/asycWrapper');


router.post('/graphics', asyncWrapper(postController.generateGraphics));


module.exports = router;