const errorHandler = require('../Utils/errorHandler');
const emailTeamModel = require('../Models/emailteamModel');
const {validationResult}= require('express-validator');




class emailTeamController {

    // get all the team of the user 
    getALLEmailTeam = async (req, res, next) => {
        const res1 = await emailTeamModel.find({ userId: req.thisuser._id });
        if (!res1) {
            return next(new errorHandler(400, "Please enter the team Name"));
        }
        return res.status(200).json(res1);
    }

    // get all the team of the user 
    getById = async (req, res, next) => {
        const res1 = await emailTeamModel.findById(req.params.teamId);
        if (!res1) {
            return next(new errorHandler(400, "Please enter the team Name"));
        }
        return res.status(200).json(res1);
    }


    // create a team 
    createEmailTeam = async (req, res, next) => {
        if (!req?.body?.teamName) {
            return next(new errorHandler(400, "Please enter the team Name"));
        }

        const { _id } = req.thisuser;
        const res1 = await emailTeamModel.create({ userId: _id, ...req.body });
        if (!res1 || !res1._id) {
            return next(new errorHandler(500, "Internal server Error", res1));
        }
        return res.status(201).json("Email Team create Sucessfully");
    }




    // update the team, append the list
    updateTeamEmailList = async(req,res, next) => {
        const err = validationResult(req);
        if (!err.isEmpty()) {
            return next(new errorHandler(400, "Input validation failed", err));
        }

        const { teamId, memberName, memberEmail } = req.body;

        const res1 = await emailTeamModel.findById(teamId);
        if (!res1) {
            return next(new errorHandler(500, "Internal Server Error", res1));
        }
        // append the value to the list
        const res2 = [...res1.emailList, { name:memberName, email:memberEmail }];
        // 
        const res3 = await emailTeamModel.findByIdAndUpdate(teamId, {emailList:res2});
        if(!res3){
            return next(new errorHandler(500, "Internal Server Error", res3));
        }
        return res.status(200).json("Update was sucessfull");

    }




    // delete Member from the Team 
    deleteMemberFromTeam = async(req,res,next) => {
        console.log(req.body)
        const err = validationResult(req);
        if (!err.isEmpty()) {
            return next(new errorHandler(400, "Input validation failed", err));
        }
  
        const { teamId, _id } = req.body;

        const res1 = await emailTeamModel.findById(teamId);
        if (!res1) {
            return next(new errorHandler(500, "Internal Server Error", res1));
        }
        // append the value to the list
    
        const res2 = res1.emailList.filter((item)=>item._id.toString() !==_id );
        console.log(res2);
        
        const res3 = await emailTeamModel.findByIdAndUpdate(teamId, {emailList:res2});
        if(!res3){
            return next(new errorHandler(500, "Internal Server Error", res3));
        }

        return res.status(200).json("Member removed sucessfully");

    }




    // delete the team 
    deleteTeam = async(req,res,next) => {
        const { teamId} = req.params;
        const res1 = await emailTeamModel.findByIdAndDelete(teamId);
        if(!res1){
            return next(new errorHandler(500, "Internal Server Error", res1));
        }
        return res.status(200).json("Email team delete was sucessfull");
    }





};


module.exports = new emailTeamController();