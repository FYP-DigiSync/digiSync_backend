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

module.exports = {saveImageToFile};
