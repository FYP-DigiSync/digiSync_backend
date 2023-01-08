const {body} = require('express-validator');

const createPostContentSchema = [
    body('prefix').exists({ checkFalsy: true }).withMessage("Catagory is required").bail(),
    body('temperature').exists({ checkFalsy: true }).withMessage('temperature is required').bail(),
    body('batch_size').exists({ checkFalsy: true }).withMessage("batch_size is required").bail(),
]


const generateCaptionSchema = [
    body('prefix').exists({ checkFalsy: true }).withMessage("prompt is required").bail(),
]


const savePosterSchema = [
    body('prompt').exists({ checkFalsy: true }).withMessage("prompt is required").bail(),
    body('image').exists({checkFalsy:true}).isArray().withMessage('image is an array & required').bail(),
    body('catagory').exists({ checkFalsy: true }).withMessage("catagory is required").bail(),
    body('selectedText').exists({ checkFalsy: true }).withMessage("selectedText is required").bail(),
    body('title').exists({ checkFalsy: true }).withMessage("Title is required").bail(),
    body('promotion').exists({ checkFalsy: true }).withMessage("Promotion is required").bail(),
    body('contact').exists({ checkFalsy: true }).withMessage("Contact is required").bail(),
    body('description').exists({ checkFalsy: true }).withMessage("Description is required").bail(),
    body('caption').exists({ checkFalsy: true }).withMessage("caption is required").bail(),
    body('hashtag').exists({ checkFalsy: true }).withMessage("hashtag is required").bail(),
]


module.exports = {createPostContentSchema, generateCaptionSchema, savePosterSchema};