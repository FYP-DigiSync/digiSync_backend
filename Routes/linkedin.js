const express = require('express');
const router = express.Router();
const linkedinController = require('../Controllers/linkedinController');
const asyncWrapper = require('../Middleware/asycWrapper');
const { createLinkedinPostSchema,/*postSchema */ } = require('../Middleware/Validators/linkedinPostValidator');
const auth = require('../Middleware/authMiddleware');


router.post('/', auth(), createLinkedinPostSchema, asyncWrapper(linkedinController.createPost));

module.exports= router;