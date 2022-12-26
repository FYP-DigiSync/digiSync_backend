const express = require('express');
const router = express.Router();
const metaController = require('../Controllers/metaController');
const asyncWrapper = require('../Middleware/asycWrapper');
const { addCredentialSchema,/*postSchema */ } = require('../Middleware/Validators/metaValidator');
const auth = require('../Middleware/authMiddleware');


router.post('/addCredential', auth(), addCredentialSchema, asyncWrapper(metaController.addCredential));
router.post('/postOnFB', auth()/*, postSchema*/, asyncWrapper(metaController.postOnFB));


module.exports = router;