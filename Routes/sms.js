const express= require('express');
const router = express.Router();
const smsController= require('../Controllers/smsController');
const asyncWrapper= require('../Middleware/asycWrapper');
const auth= require('../Middleware/authMiddleware');
// validation for request body
const {updateTeamSMSListSchema, deleteTeamSMSSchema, generateSMSSchema}= require('../Middleware/Validators/smsTeamValidator');

// routes

// generate the marketing SMS body
router.post('/generate',generateSMSSchema,auth(), asyncWrapper(smsController.generateSMS));

// get all the created teams
router.get('/team', auth(), asyncWrapper(smsController.getALLSMSTeam));

// create a new team for the SMS
router.post('/team', auth(), asyncWrapper(smsController.createSMSTeam));

// update the teamList, add a member to the list
router.patch('/team',updateTeamSMSListSchema, auth(), asyncWrapper(smsController.updateTeamSMSList));

// delete member from the the team 
router.delete('/team',deleteTeamSMSSchema, auth(), asyncWrapper(smsController.deleteMemberFromTeam));

// delete the team
router.delete('/team/:teamId', auth(), asyncWrapper(smsController.deleteTeam));






module.exports= router;