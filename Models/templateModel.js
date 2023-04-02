const mongoose = require('mongoose');

const templateSchema = mongoose.Schema({
    "name":{
        type:String, 
        required:true,
    },
    "catagory":{
        type:String, 
        required:true,
    },
    "imageUrl":{
        type:String, 
        required:true,
    },
    "counters": {
        type: Object,
        required: true,
    },
    "body":{
        type:Object,
        required: true,
    },
    "schemaVersion":{
        type:Number,
        required:true
    },
});

const templateModel = mongoose.model('templateModel', templateSchema);

module.exports = templateModel;