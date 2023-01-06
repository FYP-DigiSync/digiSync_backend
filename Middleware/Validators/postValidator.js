const {body} = require('express-validator');

const createPostContentSchema = [
    body('prefix').exists({ checkFalsy: true }).withMessage("Catagory is required").bail(),
    body('temperature').exists({ checkFalsy: true }).withMessage('temperature is required').bail(),
    body('batch_size').exists({ checkFalsy: true }).withMessage("batch_size is required").bail(),
]


const generateCaptionSchema = [
    body('prefix').exists({ checkFalsy: true }).withMessage("Catagory is required").bail(),
]


module.exports = {createPostContentSchema, generateCaptionSchema};