
const {validationResult}= require('express-validator');
const {generateSimpleJWT, verifyJWT}= require('../Utils/token');
const errorHandler= require('../Utils/errorHandler');
const {hashPassword}=require('../Utils/encrptPassword');
const userModel = require('../Models/userModel');


class userController{

    // create a user 
    createUser = async (req, res, next) => {
        const err = validationResult(req);
        if (!err.isEmpty()) {
            return next(new errorHandler(400, "Input validation failed", err));
        }
        const res1 = await userModel.find({ email: req.body.email });
        if (res1 && res1?.email) {
            return next(new CustomError(400, "User already exist with the provided email."));
        }

        // store the hash of password in the database
        req.body.password = await hashPassword(req.body.password);
        const result = await userModel.create(req.body);
        if (!result || !result?._id) {
            return next(new CustomError(500, "Failed to register account! Please try again later."));
        }
        const jwt= generateSimpleJWT({userId: result._id, email: result.email});
        return res.status(201).json({token: jwt});
    }


    // get a user with the given id
    decodetoken = async(req, res, next) => {
        const { firstName,lastName, country, email, phoneNumber  } =req.thisuser;
        return res.status(200).json({firstName,lastName, country, email, phoneNumber});
    }
}


module.exports = new userController();