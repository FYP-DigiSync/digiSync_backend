const express = require('express');
const router = express.Router();
const metaController = require('../Controllers/metaController');
const asyncWrapper = require('../Middleware/asycWrapper');
const { addCredentialSchema } = require('../Middleware/Validators/metaValidator');
const auth = require('../Middleware/authMiddleware');


router.post('/addCredential', auth(), addCredentialSchema, asyncWrapper(metaController.addCredential));
// router.post('/graphics', asyncWrapper(postController.generateGraphics));
// router.post('/posterContent', createPostContentSchema, asyncWrapper(postController.getPosterContent));


module.exports = router;