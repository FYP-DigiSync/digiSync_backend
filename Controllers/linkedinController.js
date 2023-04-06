const express = require('express');
const { validationResult } = require('express-validator');
const errorHandler = require('../Utils/errorHandler');
const fs = require('fs');


const linkedinModel = require('../Models/linkedinCredentialModel');

const axios = require('axios');
const { Storage } = require('@google-cloud/storage');



const sharp = require('sharp');


const storage = new Storage({
    keyFilename: './Utils/digisync-c9aa1-firebase-adminsdk-qn02h-0045992fcb.json',
});
const bucketName = process.env.FIREBASE_BUCKET;
class linkedinController {

     // create a user 
     addCredential = async (req, res, next) => {
        const err = validationResult(req);
        if (!err.isEmpty()) {
            return next(new errorHandler(400, "Input validation failed", err));
        }
        // let config = {
        //     method: 'get',
        //     url: `https://graph.facebook.com/v6.0/oauth/access_token?grant_type=fb_exchange_token&client_id=${process.env.APPID}&client_secret=${process.env.SECAPPID}&fb_exchange_token=${req.body.token}`
        // };

        const redirectUri = 'http://localhost:4000/auth/linkedin/callback';
        const scope = 'r_liteprofile r_emailaddress w_member_social';

        const url = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${process.env.CLIENT_ID}&redirect_uri=${redirectUri}&scope=${scope}`;

        res.redirect(url);

    }

    redirectAddCredential = async (req, res, next) => {
        
        const { code } = req.query;

        console.log("printing code = ",code);

        try {
            
            const response = await axios({
            method: 'post',
            url: 'https://www.linkedin.com/oauth/v2/accessToken',
            params: {
                grant_type: 'authorization_code',
                code,
                redirect_uri: 'http://localhost:4000/auth/linkedin/callback',
                client_id: process.env.CLIENT_ID,
                client_secret: process.env.CLIENT_SECRET
            }
            });

            const { access_token } = response.data;

            //save access token in database

            

            const user = await linkedinModel.findOne({ user: req.thisuser });
            if(user){
                const result1_a = await linkedinModel.findOneAndUpdate(
                { user: req.thisuser },
                {
                    access_token: access_token,
                    
                });
                if(!result1_a){
                    return next(new errorHandler(401, "Invalid token", result));
                }
            }else{
                const result1_a = await linkedinModel.create({
                    user: req.thisuser,
                    access_token: access_token,
                   
                });
                if(!result1_a){
                    return next(new errorHandler(401, "Invalid token", result));
                }
            }
            return res.status(201).json("success");

            

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server Error' });
        }
    
    }


    postImageOnLinkedin = async (req, res, next) => {
        if (!req?.body?.message) {
            return next(new errorHandler(400, "caption not found"));
        }
        if (!req?.body?.data) {
            return next(new errorHandler(400, "Image not found"));


        }

        let text ="hello my first post";
        //current directory lion.jpg image
        
        let data = req.body.data;
        data = data.replace(/^data:image\/\w+;base64,/, "");
        // display intial image byte
        for (let i = 0; i < 5; i++) {
            console.log(data[i]);
        }
        console.log("dkddk")

        const image = Buffer.from(data, 'base64');

        
        console.log("binary image = ", image);

        //retrieve access token from database
        const user = await linkedinModel.findOne({ user: req.thisuser });
        if(!user){
            return next(new errorHandler(401, "Invalid token", result));
        }
        const access_token = user.access_token;


        

     
      
      // get user information
      const userInformationResponse = await axios.get('https://api.linkedin.com/v2/me', {
        headers: {
            'Authorization': `Bearer ${access_token}`
        }
        });

      console.log("userInformationResponse = ", userInformationResponse);

      // register image
        const registerImageResponse= await axios.post(`https://api.linkedin.com/v2/assets?action=registerUpload`,
        
            {
            registerUploadRequest: {
                recipes: [
                    'urn:li:digitalmediaRecipe:feedshare-image'
                ],
                owner: `urn:li:person:${userInformationResponse.data.id}`,
                serviceRelationships: [
                    {
                        relationshipType: 'OWNER',
                        identifier: 'urn:li:userGeneratedContent'
                    }
                ]
            }

            },
            {
                        headers: {
                            'content-type': 'application/json',
                            Authorization: `Bearer ${access_token}`,
                'X-Restli-Protocol-Version': '2.0.0',
                'Connection': 'keep-alive',
                

                        },         
                    }
        
        )

