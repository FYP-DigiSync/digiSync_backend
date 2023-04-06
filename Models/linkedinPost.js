const mongoose = require('mongoose')


const linkedinPostSchema = mongoose.Schema({
    user:{

    },
    caption:{
        type: String
    },
    posterRoute:{
        type: String
    }
});

const linkedinPostModel = mongoose.model("linkedinPost", linkedinPostSchema);
module.exports = linkedinPostModel;