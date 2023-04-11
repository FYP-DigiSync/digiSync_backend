const sharp = require('sharp');
const {  saveImageToFile } = require("./promisfyCallback");

// const img1= require('../Uploads/templates')

// this function adjust the file of template

const adjustTemplate= async()=>{
    const i= 2;
    for(let i=17; i<26; i++){
        const path= `./dataset1/Image/${i}.png`;
        const metadata= await sharp(path).metadata();
        let height= metadata.height;
        if(height>4000){
            height= Number.parseInt(metadata.height/4);
        }else  if(height>3000){
            height= Number.parseInt(metadata.height/3);
        }else{
            height= Number.parseInt(metadata.height/2);
        }
        const image= await sharp(path).resize({fit:'cover',height:height}).trim().toFile(`./dataset1/Image1/${i}.png`);
        console.log(`Sucess :: ${i}`);

    }
    // console.log("sucess");

}


adjustTemplate();