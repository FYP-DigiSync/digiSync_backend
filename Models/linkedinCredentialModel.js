const mongoose = require('mongoose')

const linkedinSchema = mongoose.Schema({
    user:{

    },
    access_token:{
        type: String
    },
});

const linkedinModel = mongoose.model("linkedin", linkedinSchema);
module.exports = linkedinModel;