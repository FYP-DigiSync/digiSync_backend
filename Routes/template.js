const express= require('express');
const router = express.Router();
const templateController= require('../Controllers/templateController');
const asyncWrapper= require('../Middleware/asycWrapper');
const {createTemplateSchema} = require('../Middleware/Validators/templateValidator');


router.post('/', createTemplateSchema, asyncWrapper(templateController.createTemplate));
router.get('/', asyncWrapper(templateController.getTemplates));
router.get('/:category', asyncWrapper(templateController.getSingleTemplate));

router.post('/sendTemplateEmail', asyncWrapper(templateController.sendEmail));


module.exports = router; 