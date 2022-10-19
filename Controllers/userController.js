
const {validationResult}= require('express-validator');
const {generateSimpleJWT}= require('../Utils/token');
const errorHandler= require('../Utils/errorHandler');
const {hashPassword,verifyHashPassword}=require('../Utils/encrptPassword');
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
            return next(new errorHandler(400, "User already exist with the provided email."));
        }

        // store the hash of password in the database
        req.body.password = await hashPassword(req.body.password);
        const result = await userModel.create(req.body);
        if (!result || !result?._id) {
            return next(new errorHandler(500, "Failed to register account! Please try again later."));
        }
        const jwt= generateSimpleJWT({userId: result._id, email: result.email});
        return res.status(201).json({token: jwt});
    }


    // get a user with the given id
    decodetoken = async(req, res, next) => {
        const { firstName,lastName, country, email, phoneNumber  } =req.thisuser;
        return res.status(200).json({firstName,lastName, country, email, phoneNumber});
    }


    // User SignIn
    signIn = async (req, res, next) => {
        const err = validationResult(req);
        if (!err.isEmpty()) {
            return next(new errorHandler(400, "Input validation failed!", err));
        }
        const user = await userModel.findOne({ email:req.body.email });
        if (!user || !user?.email) {
            return next(new errorHandler(401, "No user exist with this email address."));
        }
        const isValid = await verifyHashPassword(req.body.password, user.password);
        if (!isValid) {
            return next(new errorHandler(401, "Password does not match! Enter correct password"));
        }
        const jwt= generateSimpleJWT({userId:user._id, email:user.email});
        return res.status(200).json({token: jwt});
    }
}


module.exports = new userController();