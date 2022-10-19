const jwt= require('jsonwebtoken');
const dotenv= require('dotenv');
dotenv.config();

// generation of JWT Token
const generateSimpleJWT= (data, expiry='30d')=>{
    const screat= process.env.JWT_SECRET;
    const token = jwt.sign(data, screat,{expiresIn:expiry});
    return token;  
}

// verification of JWT
const verifyJWT= (token)=>{
    const decode= jwt.verify(token, process.env.JWT_SECRET);
    return decode;
}

module.exports= {verifyJWT, generateSimpleJWT};