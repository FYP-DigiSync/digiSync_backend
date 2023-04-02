
const {validationResult}= require('express-validator');
const errorHandler= require('../Utils/errorHandler');
const linkedinModel = require('../Models/linkedinPostModel');

class linkedinPostController{
    // create a posts
    createPost = async (req, res, next) => {
        const err = validationResult(req);
        if (!err.isEmpty()) {
            return next(new errorHandler(400, "Input validation failed", err));
        }


        const result = await linkedinModel.create(req.body);
        if (!result || !result?._id) {
            return next(new errorHandler(500, "Failed to create post! Please try again later."));
        }
        return res.status(201).json({token: "Post create sucessfully"});
    }
};


module.exports =  new linkedinPostController();

