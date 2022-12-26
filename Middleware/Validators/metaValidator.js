const {body} = require('express-validator');

const addCredentialSchema = [
    body('token').exists({ checkFalsy: true }).withMessage("token is required").bail(),
]


module.exports = {addCredentialSchema};