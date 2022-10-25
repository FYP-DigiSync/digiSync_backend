
const average = require('image-average-color');
const sharp= require('sharp');

const promisefyCallback = (image) => {
    return new Promise((resolve, reject) => {
        average(image, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}
const saveImageToFile = (image,path) => {
    return new Promise((resolve, reject) => {
        sharp(image).toFile(`./Uploads/${path}.png`).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        });
    });
}

module.exports = {promisefyCallback,saveImageToFile};
