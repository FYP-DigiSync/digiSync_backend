
const { validationResult } = require('express-validator');
// const {generateSimpleJWT}= require('../Utils/token');
const errorHandler = require('../Utils/errorHandler');
const fs = require('fs');
const metaModel = require('../Models/metaCredentialModel');
const axios = require('axios');
const FB = require('fb');

class metaController {

    // create a user 
    addCredential = async (req, res, next) => {
        const err = validationResult(req);
        if (!err.isEmpty()) {
            return next(new errorHandler(400, "Input validation failed", err));
        }
        let config = {
            method: 'get',
            url: `https://graph.facebook.com/v6.0/oauth/access_token?grant_type=fb_exchange_token&client_id=${process.env.APPID}&client_secret=${process.env.SECAPPID}&fb_exchange_token=${req.body.token}`
        };

        const result = await axios(config);
        if (!result || result.status != 200 || !result.data || !result.data.access_token) {
            return next(new errorHandler(401, "Invalid token", result));
        }
        config = {
            method: 'get',
            url: `https://graph.facebook.com/v6.0/me?access_token=${result.data.access_token}`,
            headers: {}
        };

        const useridResult = await axios(config)
        if (!useridResult || useridResult.status != 200 || !useridResult.data || !useridResult.data.id) {
            return next(new errorHandler(401, "Invalid token", result));
        }

        config = {
            method: 'get',
            url: `https://graph.facebook.com/${useridResult.data.id}/accounts?access_token=${result.data.access_token}`,
            headers: {}
        };

        const pageTokenResult = await axios(config)
        if (!pageTokenResult || pageTokenResult.status != 200 || !pageTokenResult.data || !pageTokenResult.data.data[0] || !pageTokenResult.data.data[0].access_token || !pageTokenResult.data.data[0].id) {
            return next(new errorHandler(401, "Invalid token", result));
        }

        config = {
            method: 'get',
            url: `https://graph.facebook.com/v15.0/${pageTokenResult.data.data[0].id}?fields=instagram_business_account&access_token=${pageTokenResult.data.data[0].access_token}`,
            headers: {}
        };

        const instaResult = await axios(config)
        if (!instaResult || instaResult.status != 200 || !instaResult.data || !instaResult.data.instagram_business_account || !instaResult.data.instagram_business_account.id) {
            return next(new errorHandler(401, "Invalid token", result));
        }

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
    postOnFB = async (req, res, next) => {
        const err = validationResult(req);
        if (!err.isEmpty()) {
            return next(new errorHandler(400, "Input validation failed", err));
        }
        if (!req.files.picture) {
            return next(new errorHandler(400, "picture not found", err));
        }
        if (!req.body.message) {
            return next(new errorHandler(400, "message not found", err));
        }
        
        const file = req.files.picture;
        const uploadId = `${Math.random().toString(36)}${Math.random().toString(36)}`;
        const path = `./Uploads/${uploadId}.${file.name.split(".")[1]}`;
        await file.mv(path, (err) => {
            if (err) {
                return next(new errorHandler(400, "Error saving file", err));
            }
        })

        const id = await metaModel.findOne({ user: req.thisuser })
        if (!id) {
            return next(new errorHandler(404, "user not found in db", err));
        }
        
        FB.setAccessToken(id.page_access_token);
        await FB.api('me/photos', 'post', { source: fs.createReadStream(path), caption: req.body.message }, function (res) {
            if(!res || res.error) {
              console.log(!res ? 'error occurred' : res.error);
              return;
            }
            console.log('Post Id: ' + res.post_id);
          });
        return res.status(201).json("success");

    }
}


module.exports = new metaController();