const Dalle = require("../Utils/dalle2");
const errorHandler = require("../Utils/errorHandler");
const sharp = require('sharp');
const axios = require("axios");
const { promisefyCallback, saveImageToFile } = require("../Utils/promisfyCallback");
const imageModel = require("../Models/graphicModel");

class postController {

    generateGraphics = async (req, res, next) => {
        const { prompt } = req.body;
        if (!prompt) {
            return next(new errorHandler(400, "Prompt is required"));
        }
        const dalle = new Dalle("sess-laLTIUdvC3qUwsRnryRGUMiBansJ9rr4HNWGhlv7");
        const generations = await dalle.generate(prompt);
        if (!generations?.generations?.data) {
            return next(new errorHandler(400, "Error generation graphics"));
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
            let image3 = await sharp(image2).extract({ left: 0, top: 0, width: 5, height: 440 }).png().toBuffer();
            const averageColor = await promisefyCallback(image3);
            let length = 5;
            for (let i = 0; i < 7; i++) {
                let image5 = await sharp(image3).extend({ top: 0, bottom: 0, left: length, right: 0, background: "red" }).png().toBuffer();
                image3 = await sharp(image5).composite([{ input: image3, top: 0, left: 0 }]).png().toBuffer();
                length += length;
            }
            image2 = await sharp(image2).extend({ top: 0, bottom: 0, left: 640, right: 0, background: "red" }).png().toBuffer();
            image2 = await sharp(image2).composite([{ input: image3, top: 0, left: 0 }]).png().toBuffer();
            let image4 = await sharp(image2).extract({ left: 0, top: 435, width: 1080, height: 5 }).png().toBuffer();
            length = 5;
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
    }


    getPosterContent= async(req,res, next)=>{
        // http://localhost:8080/
        const { prompt } = req.body;
        if (!prompt) {
            return next(new errorHandler(400, "Prompt is required"));
        }
        console.log(prompt);
        // sent a post request to the server
        const response = await axios.post("http://localhost:8080/", {prefix: prompt, temperature:0.7, batch_size:10});
        console.log(response);
        if(!response || !response.data){
            return next(new errorHandler(400, "Error getting poster content", response));
        }
        res.status(200).json(response.data);
    }
}


module.exports = new postController();