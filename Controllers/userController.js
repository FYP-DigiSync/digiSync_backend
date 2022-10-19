
const {validationResult}= require('express-validator');
const {generateSimpleJWT, verifyJWT}= require('../Utils/token');
const errorHandler= require('../Utils/errorHandler');


class userController{

    // create a user 
    createUser = async (req, res, next) => {
        const err = validationResult(req);
        if (!err.isEmpty()) {
            return next(new errorHandler(400, "Input validation failed", err));
        }
    }
}


module.exports = new userController();