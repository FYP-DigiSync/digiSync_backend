const mongoose = require('mongoose');


const teamSmsSchema= mongoose.Schema({
    name:{
        type:String, 
        require:true
    },
    number:{
        type:String, 
        require:true
    }

});

const smsTeamSchema = mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    teamName:{
        type: String,
        required: true
    },
    contactList:{
        type: [teamSmsSchema]
    }
});

const smsTeamModel = mongoose.model("smsTeam", smsTeamSchema);
module.exports = smsTeamModel;