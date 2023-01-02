const mongoose = require('mongoose')


const fbPostSchema = mongoose.Schema({
    user:{

    },
    caption:{
        type: String
    },
    posterRoute:{
        type: String
    },
    postID:{
        type: String
    }
});

const fbPostModel = mongoose.model("fbPost", fbPostSchema);
module.exports = fbPostModel;