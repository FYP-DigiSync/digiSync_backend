const Dalle = require("../Utils/dalle2");
const errorHandler = require("../Utils/errorHandler");
const sharp = require('sharp');
const axios = require("axios");
const promisefyCallback = require("../Utils/promisfyCallback");

// APIkey==  NdySQeb7wpfUvEUw6ne255PC

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
        let res2 = [];

        const response = await axios.get(res1[1].generation.image_path, {
            responseType: "arraybuffer",
        });

        // remove the background
        const image1 = await sharp(Buffer.from(response.data, "binary")).png().toBuffer();

        // resize the image
        let image2 = await sharp(image1).resize(500, 500).png().toBuffer();

        // crop the left side of the image
        const image3 = await sharp(image2).extract({ left: 0, top: 0, width: 5, height: 360 }).png().toBuffer();



        // increase the width by adding image3 to the right side of image2 repeatedly until the width is 1080
        for (let i = 0; i < 144; i++) {
            image2 = await sharp(image2).extend({ top: 0, bottom: 0, left: 5, right: 0, background: "red"}).png().toBuffer();
            image2 = await sharp(image2).composite([{ input: image3, top:0, left:0 }]).png().toBuffer();
        }

        // crop the bottom 5 pixels of the image
        const image4 = await sharp(image2).extract({ left: 0, top: 355, width: 1080, height: 5 }).png().toBuffer();



        // // increase the width by adding image4 to the bottom side of image2 repeatedly until the height is 1080
        for (let i = 0; i < 144; i++) {
            image2 = await sharp(image2).extend({ top: 0, bottom: 5, left: 0, right: 0, background: "red" }).png().toBuffer();
            image2 = await sharp(image2).composite([{ input: image4, left: 0, top:360+i*5 }]).png().toBuffer();
        }


        // get the image width and height
        // let { width, height } = await sharp(image2).metadata();


        // while(width<1080){
        //     // apend image3 to left side of image2
        //     image2 = await sharp(image2).joinChannel(image3, {
        //         raw: {
        //             width: 1,
        //             height: 360,
        //             channels: 4,
        //         },
        //     }).png().toBuffer();

        //     // get the image width and height
        //     const data = await sharp(image2).metadata();
        //     width = data.width;
        // }



        // // send as image 
        res.writeHead(200, {
            'Content-Type': 'image/png',
            'Content-Length': image2.length
        });
        res.end(image2);





        // for (let i = 0; i < res1.length; i++) {
        //     const response = await axios.get(res1[i].generation.image_path, {
        //         responseType: "arraybuffer",
        //     });
        //     const base64 = Buffer.from(response.data, "binary").toString("base64");

        //     // crop the image from the top corner 
        //     const image  = await sharp(Buffer.from(base64, "base64")).png().toBuffer();
        //     const croppedImage = await sharp(image).extract({ left: 0, top: 0, width: 1, height: 1 }).png().toBuffer();
        //     // get the average color
        //     const averageColor = await promisefyCallback(croppedImage);
        //     console.log(averageColor);
        //     res2.push({
        //         imageurl:res1[i].generation.image_path,
        //         bgcolor:averageColor,
        //     });
        // }
        // res.status(200).json({ prompt, data: generations });
        // res.status(200).json({ prompt, data: res1 });

    }
}


module.exports = new postController();