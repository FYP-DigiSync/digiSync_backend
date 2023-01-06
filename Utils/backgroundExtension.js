const errorHandler = require("./errorHandler");
const sharp = require('sharp');
const axios = require("axios");
const {  saveImageToFile } = require("./promisfyCallback");



const topExpansion = async(image2)=>{
    // bottom Expansion
    let length = 5;
    let image4 = await sharp(image2).extract({ left: 0, top: 0, width: 1200, height: 1 }).png().toBuffer();
    
    // Bottom Content aware failing of paxels 
    let obj = await sharp(image4).raw().toBuffer();
    // get only 3 channels of the image without alpha channel 
    let channel= obj.length/1200;
    let limitdiff= 10;
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
    image4= image4_a;
    for (let i = 0; i < 7; i++) {
        let image6 = await sharp(image4).extend({ top: 0, bottom: length, left: 0, right: 0, background: "red" }).png().toBuffer();
        image4 = await sharp(image6).composite([{ input: image4, left: 0, top: length }]).png().toBuffer();
        length += length;
    }
    let image3 = await sharp(image2).extend({ top: 640, bottom: 0, left: 0, right: 0, background: "red" }).png().toBuffer();
    image3 = await sharp(image3).composite([{ input: image4, left: 0, top: 0 }]).png().toBuffer();
    return image3;
}

const bottomExpansion = async(image2)=>{
    length = 5;
    let image4 = await sharp(image2).extract({ left: 0, top: 559, width: 1200, height: 1 }).png().toBuffer();
    let obj = await sharp(image4).raw().toBuffer();
    // get only 3 channels of the image without alpha channel 
    let channel= obj.length/1200;
    let limitdiff= 10;
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
   

    image4= image4_a;
    for (let i = 0; i < 7; i++) {
        let image6 = await sharp(image4).extend({ top: 0, bottom: length, left: 0, right: 0, background: "red" }).png().toBuffer();
        image4 = await sharp(image6).composite([{ input: image4, left: 0, top: length }]).png().toBuffer();
        length += length;
    }
    let image3 = await sharp(image2).extend({ top: 0, bottom: 640, left: 0, right: 0, background: "red" }).png().toBuffer();
    image3 = await sharp(image3).composite([{ input: image4, left: 0, top: 560 }]).png().toBuffer();
    return image3;
}

const leftExpansion = async(image2)=>{
    let image3 = await sharp(image2).extract({ left: 1, top: 0, width: 1, height: 560 }).ensureAlpha().toBuffer();
    let length = 5;
    let obj = await sharp(image3).raw().toBuffer();
    let channel= obj.length/560;

    for(let i=3*channel; i<(obj.length-(channel-1)); i+=channel){
        // take the average of the last three values for red, green, and blue respectively
        const red = (obj[i-3*channel] + obj[i-(2*channel)] + obj[i-channel] )/3;
        const green = (obj[i-(3*channel-1)] + obj[i-(2*channel-1)] + obj[i-(channel-1)] )/3;
        const blue = (obj[i-(3*channel-2)] + obj[i-(2*channel-2)] + obj[i-(channel-2)] )/3;
        if(obj[i] > (red + 5) || obj[i] < (red - 5)){
            obj[i] = red;
        }
        if(obj[i+1] > (green + 5) || obj[i+1] < (green - 5)){
            obj[i+1] = green;
        }
        if(obj[i+2] > (blue + 5) || obj[i+2] < (blue - 5)){   
            obj[i+2] = blue;
        }
    }

    // use the new buffer to create a new image
    const image_3b = await sharp(Buffer.from(obj), { raw: { width: 1, height: 560, channels: channel } }).png().toBuffer();

    let image_3a = await sharp(image_3b).extend({ top: 0, bottom: 0, left: (length-1), right: 0, background: "red" }).png().toBuffer();
    for(let i=0; i<length; i++){
        image_3a = await sharp(image_3a).composite([{ input: image_3b, top: 0, left: i }]).png().toBuffer();
    }
    image3= image_3a;
            
    for (let i = 0; i < 7; i++) {
        let image5 = await sharp(image3).extend({ top: 0, bottom: 0, left: length, right: 0, background: "red" }).png().toBuffer();
        image3 = await sharp(image5).composite([{ input: image3, top: 0, left: 0 }]).png().toBuffer();
        length += length;
    }
    return image3;
}

