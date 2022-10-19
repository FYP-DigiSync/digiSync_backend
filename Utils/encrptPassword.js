const bcrypt = require('bcrypt');


async function hashPassword(password) {
    // generate salt to hash password
    const salt = await bcrypt.genSalt(10);
    // now we set user password to hashed password
    return await bcrypt.hash(password, salt);
}

async function verifyHashPassword(password, hash) {
    return await bcrypt.compare(password, hash);
}

module.exports = { hashPassword, verifyHashPassword };