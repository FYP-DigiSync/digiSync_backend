const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    firstName:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    profileImage:{
        type:String
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
});

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;