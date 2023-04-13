const express= require('express');
const router = express.Router();
const emailTeamController= require('../Controllers/emailTeamController');
const asyncWrapper= require('../Middleware/asycWrapper');
const auth= require('../Middleware/authMiddleware');
// validation for request body
const {updateTeamEmailListSchema,deleteTeamEmailListSchema}= require('../Middleware/Validators/emailTeamValidator');


// routes
// get all the created teams
router.get('/team', auth(), asyncWrapper(emailTeamController.getALLEmailTeam));
router.get('/team/:teamId', auth(), asyncWrapper(emailTeamController.getById));

// create a new team
router.post('/team', auth(), asyncWrapper(emailTeamController.createEmailTeam));

// update the teamList, add a member to the list
router.patch('/team',updateTeamEmailListSchema, auth(), asyncWrapper(emailTeamController.updateTeamEmailList));

// delete member from the the team 
router.delete('/team',deleteTeamEmailListSchema, auth(), asyncWrapper(emailTeamController.deleteMemberFromTeam));


// delete the team
router.delete('/team/:teamId', auth(), asyncWrapper(emailTeamController.deleteTeam));


module.exports = router;