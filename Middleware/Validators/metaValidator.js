const {body} = require('express-validator');

const addCredentialSchema = [
    body('token').exists({ checkFalsy: true }).withMessage("token is required").bail(),
]
const postSchema = [
    body('picture').exists({ checkFalsy: true }).withMessage("picture is required").bail(),
]


module.exports = {addCredentialSchema,postSchema};