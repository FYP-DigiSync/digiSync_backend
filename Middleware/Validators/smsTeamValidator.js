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


module.exports = {updateTeamSMSListSchema, deleteTeamSMSSchema};