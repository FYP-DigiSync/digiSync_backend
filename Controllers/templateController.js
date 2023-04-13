const errorHandler = require('../Utils/errorHandler');
const templateModel = require('../Models/templateModel');
const { validationResult } = require('express-validator');
const nodemailer = require("nodemailer");



class templateController {

    // create a new template, Database filling path used temporary 
    createTemplate = async (req, res, next) => {
        // const err = validationResult(req);
        // if (!err.isEmpty()) {
        //     return next(new errorHandler(400, "Input validation failed", err));
        // }

        for (let i = 12; i < 26; i++) {
            const path = `../Utils/dataset1/${i}.json`;
            const data = require(path);
            console.log(`${i} :: ${data.name}`);
            const result = await templateModel.create(data);
            if (!result || !result?._id) {
                return next(new errorHandler(500, "Failed to create template! Please try again later.", result));
            }
        }

        return res.status(201).json("template created Sucessfully");
    }


    // get all the template-back 
    getTemplates = async (req, res, next) => {
        const { page = 1, limit = 6, id = undefined } = req.query;
        if (!id) {
            const result = await templateModel.find().limit(limit * 1).skip((page - 1) * limit);
            if (!result) {
                return next(new errorHandler(500, "Something went wrong"));
            }
            if (result?.length === 0) {
                return res.status(200).json({ "msg": "No template found", "data": [] });
            }

            // Only returning the data required at the frontend filtering other data
            let data2 = [];
            for (let i = 0; i < result.length; i++) {
                const { name, category, imageUrl, _id, ...rest } = result[i];
                data2.push({ name, category, imageUrl, _id });
            }
            return res.status(200).json(data2);
        } else {
            const result = await templateModel.findById(id);
            console.log(id);
            if (!result) {
                return next(new errorHandler(500, "Something went wrong"));
            }
            return res.status(200).json(result);
        }

    }


    // get template of specific catagory
    getSingleTemplate = async (req, res, next) => {
        const { category } = req.params;
        console.log(category);
        const result = await templateModel.find({ category: category });
        if (!result) {
            return next(new errorHandler(500, "Something went wrong"));
        }
        if (result?.length === 0) {
            return res.status(200).json({ "msg": "No template found", "data": [] });
        }
        return res.status(200).json(result);
    }



    // send Email 
    sendEmail = async (req, res, next) => {

        let mailOptions= {};
        if(req.body.template===1){
            // parse the stringfy html
            const json = JSON.parse(req.body.html);
            mailOptions = {
                from: 'digisync.fast@gmail.com',
                to: 'anashameed159@gmail.com',
                subject: 'Identity Verification',
                html: json
            };
        }else{
            const json = JSON.parse(req.body.html);
            mailOptions = {
                from: 'digisync.fast@gmail.com',
                to: 'anashameed159@gmail.com',
                subject: 'Identity Verification',
                text: json
            };
        }

        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'digisync.fast@gmail.com',
                pass: 'brabtlevhoindufc'
            }
        });

        


        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                return next(new errorHandler(500, "Error in send the email",error));
            } else {
                return res.json("Sucessfully send the Email");
            }
        });
        

    }
};


module.exports = new templateController();