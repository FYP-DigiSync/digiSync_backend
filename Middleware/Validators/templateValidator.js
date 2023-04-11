const {body} = require('express-validator');

const createTemplateSchema = [
    body('name').exists({ checkFalsy: true }).withMessage("name is required").bail(),
    body('category').exists({ checkFalsy: true }).withMessage("category is required").bail(),
    body('imageUrl').exists({ checkFalsy: true }).withMessage('imageUrl is required').bail(),
    body('counters').exists({ checkFalsy: true }).withMessage("counters is required").bail(),
    body('body').exists({ checkFalsy: true }).withMessage("body is required").bail(),
    body('schemaVersion').exists({ checkFalsy: true }).withMessage("schemaVersion is required").bail(),
]


module.exports = {createTemplateSchema};