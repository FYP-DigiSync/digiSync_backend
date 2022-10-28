const Dalle = require("../Utils/dalle2");
const errorHandler = require("../Utils/errorHandler");
const sharp = require('sharp');
const axios = require("axios");
const { promisefyCallback, saveImageToFile } = require("../Utils/promisfyCallback");
const imageModel = require("../Models/graphicModel");
const { validationResult } = require("express-validator");

class postController {

    generateGraphics = async (req, res, next) => {
        const { prompt } = req.body;
        console.log(prompt);
        if (!prompt) {
            return next(new errorHandler(400, "Prompt is required"));
        }
        const dalle = new Dalle("sess-laLTIUdvC3qUwsRnryRGUMiBansJ9rr4HNWGhlv7");
        const generations = await dalle.generate(prompt);
        if (!generations?.generations?.data) {
            return next(new errorHandler(400, "Error generation graphics",generations ));
        }
        const res1 = generations.generations.data;
        let res2 = {
            prompt: prompt,
            generation:[]
        };

        for (let i = 0; i < res1.length; i++) {
            const response = await axios.get(res1[i].generation.image_path, {
                responseType: "arraybuffer",
            });
            const image1 = await sharp(Buffer.from(response.data, "binary")).png().toBuffer();
            let image2 = await sharp(image1).resize(440, 440).png().toBuffer();
            let image3 = await sharp(image2).extract({ left: 0, top: 0, width: 1, height: 440 }).png().toBuffer();
            const averageColor = await promisefyCallback(image3);
            let length = 5;
            let image_3a = await sharp(image3).extend({ top: 0, bottom: 0, left: length, right: 0, background: "red" }).png().toBuffer();
            for(let i=0; i<length; i++){
                image_3a = await sharp(image_3a).composite([{ input: image3, top: 0, left: i }]).png().toBuffer();
            }
            image3= image_3a;

            for (let i = 0; i < 7; i++) {
                let image5 = await sharp(image3).extend({ top: 0, bottom: 0, left: length, right: 0, background: "red" }).png().toBuffer();
                image3 = await sharp(image5).composite([{ input: image3, top: 0, left: 0 }]).png().toBuffer();
                length += length;
            }
            image2 = await sharp(image2).extend({ top: 0, bottom: 0, left: 640, right: 0, background: "red" }).png().toBuffer();
            image2 = await sharp(image2).composite([{ input: image3, top: 0, left: 0 }]).png().toBuffer();
            // bottom Expansion
            length = 5;
            let image4 = await sharp(image2).extract({ left: 0, top: 439, width: 1080, height: 1 }).png().toBuffer();
            let image4_a= await sharp(image4).extend({ top: 0, bottom: (length-1), left: 0, right: 0, background: "red" }).png().toBuffer();
            for(let i=1; i<length; i++){
                image4_a = await sharp(image4_a).composite([{ input: image4, top: i, left: 0 }]).png().toBuffer();
            }
            image4= image4_a;
            for (let i = 0; i < 7; i++) {
                let image6 = await sharp(image4).extend({ top: 0, bottom: length, left: 0, right: 0, background: "red" }).png().toBuffer();
                image4 = await sharp(image6).composite([{ input: image4, left: 0, top: length }]).png().toBuffer();
                length += length;
            }
            image2 = await sharp(image2).extend({ top: 0, bottom: 640, left: 0, right: 0, background: "red" }).png().toBuffer();
            image2 = await sharp(image2).composite([{ input: image4, left: 0, top: 440 }]).png().toBuffer();

            let uploadId = `${Math.random().toString(36)}${Math.random().toString(36)}`;
            const saveImg = await saveImageToFile(image2, uploadId);
            if (!saveImg) {
                return next(new errorHandler(400, "Error saving image", res));
            }
            res2.generation.push({
                "image_path": `http://localhost:4000/digsync/api/v0.1/uploads/${uploadId}.png`,
                bgcolor:averageColor
            });
        }
        res.status(200).json(res2);
        // res.status(200).json(res1);

        // send image back
        // res.writeHead(200, {
        //     'Content-Type': 'image/png',
        //     'Content-Length': image2.length
        // });
        // res.end(image2);
    }


    getListOfgeneration= async (req, res, next) => {
        const dalle = new Dalle("sess-k5VnW7R8nDpVEwxU1ci4mNg6Pmhxn2altxB9Ae9S");
        const generations = await dalle.list({limit:10});
        if (!generations?.generations?.data) {
            return next(new errorHandler(400, "Error generation graphics",generations ));
        }
        return res.status(200).json(generations.generations.data);
    }


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
}


module.exports = new postController();