const errorHandler = require('../Utils/errorHandler');
const smsTeamModel = require('../Models/smsteamModel');
const {validationResult}= require('express-validator');
const emailRequestHander= require('../Utils/emailRequestHander');

class SMSController {

    // get all the team of the user o
    getALLSMSTeam = async (req, res, next) => {
        const res1 = await smsTeamModel.find({ userId: req.thisuser._id });
        if (!res1) {
            return next(new errorHandler(400, "Please enter the team Name"));
        }
        return res.status(200).json(res1);
    }


    // create a team 
    createSMSTeam = async (req, res, next) => {
        if (!req?.body?.teamName) {
            return next(new errorHandler(400, "Please enter the team Name"));
        }
        const { _id } = req.thisuser;
        const res1 = await smsTeamModel.create({ userId: _id, ...req.body });
        if (!res1 || !res1._id) {
            return next(new errorHandler(500, "Internal server Error", res1));
        }
        return res.status(201).json("SMS Team create Sucessfully");
    }


    // update the team, append the list
    updateTeamSMSList = async(req,res, next) => {
       
        const err = validationResult(req);
        if (!err.isEmpty()) {
            return next(new errorHandler(400, "Input validation failed", err));
        }

        const { teamId, memberName, memberNumber } = req.body;

        const res1 = await smsTeamModel.findById(teamId);
        if (!res1) {
            return next(new errorHandler(500, "Internal Server Error", res1));
        }
        // append the value to the list
        const res2 = [...res1.contactList, { name:memberName, number:memberNumber }]; 
        const res3 = await smsTeamModel.findByIdAndUpdate(teamId, {contactList:res2});
        if(!res3){
            return next(new errorHandler(500, "Internal Server Error", res3));
        }
        return res.status(200).json("Update was sucessfull");

    }


    // delete Member from the Team 
    deleteMemberFromTeam = async(req,res,next) => {
        const err = validationResult(req);
        if (!err.isEmpty()) {
            return next(new errorHandler(400, "Input validation failed", err));
        }
        
        const { teamId, _id } = req.body;

        const res1 = await smsTeamModel.findById(teamId);
        if (!res1) {
            return next(new errorHandler(500, "Internal Server Error", res1));
        }
        // append the value to the list
        const res2 = res1.contactList.filter((item)=>item._id!==_id );
        const res3 = await smsTeamModel.findByIdAndUpdate(teamId, {contactList:res2});
        if(!res3){
            return next(new errorHandler(500, "Internal Server Error", res3));
        }
        return res.status(200).json("Contact removed sucessfully");

    }

    // delete the team 
    deleteTeam = async(req,res,next) => {
        const { teamId} = req.params;
        const res1 = await smsTeamModel.findByIdAndDelete(teamId);
        if(!res1){
            return next(new errorHandler(500, "Internal Server Error", res1));
        }
        return res.status(200).json("SMS team delete was sucessfull");
    }


    // generate an SMS for the marketing 
    generateSMS = async (req, res, next) => {
        const err = validationResult(req);
        if (!err.isEmpty()) {
            return next(new errorHandler(400, "Input validation failed", err));
        }
        const obj= {token_count:1024, n_gen:1};
        const {prompt,temperature,output_length,keywords}= req.body;
        const listKeyword = keywords.split(',').map((item) => item.trim());
        const floatTemp = parseFloat(temperature);
        console.log(listKeyword, floatTemp);
        const res1= await emailRequestHander({...obj, prompt,temperature:floatTemp,output_length,keywords:listKeyword});
        
        if(!res1 || !res1.data){
            return next(new errorHandler(400, "Error getting poster content", res1));
        }
        
        // res1.data.__text="";

        return res.json(res1.data);
    }

}



module.exports = new SMSController();