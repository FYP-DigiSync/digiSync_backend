const mongoose = require('mongoose')


const instaPostSchema = mongoose.Schema({
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

const instaPostModel = mongoose.model("instaPost", instaPostSchema);
module.exports = instaPostModel;