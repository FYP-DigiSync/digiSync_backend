const {body} = require('express-validator');

const updateTeamEmailListSchema = [
    body('teamId').exists({ checkFalsy: true }).withMessage("teamId is required").bail(),
    body('memberName').exists({ checkFalsy: true }).withMessage("memberName is required").bail(),
    body('memberEmail').exists({ checkFalsy: true }).withMessage("memberEmail is required").bail(),
]

const deleteTeamEmailListSchema = [
    body('teamId').exists({ checkFalsy: true }).withMessage("teamId is required").bail(),
    body('_id').exists({ checkFalsy: true }).withMessage("member Id is required").bail(),
]


module.exports = {updateTeamEmailListSchema, deleteTeamEmailListSchema};