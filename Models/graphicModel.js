const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    userId:{
        type: String,
        required: true,
        required: true,
    },
    Image:{
        type: Buffer,
        data: Buffer,
        contentType: String,
        required: true
    },
});

const imageModel = mongoose.model('graphicImage', userSchema);

module.exports= imageModel;
