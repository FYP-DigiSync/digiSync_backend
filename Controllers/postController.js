const Dalle = require("../Utils/dalle2");
const errorHandler = require("../Utils/errorHandler");
const sharp = require('sharp');
const axios = require("axios");
const imageModel = require("../Models/graphicModel");
const { validationResult } = require("express-validator");

const midJourneyRecentPostFetch = require("../Utils/midJourney");

const backgroundExtension= require("../Utils/backgroundExtension");

// const getPalette = require('dont-crop').getPaletteFromImageData;
// const fitGradient = require('dont-crop').fitGradientToImageData;


class postController {

    // getImageData = async(path)=> {
    //     let image = sharp(path).resize(440, 440);
    //     const { data, info } = await image
    //       .ensureAlpha()
    //       .toColorspace('srgb')
    //       .raw()
    //       .toBuffer({ resolveWithObject: true });
    //     if (data.length !== info.width * info.height * 4) {
    //       throw new Error(`Invalid image dimensions ${data.length} != ${info.width} * ${info.height} * 4`);
    //     }
    //     const imageData = {
    //       width: info.width,
    //       height: info.height,
    //       data: new Uint8ClampedArray(data.buffer),
    //     };
    //     return imageData;
    // }

    // Generate graphics using Dalle2 API
    generateGraphics = async (req, res, next) => {
        const { prompt } = req.body;
        console.log(prompt);
        if (!prompt) {
            return next(new errorHandler(400, "Prompt is required"));
        }
        const dalle = new Dalle("sess-gIR1xI2197xjylZJPe73VkV6MPQsu9ZZQ2IsFV2C");
        const generations = await dalle.generate(prompt);
        if (!generations?.generations?.data) {
            return next(new errorHandler(400, "Error generation graphics",generations ));
        }
        const res1 = generations.generations.data;        
        let imageUrl = [];

        for(let i=0; i<res1.length; i++){
           imageUrl.push(res1[i].generation.image_path);
        }
        let res2= await backgroundExtension("dallE2",imageUrl);
        res2.prompt= prompt;
        res.status(200).json(res2);
        // res.status(200).json("ssksk");

        // send image back
        // res.writeHead(200, {
        //     'Content-Type': 'image/png',
        //     'Content-Length': image2.length
        // });
        // res.end(image2);
    }


    // generate Graphics using midJourney
    midJourneyGraphics= async (req, res, next) => {
        const {prompt}= req.body;
        if(!prompt){
            return next(new errorHandler(400, "Input validation error", errors));
        }
        // Request the MidJourney API to generate a post task

        // get the recent post from midJourney
        const recentPost= await midJourneyRecentPostFetch();
        if(!recentPost || !recentPost.data.length || !recentPost.data[2].image_paths){
            return next(new errorHandler(400, "Error fetching recent post", recentPost));
        }

        // Extension of the image
        const extendedbackground= await backgroundExtension("midJourney",recentPost.data[2].image_paths); 

        extendedbackground.prompt= recentPost.data[0].prompt;
        // return res.status(200).json(recentPost.data[0].image_paths);
        res.status(200).json(extendedbackground);
        
    }

    getListOfgeneration= async (req, res, next) => {
        const dalle = new Dalle("sess-k5VnW7R8nDpVEwxU1ci4mNg6Pmhxn2altxB9Ae9S");
        const generations = await dalle.list({limit:10});
        if (!generations?.generations?.data) {
            return next(new errorHandler(400, "Error generation graphics",generations ));
        }
        return res.status(200).json(generations.generations.data);
    }

    // Call to action on the poster
    getPosterContent= async(req,res, next)=>{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return next(new errorHandler(400, "Input validation error", errors));
        }
        console.log(req.body);
        let {prefix, temperature, batch_size}= req.body;
        batch_size=5;
        // sent a post request to the server
        let response = await axios.post("http://localhost:8080/", {prefix, temperature, batch_size});
        if(!response || !response.data || !response.data.text){
            return next(new errorHandler(400, "Error getting poster content", response));
        }
        console.log(response.data.text);
        response= response.data.text;
        const res1=[];
        for(let i=0; i<response.length; i++){
            // remove the _TOPIC_ fashion _QUOTE_ from the start
            let text = response[i].replace(/_TOPIC_.*_QUOTE_/g, "");
            // remove "_AUTHOR_ AI" from the end
            text = text.replace(/_AUTHOR_.*AI/g, "");  
            res1.push(text);
        }
        res.status(200).json(res1);
    }

    // postFile(req, res, next) {
    //     const file= req.files.file;
    //     const uploadId = `${Math.random().toString(36)}${Math.random().toString(36)}`;
    //     const path= `./uploads/${uploadId}.${file.name.split(".")[1]}`;
    //     file.mv(path, (err)=>{
    //         if(err){
    //             return next(new errorHandler(400, "Error saving file", err));
    //         }
    //         res.status(200).json({path:`http://localhost:4000/digsync/api/v0.1/uploads/${uploadId}.${file.name.split(".")[1]}`});
    //     })
    // }
}


module.exports = new postController();