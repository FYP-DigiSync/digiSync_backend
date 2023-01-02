const express = require('express');
const router = express.Router();
const metaController = require('../Controllers/metaController');
const asyncWrapper = require('../Middleware/asycWrapper');
const { addCredentialSchema,/*postSchema */ } = require('../Middleware/Validators/metaValidator');
const auth = require('../Middleware/authMiddleware');


router.post('/addCredential', auth(), addCredentialSchema, asyncWrapper(metaController.addCredential));
router.post('/postOnFB', auth()/*, postSchema*/, asyncWrapper(metaController.postOnFB));
router.post('/schedulePostOnFB', auth()/*, postSchema*/, asyncWrapper(metaController.schedulePostOnFB));
router.post('/postOnInsta', auth()/*, postSchema*/, asyncWrapper(metaController.postOnInsta));
router.get('/getInstaInsights', auth()/*, postSchema*/, asyncWrapper(metaController.instaInsights));
router.get('/getFBInsights', auth()/*, postSchema*/, asyncWrapper(metaController.fbInsights));
router.get('/getCredential', auth()/*, postSchema*/, asyncWrapper(metaController.getCredential));


module.exports = router;