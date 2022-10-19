const userModel= require('../models/userModel');
const customError= require('../util/CustomError');
const {verifyJWT}= require('../util/keys');

const auth= (...roles)=>{
    return async(req,res,next)=>{
        try{
            const authHeader = req.headers.authorization;
            const bearer= 'Bearer ';
            if(!authHeader || !authHeader.startsWith(bearer)){
               return next(new customError(401,'Access denied! No auth Sent'));
            }
            const token = authHeader.replace(bearer,'');
            const decoded = verifyJWT(token);
            const user= await userModel.find({_id:decoded.userId});
            if(!user || !user.length){
                return next(new customError(401,'Authentication failed! No user found'));
            }
            req.thisuser = user[0];
            if(roles.length && !roles.includes(decoded.role)){
                return next(new customError(401,'Unauthorized Access!End point is block'));
            }
            return next();
        }
        catch(err){
            err.status= 401;
            next(err);
        }
    }
}

module.exports=auth;