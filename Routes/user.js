const express= require('express');
const router = express.Router();
const userController= require('../Controllers/userController');
const asyncWrapper= require('../Middleware/asycWrapper');
const auth= require('../Middleware/authMiddleware');
// validation for request body
const {createUserSchema}= require('../Middleware/Validators/userValidator');


// routes
router.post('/', createUserSchema, asyncWrapper(userController.createUser));
router.get('/whoiam',auth(), asyncWrapper(userController.decodetoken));

module.exports = router;