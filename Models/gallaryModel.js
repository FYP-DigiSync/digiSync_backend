const mongoose = require('mongoose');

const gallarySchema = mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    geneneration: {
        type: String,
        required: true
    }
});


const gallaryModel = mongoose.model('gallaryModel', gallarySchema);
module.exports = gallaryModel;
