
const average = require('image-average-color');

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
module.exports = promisefyCallback;