        if(registerImageResponse.status !== 201){
            return next(new errorHandler(400, "Image not found"));
        }

        console.log("registerImageResponse = ", registerImageResponse);



        //send a POST request to the uploadUrl with imageUrl as a binary file. 

        const uploadRespone = await axios.post(value.uploadMechanism['com.linkedin.digitalmedia.uploading.MediaUploadHttpRequest'].uploadUrl,
          image,
          {
            headers: {
              'X-Restli-Protocol-Version': '2.0.0',
              'Connection': 'keep-alive',
              'Content-Type': 'application/octet-stream',
              Authorization: `Bearer ${access_token}`,
              
              
            }
          }
        )

        if(uploadRespone.status !== 201){
            return next(new errorHandler(400, "Image not found"));
        }


        console.log("uploadRespone = ", uploadRespone);

        
        //image asset to be used in share  
        const asset = registerImageResponse.data.value.asset;  


        const shareResponse=  await axios.post(`https://api.linkedin.com/v2/ugcPosts`,
            {
                author: `urn:li:person:${userInformationResponse.data.id}`,
                lifecycleState: 'PUBLISHED',
                specificContent: {
                    'com.linkedin.ugc.ShareContent': {
                        shareCommentary: {
                            text: 'Check out my first post!'
                        },
                        shareMediaCategory: 'IMAGE',
                        media: [
                            {
                                status: 'READY',
                                description: {
                                    text: 'Center stage!'
                                },
                                media: asset,
                                title: {
                                    text: 'LinkedIn Talent Connect 2023'
                                }
                            }
                        ]
                    }
                },
                visibility: {
                    'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC'
                }
            }
            ,
            {
                headers: {
                'content-type': 'application/json',
                Authorization: `Bearer ${access_token}`,
                'X-Restli-Protocol-Version': '2.0.0',
                


                },         
            }
            )

            console.log("shareResponse = ", shareResponse);

            //save post id in database

            // const result1_a = await linkedinModel.findOneAndUpdate(
            // { user: req.thisuser },
            // {
            //     post_id: shareResponse.data.id,
                
            // });
            // if(!result1_a){
            //     return next(new errorHandler(401, "Invalid token", result));
            // }

            if(shareResponse.status !== 201){
                return next(new errorHandler(401, "Invalid token", result));
            }







            return res.status(201).json("success");


    
    }


    postTextOnLinkedin = async (req, res, next) => {
        
        if (!req?.body?.message) {
            return next(new errorHandler(400, "caption not found"));
        }

        //retrieve access token from database
        const user = await linkedinModel.findOne({ user: req.thisuser });
        if(!user){
            return next(new errorHandler(401, "Invalid token", result));
        }
        const access_token = user.access_token;

        const userInformationResponse = await axios.get('https://api.linkedin.com/v2/me', {
            headers: {
            'Authorization': `Bearer ${access_token}`,
    
            }
        });
        
        
          
        const response = await axios.post('https://api.linkedin.com/v2/ugcPosts',
                    {
                        author: `urn:li:person:${userInformationResponse.data.id}`,
                        lifecycleState: 'PUBLISHED',
                        specificContent: {
                            'com.linkedin.ugc.ShareContent': {
                                shareCommentary: {
                                    text: 'new one!',
                                },
                                shareMediaCategory: 'NONE'
                            }
                        },
                        visibility: {
                            'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC'
                        } 
                    }, {
                        headers: {
                            'content-type': 'application/json',
                            Authorization: `Bearer ${access_token}`,
                'X-Restli-Protocol-Version': '2.0.0',
                'Connection': 'keep-alive',
    
                        },         
        });
    
        
        if(response.status !== 201){
            return next(new errorHandler(401, "Invalid token", result));
        }

        return res.status(201).json("success");

            
         



    
    }






}

module.exports = new linkedinController();


