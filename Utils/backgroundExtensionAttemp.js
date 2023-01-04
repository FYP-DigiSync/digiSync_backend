const errorHandler = require("./errorHandler");
const sharp = require('sharp');
const axios = require("axios");
const { promisefyCallback, saveImageToFile } = require("./promisfyCallback");

const backgroundExtension = async (path, res1) => {
    let res2 = {
        generation:[]
    };

    for (let i = 0; i <res1.length; i++) {
        const response = await axios.get(res1[i], {
            responseType: "arraybuffer",
        });
        const image1 = await sharp(Buffer.from(response.data, "binary")).png().toBuffer();
        let image2 = await sharp(image1).resize(440, 440).png().toBuffer();
       
       
        let image3 = await sharp(image2).extract({ left: 0, top: 0, width: 1, height: 440 }).png().toBuffer();
        const averageColor = await promisefyCallback(image3);
        let length = 5;
        let obj = await sharp(image3).raw().toBuffer();
        let channel= obj.length/440;
        let limitdiff= 40;
        for(let i=3*channel; i<(obj.length-(channel-1)); i+=channel){
            // take the average of the last three values for red, green, and blue respectively
            const red = (obj[i-3*channel] + obj[i-(2*channel)] + obj[i-channel] )/3;
            const green = (obj[i-(3*channel-1)] + obj[i-(2*channel-1)] + obj[i-(channel-1)] )/3;
            const blue = (obj[i-(3*channel-2)] + obj[i-(2*channel-2)] + obj[i-(channel-2)] )/3;
            if(obj[i] > (red + limitdiff) || obj[i] < (red - limitdiff)){
                obj[i] = red;
            }
            if(obj[i+1] > (green + limitdiff) || obj[i+1] < (green - limitdiff)){
                obj[i+1] = green;
            }
            if(obj[i+2] > (blue + limitdiff) || obj[i+2] < (blue - limitdiff)){   
                obj[i+2] = blue;
            }
        }

        // use the new buffer to create a new image
        const image_3b = await sharp(Buffer.from(obj), { raw: { width: 1, height: 440, channels: channel } }).png().toBuffer();
        let image_3a = await sharp(image_3b).extend({ top: 0, bottom: 0, left: (length-1), right: 0, background: "red" }).png().toBuffer();
        for(let i=0; i<length; i++){
            image_3a = await sharp(image_3a).composite([{ input: image_3b, top: 0, left: i }]).png().toBuffer();
        }

        let image2_t = await sharp(image3).resize(760, 440, { kernel: sharp.kernel.nearest}).png().toBuffer(); 
        image3= image_3a;

        image2 = await sharp(image2).extend({ top: 0, bottom: 0, left: 760, right: 0, background: "red" }).png().toBuffer();
        image2 = await sharp(image2).composite([{ input: image2_t, top: 0, left: 0 }]).png().toBuffer();
      
        // bottom Expansion
        length = 5;
        let image4 = await sharp(image2).extract({ left: 0, top: 439, width: 1200, height: 1 }).png().toBuffer();
        
        
        // Bottom Content aware failing of paxels 
        obj = await sharp(image4).raw().toBuffer();
        // get only 3 channels of the image without alpha channel 
        channel= obj.length/1200;
        for(let i=3*channel; i<obj.length-(channel-1); i+=channel){
            // take the average of the last three values for red, green, and blue respectively
            const red = (obj[i-3*channel] + obj[i-(2*channel)] + obj[i-channel] )/3;
            const green = (obj[i-(3*channel-1)] + obj[i-(2*channel-1)] + obj[i-(channel-1)] )/3;
            const blue = (obj[i-(3*channel-2)] + obj[i-(2*channel-2)] + obj[i-(channel-2)] )/3;
            if(obj[i] > (red + limitdiff) || obj[i] < (red - limitdiff)){
                obj[i] = red;
            }
            if(obj[i+1] > (green + limitdiff) || obj[i+1] < (green - limitdiff)){
                obj[i+1] = green;
            }
            if(obj[i+2] > (blue + limitdiff) || obj[i+2] < (blue - limitdiff)){
                obj[i+2] = blue;
            }
        }    
        
        const image4_b = await sharp(Buffer.from(obj), { raw: { width: 1200, height: 1, channels: channel } }).png().toBuffer();

        let image4_a= await sharp(image4_b).extend({ top: 0, bottom: (length-1), left: 0, right: 0, background: "red" }).png().toBuffer();

        for(let i=1; i<length; i++){
            image4_a = await sharp(image4_a).composite([{ input: image4_b, top: i, left: 0 }]).png().toBuffer();
        }
        image2_t = await sharp(image4).resize(1200, 760, { kernel: sharp.kernel.nearest}).png().toBuffer(); 
        
        image4= image4_a;

        // Bottom Content aware failing of paxels
        image2 = await sharp(image2).extend({ top: 0, bottom: 760, left: 0, right: 0, background: "red" }).png().toBuffer();
        image2 = await sharp(image2).composite([{ input: image2_t, left: 0, top: 440 }]).png().toBuffer();

        let uploadId = `${path}/${Math.random().toString(36)}${Math.random().toString(36)}`;
        
        const saveImg = await saveImageToFile(image2, uploadId);
        if (!saveImg) {
            return next(new errorHandler(400, "Error saving image", saveImg));
        }
        res2.generation.push({
            "image_path": `http://localhost:4000/digsync/api/v0.1/uploads/${uploadId}.png`,
            bgcolor:averageColor
        });
    }
    return res2;
}





module.exports = backgroundExtension;

