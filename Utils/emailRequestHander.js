const axios = require('axios');

const emailRequestHander= async(data)=>{
    console.log(data);
    const res = await axios.post("http://127.0.0.1:5000/generate", data);
    return res;
}

module.exports = emailRequestHander;