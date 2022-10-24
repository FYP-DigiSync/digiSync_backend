const {body}= require('express-validator');

const createUserSchema = [
    body('firstName').exists({ checkFalsy: true }).withMessage("first Name is Required").bail().isLength({ max: 60 }).withMessage("Max first Name length is 60"),
    body('lastName').exists({ checkFalsy: true }).withMessage('last Name is required').bail().isLength({ max: 60 }).withMessage("Max last Name length is 60"),
    body('email').exists({ checkFalsy: true }).withMessage("Email is required").bail().isEmail().withMessage("Invalid email address").bail().isLength({max:150}).withMessage('max email length is 150'),
    body('password').exists({ checkFalsy: true }).withMessage("user password is require").bail().isLength({min:5,max:60}).withMessage("Password should be of 5-60 character")
]



const signInUserSchema = [
    body('email').exists({ checkFalsy: true }).withMessage("Email is required").bail().isEmail().withMessage("Invalid email address"),
    body('password').exists({ checkFalsy: true }).withMessage('Password is required').bail().isLength({ min: 5, max: 60 }).withMessage("Password should be of 5-60 character")
]

module.exports = {createUserSchema,signInUserSchema};