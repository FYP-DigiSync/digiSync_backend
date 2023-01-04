const mongoose = require('mongoose')


const metaSchema = mongoose.Schema({
    user:{

    },
    access_token:{
        type: String
    },
    user_id:{
        type: String
    },
    page_access_token:{
        type: String
    },
    page_id:{
        type: String
    },
    instagram_id:{
        type: String
    }
});

const metaModel = mongoose.model("meta", metaSchema);
module.exports = metaModel;