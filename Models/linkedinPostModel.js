const mongoose = require('mongoose');

const linkedinSchema = mongoose.Schema({
    "image":{
        type:String, 
        required:true,
    },
    "text":{
        type:String, 
        required:true,
    }
});
const linkedinModel = mongoose.model('linkedinModel', linkedinSchema);

module.exports = linkedinModel;

