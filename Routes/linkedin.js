const express = require('express');
const router = express.Router();
const linkedinController = require('../Controllers/linkedinController');
const asyncWrapper = require('../Middleware/asycWrapper');
const { addCredentialSchema,/*postSchema */ } = require('../Middleware/Validators/metaValidator');
const auth = require('../Middleware/authMiddleware');


router.post('/addCredential', auth(), addCredentialSchema, asyncWrapper(linkedinController.addCredential));

router.post('/postImageOnLinkedin', auth()/*, postSchema*/, asyncWrapper(linkedinController.postImageOnLinkedin));

router.post('/postTextOnLinkedin', auth()/*, postSchema*/, asyncWrapper(linkedinController.postTextOnLinkedin));




module.exports = router;