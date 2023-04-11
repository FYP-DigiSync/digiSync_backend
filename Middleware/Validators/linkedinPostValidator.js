const {body} = require('express-validator');

const createLinkedinPostSchema = [
    body('image').exists({ checkFalsy: true }).withMessage("name is required").bail(),
    body('text').exists({ checkFalsy: true }).withMessage("Post text is required").bail(),
]


module.exports = {createLinkedinPostSchema};