const {body} = require('express-validator');

const updateTeamSMSListSchema = [
    body('teamId').exists({ checkFalsy: true }).withMessage("teamId is required").bail(),
    body('memberName').exists({ checkFalsy: true }).withMessage("memberName is required").bail(),
    body('memberNumber').exists({ checkFalsy: true }).withMessage("memberNumber is required").bail(),
]

const deleteTeamSMSSchema = [
    body('teamId').exists({ checkFalsy: true }).withMessage("teamId is required").bail(),
    body('_id').exists({ checkFalsy: true }).withMessage("member Id is required").bail(),
]

const generateSMSSchema = [
   body("prompt").exists({ checkFalsy: true }).withMessage("prompt is required").bail(),
   body("temperature").exists({ checkFalsy: true }).withMessage("teperature is required").bail(),
   body("output_length").exists({ checkFalsy: true }).withMessage("output_length is required").bail(),
   body("keywords").exists({ checkFalsy: true }).withMessage("keywords list is required").bail(),
]

module.exports = {updateTeamSMSListSchema, deleteTeamSMSSchema,generateSMSSchema};