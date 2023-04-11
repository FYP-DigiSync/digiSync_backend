const Dalle = require("../Utils/dalle2");
const errorHandler = require("../Utils/errorHandler");
const sharp = require('sharp');
const axios = require("axios");
const imageModel = require("../Models/graphicModel");
const { validationResult } = require("express-validator");
const midJourneyRecentPostFetch = require("../Utils/midJourney");
const backgroundExtension= require("../Utils/backgroundExtension");
const getHashtags = require("../Utils/hashtagsGenerate");
const dummyData = require("../Utils/dummydata");
const getMidJourneyImage = require('../Utils/midjourneyRequest');
const posterModel= require('../Models/posterModel');


class postController {

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

        const {prompt} = req.body;
        console.log("prompt", prompt);
        if(!prompt){
            return next(new errorHandler(400, "Input validation error", errors));
        }
        // Request the MidJourney API to generate a post task
        const request_a = await getMidJourneyImage(prompt);


        // get the recent post from midJourney
        let recentPost= await midJourneyRecentPostFetch();
        // wait for 1 minute and try again
        await new Promise((resolve) => setTimeout(resolve, 60000));
        
        while(true){
            if(!recentPost || !recentPost.data.length || !recentPost.data[0].image_paths){
                return next(new errorHandler(400, "Error fetching recent post", recentPost));
            }
            // compare the prompt with the recent post prompt
            if(recentPost.data[0].prompt === prompt){
                break;
            }else{
                // wait for 30 seconds and try again
                await new Promise((resolve) => setTimeout(resolve, 10000));
                recentPost= await midJourneyRecentPostFetch();
            }
        }



        // // Extension of the image
        const extendedbackground= await backgroundExtension("midJourney",recentPost.data[0].image_paths); 
        extendedbackground.prompt= recentPost.data[0].prompt;
        return res.status(200).json(recentPost.data);
        // res.status(200).json(extendedbackground);
        return res.status(200).json(recentPost.data);
        
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
        let {prefix, temperature, batch_size}= req.body;

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


    // Caption Generation
    generateCaption= async(req,res, next)=>{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return next(new errorHandler(400, "Input validation error", errors));
        }
        let {prefix}= req.body;
        // sent a post request to the server
        let response = await axios.post("http://localhost:8080/captions", {length:'300', temperature:'0.7', prefix,'output_count':5});
        if(!response || !response.data || !response.data.data){
            return next(new errorHandler(400, "Error getting poster content", response));
        }
        response= response.data.data;
        console.log(response);
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


    // Generation Hashtag
    generateHashtag= async(req,res, next)=>{
        if (!req?.body?.caption) {
            return next(new errorHandler(400, "Input validation error, caption is required", errors));
        }

        let {caption}= req.body;
        // sent a post request to the server
        let response = await axios.post("http://localhost:8080/hashtags", {caption});
        if(!response || !response.data || !response.data ){
            return next(new errorHandler(400, "Error getting poster content", response));
        }
        response= response.data;

        const {SingleKeyword,MutipleLineKeyword}= response.data[0];
        // Catinate the single keyword and the multiple line keyword
        const res1= SingleKeyword.concat(MutipleLineKeyword);
        // filter the value with probability greater than 0.2
        const res2= res1.filter((item)=> item[1]>0.20);
        
        // remove duplicate item base on key0 from the list
        const res3= res2.filter((item, index, self) => index === self.findIndex((t) => (t[0] === item[0])));

        // make comma separated string from res3
        const res4= res3.map((item)=> item[0]).join(", ");
        
        const res5= await getHashtags(res4);
        let res6= await res5.json();
        if(!res6 || !res6.data || !res6.data.similarHashtagsLists){
            return next(new errorHandler(500, "Internal server Error", res5));
        }
        
        res6= res6.data.similarHashtagsLists;
        // dummy data combile all hashtag value to single list
        
        const res7= res6.map((item)=> item.hashtags);
        let endResult=[];
        for(let i=0; i<res7.length; i++){
            endResult= [...endResult, ...res7[i]];
        }
        console.log(res3);

        // filter the value to remove hidden hashtag
        const res8= endResult.filter((item)=> item.isHidden===false);


        for(let i=0; i<res3.length; i++){
            res8.push({
                "id": Math.random().toString(36),
                "name": res3[i][0],
                "mediaCount": "170581800",
                "selected": false,
                "isHidden": false,
                "isSmart": false,
                "isInstaRelated": false
            });
        }
        // res.status(200).json(res6.data.similarHashtagsLists);
        res.status(200).json(res8);
    }


    // get posters 
    getSavedPoster= async(req,res, next)=>{
        const result= await posterModel.find({userId: req.thisuser._id});
        if(!result){
            return next(new errorHandler(400, "Error getting poster content", res));
        }
        res.status(200).json(result);
    }
    

    // addPoster
    savePoster= async(req,res, next)=>{
        console.log(req.body);
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return next(new errorHandler(400, "Input validation error", errors));
        }
        const userId = req.thisuser._id;
        console.log(userId);
        const result= await posterModel.create({...req.body, userId:userId});
        if(!result ){
            return next(new errorHandler(400, "Error getting poster content", res));
        }
        res.status(201).json(result);
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