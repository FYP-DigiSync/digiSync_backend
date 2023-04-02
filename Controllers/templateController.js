const errorHandler= require('../Utils/errorHandler');
const templateModel = require('../Models/templateModel');
const {validationResult}= require('express-validator');


class templateController{

    // create a new template 
    createTemplate = async (req, res, next) => {
        const err = validationResult(req);
        if (!err.isEmpty()) {
            return next(new errorHandler(400, "Input validation failed", err));
        }
        const result = await templateModel.create(req.body);
        if (!result || !result?._id) {
            return next(new errorHandler(500, "Failed to create template! Please try again later."));
        }
        return res.status(201).json("template created Sucessfully");
    }


    getTemplates= async(req,res, next)=>{
        const result = await templateModel.create(req.body);
        if (!result || !result?._id) {
            return next(new errorHandler(500, "Failed to create template! Please try again later."));
        }
        return res.status(201).json("template created Sucessfully");

    }
};


module.exports = new templateController();