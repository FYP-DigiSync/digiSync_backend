const mongoose = require('mongoose');


const teamEmailSchema= mongoose.Schema({
    name:{
        type:String, 
        require:true
    },
    email:{
        type:String, 
        require:true
    }

});

const emailTeamSchema = mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    teamName:{
        type: String,
        required: true
    },
    emailList:{
        type: [teamEmailSchema]
    }
});

const emailTeamModel = mongoose.model("emailTeams", emailTeamSchema);
module.exports = emailTeamModel;