const mongoose = require('mongoose');

const posterSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    prompt: {
        type: String,
        required: true
    },
    image: {
        type: [{
            image_path: String,
            variation: {
                bottom_right: String,
                bottom_left: String,
                top_left: String
            }
        }],
    },
    catagory: {
        type: String
    },
    selectedText: {
        type: String
    },
    title: {
        type: String
    },
    promotion: {
        type: String
    },
    contact: {
        type: String
    },
    description: {
        type: String
    },
    caption: {
        type: String
    },
    hashtag: {
        type: String
    }
});

const posterModel = mongoose.model('posterModel', posterSchema);

module.exports = posterModel;