const backgroundExtension = async (path, res1) => {
    let res2 = {
        generation:[]
    };
    for (let i = 0; i <res1.length; i++) {
        const response = await axios.get(res1[i], {
            responseType: "arraybuffer",
        });
        const image1 = await sharp(Buffer.from(response.data, "binary")).png().toBuffer();
        let image2 = await sharp(image1).resize(560, 560).png().toBuffer();
       
        let image3 = await leftExpansion(image2);
        image2 = await sharp(image2).extend({ top: 0, bottom: 0, left: 640, right: 0, background: "red" }).png().toBuffer();
        image2 = await sharp(image2).composite([{ input: image3, top: 0, left: 0 }]).png().toBuffer();
      
        // bottom Expansion
        const topExpended = await topExpansion(image2);
        const bottomExpend= await bottomExpansion(image2);

        // save the orginal made image
        let uploadId1 = `${path}/${Math.random().toString(36)}${Math.random().toString(36)}`;
        const saveImg = await saveImageToFile(bottomExpend, uploadId1);
        if (!saveImg) {
            return next(new errorHandler(400, "Error saving image", saveImg));
        }


        // let uploadId2 = `${path}/${Math.random().toString(36)}${Math.random().toString(36)}`;
        // const saveImg2 = await saveImageToFile(topExpended, uploadId2);
        // if (!saveImg2) {
        //     return next(new errorHandler(400, "Error saving image", saveImg2));
        // }
        
        // // flop the image along x-axis
        // let  uploadId3 = `${path}/${Math.random().toString(36)}${Math.random().toString(36)}`;
        // const image3_a= await sharp(topExpended).flop().toBuffer();  
        // const saveImg3 = await saveImageToFile(image3_a, uploadId3);
        // if (!saveImg3) {
        //     return next(new errorHandler(400, "Error saving image", saveImg3));
        // }

        // let  uploadId4 = `${path}/${Math.random().toString(36)}${Math.random().toString(36)}`;
        // const image3_b= await sharp(bottomExpend).flop().toBuffer();  
        // const saveImg4 = await saveImageToFile(image3_b, uploadId4);
        // if (!saveImg4) {
        //     return next(new errorHandler(400, "Error saving image", saveImg4));
        // }
        res2.generation.push({
            "image_path": `http://localhost:4000/digsync/api/v0.1/uploads/${uploadId1}.png`,
            // variation:{
            //     bottom_right:`http://localhost:4000/digsync/api/v0.1/uploads/${uploadId2}.png`,
            //     bottom_left:`http://localhost:4000/digsync/api/v0.1/uploads/${uploadId3}.png`,
            //     top_left:`http://localhost:4000/digsync/api/v0.1/uploads/${uploadId4}.png`
            // }
        });
    }
    return res2;
}


// const prevcode= async(res1)=>{
//     let res2 = {
//         generation:[]
//     };
//     for (let i = 0; i <res1.length; i++) {
//         const response = await axios.get(res1[i].generation.image_path, {
//             responseType: "arraybuffer",
//         });
//         const image1 = await sharp(Buffer.from(response.data, "binary")).png().toBuffer();
//         let image2 = await sharp(image1).resize(440, 440).png().toBuffer();
//         // const data= await this.getImageData(image1);
//         // // fit gradient
//         // const image3= fitGradient(data);
//         // const image4 = await sharp(Buffer.from(gradient), { raw: { width: 440, height: 440, channels: 3 } }).png().toBuffer();

       
//         let image3 = await sharp(image2).extract({ left: 0, top: 0, width: 1, height: 440 }).png().toBuffer();
//         let length = 5;
        
//         // extract all three colors channels from image3
//         let obj = await sharp(image3).raw().toBuffer();
//         // write the buffer to a file
//         for(let i=9; i<obj.length-2; i+=3){
//             // take the average of the last three values for red, green, and blue respectively
//             const red = (obj[i-9] + obj[i-6] + obj[i-3] )/3;
//             const green = (obj[i-8] + obj[i-5] + obj[i-2] )/3;
//             const blue = (obj[i-7] + obj[i-4] + obj[i-1] )/3;
//             if(obj[i] > (red + 5) || obj[i] < (red - 5)){
//                 obj[i] = red;
//             }
//             if(obj[i+1] > (green + 5) || obj[i+1] < (green - 5)){
//                 obj[i+1] = green;
//             }
//             if(obj[i+2] > (blue + 5) || obj[i+2] < (blue - 5)){   
//                 obj[i+2] = blue;
//             }
//         }

