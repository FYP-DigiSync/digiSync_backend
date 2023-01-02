const userModel= require('../Models/userModel');
const errorHandler= require('../Utils/errorHandler');
const {verifyJWT}= require('../utils/token');

const auth= (...roles)=>{
    return async(req,res,next)=>{
        try{
            // console.log("hello digisync");
            const authHeader = req.headers.authorization;
            const bearer= 'Bearer ';
            if(!authHeader || !authHeader.startsWith(bearer)){
               return next(new errorHandler(401,'Access denied! No auth Sent'));
            }
            const token = authHeader.replace(bearer,'');
            const decoded = verifyJWT(token);
            const user= await userModel.findById(decoded.userId);
            if(!user || !user?.email){
                return next(new errorHandler(401,'Authentication failed! No user found'));
            }
            req.thisuser = user;
            if(roles.length && !roles.includes(decoded.role)){
                return next(new errorHandler(401,'Unauthorized Access!End point is block'));
            }
            return next();
        }
        catch(err){
            err.status= 401;
            return next(err);
        }
    }
}

module.exports=auth;