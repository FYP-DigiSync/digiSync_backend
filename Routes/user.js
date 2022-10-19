const express= require('express');
const router = express.Router();
const userController= require('../Controllers/userController');
const asyncWrapper= require('../Middleware/asycWrapper');
// validation for request body
const {createUserSchema}= require('../Middleware/Validators/userValidator');


// routes
router.post('/', createUserSchema, asyncWrapper(userController.createUser));

module.exports = router;