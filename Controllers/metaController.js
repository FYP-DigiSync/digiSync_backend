
const { validationResult } = require('express-validator');
// const {generateSimpleJWT}= require('../Utils/token');
const errorHandler = require('../Utils/errorHandler');
// const {hashPassword,verifyHashPassword}=require('../Utils/encrptPassword');
const metaModel = require('../Models/metaCredentialModel');
const axios = require('axios');

class metaController {

    // create a user 
    addCredential = async (req, res, next) => {
        console.log(req.thisuser);
        const err = validationResult(req);
        if (!err.isEmpty()) {
            return next(new errorHandler(400, "Input validation failed", err));
        }
        let config = {
            method: 'get',
            url: `https://graph.facebook.com/v6.0/oauth/access_token?grant_type=fb_exchange_token&client_id=${process.env.APPID}&client_secret=${process.env.SECAPPID}&fb_exchange_token=${req.body.token}`
        };

        const result = await axios(config);
        // console.log(result.status)
        if (!result || result.status != 200 || !result.data || !result.data.access_token) {
            return next(new errorHandler(401, "Invalid token", result));
        }
        // console.log(result.data.access_token)
        config = {
            method: 'get',
            url: `https://graph.facebook.com/v6.0/me?access_token=${result.data.access_token}`,
            headers: {}
        };

        const useridResult = await axios(config)
        // console.log(useridResult.status)
        if (!useridResult || useridResult.status != 200 || !useridResult.data || !useridResult.data.id) {
            return next(new errorHandler(401, "Invalid token", result));
        }
        // console.log(useridResult.data.id)
        // result.data.access_token
        config = {
            method: 'get',
            url: `https://graph.facebook.com/${useridResult.data.id}/accounts?access_token=${result.data.access_token}`,
            headers: {}
        };

        const pageTokenResult = await axios(config)
        if (!pageTokenResult || pageTokenResult.status != 200 || !pageTokenResult.data || !pageTokenResult.data.data[0] || !pageTokenResult.data.data[0].access_token || !pageTokenResult.data.data[0].id) {
            return next(new errorHandler(401, "Invalid token", result));
        }
        // console.log(pageTokenResult.data.data[0].access_token)
        // console.log(pageTokenResult.data.data[0].id)
        config = {
            method: 'get',
            url: `https://graph.facebook.com/v15.0/${pageTokenResult.data.data[0].id}?fields=instagram_business_account&access_token=${pageTokenResult.data.data[0].access_token}`,
            headers: {}
        };

        const instaResult = await axios(config)
        if (!instaResult || instaResult.status != 200 || !instaResult.data || !instaResult.data.instagram_business_account || !instaResult.data.instagram_business_account.id) {
            return next(new errorHandler(401, "Invalid token", result));
        }
        // console.log(instaResult.data.instagram_business_account.id)
        const create = new metaModel({
            user: req.thisuser,
            access_token: result.data.access_token,
            user_id: useridResult.data.id,
            page_access_token: pageTokenResult.data.data[0].access_token,
            page_id: pageTokenResult.data.data[0].id,
            instagram_id: instaResult.data.instagram_business_account.id
        })
        create.save()
        return res.status(201).json("success");
    }


}


module.exports = new metaController();