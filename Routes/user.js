const express= require('express');
const router = express.Router();
const userController= require('../Controllers/userController');
const asyncWrapper= require('../Middleware/asycWrapper');
const auth= require('../Middleware/authMiddleware');
// validation for request body
const {createUserSchema,signInUserSchema}= require('../Middleware/Validators/userValidator');


// routes
router.post('/', createUserSchema, asyncWrapper(userController.createUser));
router.get('/whoami',auth(), asyncWrapper(userController.decodetoken));
router.post('/signin', signInUserSchema, asyncWrapper(userController.signIn));

module.exports = router;