const express= require('express');
const router = express.Router();
const templateController= require('../Controllers/templateController');
const asyncWrapper= require('../Middleware/asycWrapper');
const {createTemplateSchema} = require('../Middleware/Validators/templateValidator');


router.post('/', createTemplateSchema, asyncWrapper(templateController.createTemplate));



module.exports = router; 