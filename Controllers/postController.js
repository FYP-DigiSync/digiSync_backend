
const Dalle= require("../Utils/dalle2");
const errorHandler= require("../Utils/errorHandler");

class postController{

    generateGraphics= async(req,res, next)=>{
        const {prompt} = req.body;
        if(!prompt){
            return next(new errorHandler(400, "Prompt is required"));
        }
        const dalle = new Dalle("sess-k5VnW7R8nDpVEwxU1ci4mNg6Pmhxn2altxB9Ae9S");
        const generations = await dalle.generate(prompt);
        if(!generations?.generations?.data){
            return next(new errorHandler(400, "Error generation graphics"));
        }
        res.status(200).json({prompt,data:generations.generations.data});
        // res.status(200).json({prompt,data: generations});
    }
}


module.exports= new postController();