//         // use the new buffer to create a new image
//         const image_3b = await sharp(Buffer.from(obj), { raw: { width: 1, height: 440, channels: 3 } }).png().toBuffer();

//         let image_3a = await sharp(image_3b).extend({ top: 0, bottom: 0, left: length, right: 0, background: "red" }).png().toBuffer();

        
        
//         for(let i=0; i<length; i++){
//             image_3a = await sharp(image_3a).composite([{ input: image_3b, top: 0, left: i }]).png().toBuffer();
//         }
        

//         image3= image_3a;

//         for (let i = 0; i < 7; i++) {
//             let image5 = await sharp(image3).extend({ top: 0, bottom: 0, left: length, right: 0, background: "red" }).png().toBuffer();
//             image3 = await sharp(image5).composite([{ input: image3, top: 0, left: 0 }]).png().toBuffer();
//             length += length;
//         }
//         image2 = await sharp(image2).extend({ top: 0, bottom: 0, left: 640, right: 0, background: "red" }).png().toBuffer();
//         image2 = await sharp(image2).composite([{ input: image3, top: 0, left: 0 }]).png().toBuffer();
//         // bottom Expansion
//         length = 5;
//         let image4 = await sharp(image2).extract({ left: 0, top: 439, width: 1080, height: 1 }).png().toBuffer();

//         // Bottom Content aware failing of paxels 
//         obj = await sharp(image4).raw().toBuffer();
//         for(let i=9; i<obj.length-2; i+=3){
//             // take the average of the last three values for red, green, and blue respectively
//             const red = (obj[i-9] + obj[i-6] + obj[i-3] )/3;
//             const green = (obj[i-8] + obj[i-5] + obj[i-2] )/3;
//             const blue = (obj[i-7] + obj[i-4] + obj[i-1] )/3;
//             if(obj[i] > (red + 5) || obj[i] < (red - 5)){
//                 obj[i] = red;
//             }
//             if(obj[i+1] > (green + 5) || obj[i+1] < (green - 5)){
//                 obj[i+1] = green;
//             }
//             if(obj[i+2] > (blue + 5) || obj[i+2] < (blue - 5)){
//                 obj[i+2] = blue;
//             }
//         }    
        
//         let image4_b = await sharp(Buffer.from(obj), { raw: { width: 1080, height: 1, channels: 3 } }).png().toBuffer();
//         let image4_a= await sharp(image4_b).extend({ top: 0, bottom: (length-1), left: 0, right: 0, background: "red" }).png().toBuffer();

//         for(let i=1; i<length; i++){
//             image4_a = await sharp(image4_a).composite([{ input: image4_b, top: i, left: 0 }]).png().toBuffer();
//         }
//         image4= image4_a;
//         for (let i = 0; i < 7; i++) {
//             let image6 = await sharp(image4).extend({ top: 0, bottom: length, left: 0, right: 0, background: "red" }).png().toBuffer();
//             image4 = await sharp(image6).composite([{ input: image4, left: 0, top: length }]).png().toBuffer();
//             length += length;
//         }
//         image2 = await sharp(image2).extend({ top: 0, bottom: 640, left: 0, right: 0, background: "red" }).png().toBuffer();
//         image2 = await sharp(image2).composite([{ input: image4, left: 0, top: 440 }]).png().toBuffer();

//         let uploadId = `${Math.random().toString(36)}${Math.random().toString(36)}`;
//         const saveImg = await saveImageToFile(image2, uploadId);
//         if (!saveImg) {
//             return next(new errorHandler(400, "Error saving image", res));
//         }
//         res2.generation.push({
//             "image_path": `http://localhost:4000/digsync/api/v0.1/uploads/${uploadId}.png`,
//             bgcolor:averageColor
//         });
//     }
// }




module.exports = backgroundExtension;

