const express= require('express');
const router = express.Router();
const userController= require('../Controllers/userController');
const asyncWrapper= require('../Middleware/asycWrapper');
const auth= require('../Middleware/authMiddleware');
// validation for request body
const {createUserSchema,signInUserSchema}= require('../Middleware/Validators/userValidator');


// routes
// create a new user
router.post('/', createUserSchema, asyncWrapper(userController.createUser));
// update user Info 
router.patch('/',auth(), asyncWrapper(userController.updateUserInfo));
// update the user profile
router.patch('/uploadProfile', auth(), asyncWrapper(userController.updateProfile));
// get the user info using the authentication token
router.get('/whoami',auth(), asyncWrapper(userController.decodetoken));
// sign of the user using email, password // JWT is send back
router.post('/signin', signInUserSchema, asyncWrapper(userController.signIn));

module.exports = router;