
const { validationResult } = require('express-validator');
const errorHandler = require('../Utils/errorHandler');
const fs = require('fs');
const metaModel = require('../Models/metaCredentialModel');
const axios = require('axios');
const FB = require('fb');
const { Storage } = require('@google-cloud/storage');
const fbPostModel = require('../Models/fbPost');
const instaPostModel = require('../Models/instaPost');
const sharp = require('sharp');


const storage = new Storage({
    keyFilename: './Utils/digisyncfireSdk.json',
});
const bucketName = process.env.FIREBASE_BUCKET;
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

        // find the user with user id
        const user = await metaModel.findOne({ user: req.thisuser });
        if(user){
            const result1_a = await metaModel.findOneAndUpdate(
            { user: req.thisuser },
            {
                access_token: result.data.access_token,
                user_id: useridResult.data.id,
                page_access_token: pageTokenResult.data.data[0].access_token,
                page_id: pageTokenResult.data.data[0].id,
                instagram_id: instaResult.data.instagram_business_account.id
            });
            if(!result1_a){
                return next(new errorHandler(401, "Invalid token", result));
            }
        }else{
            const result1_a = await metaModel.create({
                user: req.thisuser,
                access_token: result.data.access_token,
                user_id: useridResult.data.id,
                page_access_token: pageTokenResult.data.data[0].access_token,
                page_id: pageTokenResult.data.data[0].id,
                instagram_id: instaResult.data.instagram_business_account.id
            });
            if(!result1_a){
                return next(new errorHandler(401, "Invalid token", result));
            }
        }
        return res.status(201).json("success");
    }


    // Handle post to facebook
    postOnFB = async (req, res, next) => {
        console.log("djddjdjd");
        if (!req?.body?.message) {
            return next(new errorHandler(400, "caption not found"));
        }
        if (!req?.body?.data) {
            return next(new errorHandler(400, "Image not found"));
        }

        
        let data = req.body.data;
        data = data.replace(/^data:image\/\w+;base64,/, "");
        
        const buffer = Buffer.from(data, 'base64');
        const res1_a = await sharp(buffer).jpeg().toBuffer();
        
        
        const uploadId = `${Math.random().toString(36)}${Math.random().toString(36)}`;
        console.log(uploadId);
        const path = `./Uploads/fbPost/${uploadId}.jpeg`;
        fs.writeFileSync(`${path}`, res1_a);


        const id = await metaModel.findOne({ user: req.thisuser })
        if (!id) {
            return next(new errorHandler(404, "user not found in db", err));
        }
        FB.setAccessToken(id.page_access_token);
        await FB.api('me/photos', 'post', {
            source: fs.createReadStream(path), caption: req.body.message
        }, function (res1) {
            if (!res1 || res1.error) {
                console.log(!res1 ? 'error occurred' : res1.error);
                return;
            }
            console.log('Post Id: ' + res1.post_id);
            const create = new fbPostModel({
                user: req.thisuser,
                caption: req.body.message,
                posterRoute: path,
                postID: res1.post_id
            })
            create.save()
            return res.status(201).json("success");
        });

    }



    schedulePostOnFB = async (req, res, next) => {
        if (!req?.body?.message) {
            return next(new errorHandler(400, "caption not found"));
        }
        if (!req?.body?.data) {
            return next(new errorHandler(400, "Image not found"));
        }
        if (!req?.body?.time) {
            return next(new errorHandler(400, "time not found"));
        }
        // console.log(req.body.message);

        let data = req.body.data;
        data = data.replace(/^data:image\/\w+;base64,/, "");
        // display intial image byte
        for (let i = 0; i < 5; i++) {
            console.log(data[i]);
        }
        console.log("dkddk")
        
        const buffer = Buffer.from(data, 'base64');
        const res1_a = await sharp(buffer).jpeg().toBuffer();
        // console.log('dldld');
        
        
        const uploadId = `${Math.random().toString(36)}${Math.random().toString(36)}`;
        console.log(uploadId);
        const path = `./Uploads/fbPost/${uploadId}.jpeg`;
        fs.writeFileSync(`${path}`, res1_a);

        const path1 = `${uploadId}.jpg`;

        const generationMatchPrecondition = 0
        const options = {
            destination: path1,

            preconditionOpts: { ifGenerationMatch: generationMatchPrecondition },
        };

        const x = await storage.bucket(bucketName).upload(path, options);


        const url = `https://firebasestorage.googleapis.com/v0/b/${bucketName}/o/${path1}?alt=media`


        const id = await metaModel.findOne({ user: req.thisuser })
        if (!id) {
            return next(new errorHandler(404, "user not found in db", err));
        }
        let url1 = `https://graph.facebook.com/${id.page_id}/photos?published=false&url=${url}&message=${req.body.message}&scheduled_publish_time=${req.body.time}&access_token=${id.page_access_token}`

        let config = {
            method: 'post',
            url: url1,
            headers: {}
        };

        const results = await axios(config)
        if (!results || !results.data || !results.data.id) {
            return next(new errorHandler(404, "post could not created", err));
        }

        const create = new instaPostModel({
            user: req.thisuser,
            caption: req.body.message,
            posterRoute: path,
            postID: results.data.id
        })
        create.save()
        return res.status(201).json('success');

    }

    postOnInsta = async (req, res, next) => {
        console.log("djdjddjd");
        if (!req?.body?.message) {
            return next(new errorHandler(400, "caption not found"));
        }
        if (!req?.body?.data) {
            return next(new errorHandler(400, "Image not found"));
        }
        // console.log(req.body.message);

        let data = req.body.data;
        console.log(data);
        data = data.replace(/^data:image\/\w+;base64,/, "");
        // display intial image byte
        for (let i = 0; i < 5; i++) {
            console.log(data[i]);
        }
        console.log("dkddk")

        const buffer = Buffer.from(data, 'base64');
        console.log('dldld');
        const res1_a = await sharp(buffer).jpeg().toBuffer();
        console.log('dldld');


        const uploadId = `${Math.random().toString(36)}${Math.random().toString(36)}`;
        console.log(uploadId);
        const path = `./Uploads/fbPost/${uploadId}.jpeg`;
        fs.writeFileSync(`${path}`, res1_a);


        console.log("dkjddj");


        const path1 = `${uploadId}.jpg`;
        const generationMatchPrecondition = 0;
        const options = {
            destination: path1,
            preconditionOpts: { ifGenerationMatch: generationMatchPrecondition },
        };

        const x = await storage.bucket(bucketName).upload(path, options);
        // await uploadFile()
        // console.log(x);

        const url = `https://firebasestorage.googleapis.com/v0/b/digisync-c9aa1.appspot.com/o/${path1}?alt=media`


        const id = await metaModel.findOne({ user: req.thisuser })
        if (!id) {
            return next(new errorHandler(404, "user not found in db", err));
        }

        console.log(id.instagram_id);

        let url1 = `https://graph.facebook.com/v15.0/${id.instagram_id}/media?image_url=${url}&caption=${req.body.message}&access_token=${id.page_access_token}`;
        // console.log(url1);
        let config = {
            method: 'post',
            url: url1,
            headers: {}
        };

        console.log("hello");

        const results = await axios(config);
        console.log("Hello2");
        if (!results || !results.data || !results.data.id) {
            return next(new errorHandler(404, "post could not created", err));
        }

        // console.log(results.data.id)
        config = {
            method: 'post',
            url: `https://graph.facebook.com/v15.0/${id.instagram_id}/media_publish?creation_id=${results.data.id}&access_token=${id.page_access_token}`,
            headers: {}
        };


        const results1 = await axios(config)
        if (!results1 || !results1.data || !results1.data.id) {
            return next(new errorHandler(404, "post could not created", err));
        }
        const create = new instaPostModel({
            user: req.thisuser,
            caption: req.body.message,
            posterRoute: path,
            postID: results1.data.id
        })
        create.save()
        return res.status(201).json('Sucessfully posted on instagram');

    }




    schedulePostOnInsta = async (req, res, next) => {
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
        const path1 = `${uploadId}.${file.name.split(".")[1]}`;
        const path = `./Uploads/fbPost/${path1}`;
        await file.mv(path, (err) => {
            if (err) {
                return next(new errorHandler(400, "Error saving file", err));
            }
        })

        const generationMatchPrecondition = 0
        const options = {
            destination: path1,

            preconditionOpts: { ifGenerationMatch: generationMatchPrecondition },
        };

        const x = await storage.bucket(bucketName).upload(path, options);
        // await uploadFile()
        // console.log(x);

        const url = `https://firebasestorage.googleapis.com/v0/b/digisync-c9aa1.appspot.com/o/${path1}?alt=media`


        const id = await metaModel.findOne({ user: req.thisuser })
        if (!id) {
            return next(new errorHandler(404, "user not found in db", err));
        }
        let url1 = `https://graph.facebook.com/v15.0/${id.instagram_id}/media?image_url=${url}&caption=${req.body.message}&access_token=${id.page_access_token}`
        // console.log(url1);
        let config = {
            method: 'post',
            url: url1,
            headers: {}
        };

        const results = await axios(config)
        if (!results || !results.data || !results.data.id) {
            return next(new errorHandler(404, "post could not created", err));
        }

        // console.log(results.data.id)
        config = {
            method: 'post',
            url: `https://graph.facebook.com/v15.0/${id.instagram_id}/media_publish?creation_id=${results.data.id}&access_token=${id.page_access_token}`,
            headers: {}
        };


        const results1 = await axios(config)
        if (!results1 || !results1.data || !results1.data.id) {
            return next(new errorHandler(404, "post could not created", err));
        }
        const create = new instaPostModel({
            user: req.thisuser,
            caption: req.body.message,
            posterRoute: path,
            postID: results1.data.id
        })
        create.save();
        return res.status(201).json('success');

    }




    instaInsights = async (req, res, next) => {
        const err = validationResult(req);
        if (!err.isEmpty()) {
            return next(new errorHandler(400, "Input validation failed", err));
        }
        const id = await metaModel.findOne({ user: req.thisuser })
        if (!id) {
            return next(new errorHandler(404, "user not found in db", err));
        }
        let config = {
            method: 'get',
            url: `https://graph.facebook.com/${id.instagram_id}/insights?metric=impressions,reach,profile_views&period=day&access_token=${id.page_access_token}`,
            headers: {}
        };

        const results = await axios(config)
        // console.log(results.data)
        return res.status(201).json((results.data));

    }


    fbInsights = async (req, res, next) => {
        const err = validationResult(req);
        if (!err.isEmpty()) {
            return next(new errorHandler(400, "Input validation failed", err));
        }
        const id = await metaModel.findOne({ user: req.thisuser })
        if (!id) {
            return next(new errorHandler(404, "user not found in db", err));
        }
        let config = {
            method: 'get',
            url: `https://graph.facebook.com/${id.page_id}/insights/page_impressions_unique?access_token=${id.page_access_token}`,
            headers: {}
        };

        const results = await axios(config)
        // console.log(results.data)
        return res.status(201).json((results.data));

    }



    getCredential = async (req, res, next) => {
        const err = validationResult(req);
        if (!err.isEmpty()) {
            return next(new errorHandler(400, "Input validation failed", err));
        }
        const id = await metaModel.findOne({ user: req.thisuser })
        if (!id) {
            return res.status(201).json("not-exist");
        }
        else {

            return res.status(201).json("already-exist");
        }
    }


}


module.exports = new metaController();