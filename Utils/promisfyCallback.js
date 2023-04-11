const sharp= require('sharp');

const saveImageToFile = (image,path) => {
    return new Promise((resolve, reject) => {
        sharp(image).toFile(`./Uploads/${path}.png`).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        });
    });
}


const saveImageToPath= async(path, file)=>{
    return await new Promise((resolve, reject)=>{
        file.mv(path, (err) => {
            if(err){
                reject(err);
            }else{
                resolve("Sucess in uploading file")
            }
        });
        
    })
};

module.exports = {saveImageToFile, saveImageToPath};
