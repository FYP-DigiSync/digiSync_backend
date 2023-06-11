const { validationResult } = require('express-validator');
const errorHandler = require('../Utils/errorHandler');
const fs = require('fs');
const axios = require('axios');
const sharp = require('sharp');

class whatsappController {    

  // Handle post to facebook
  messageOnWhatsapp = async (req, res, next) => {
        const { messageContent } = req.body;
  
  const fromPhoneNumberId = process.env.PHONE_NUMBER_ID;
  const accessToken = process.env.ACCESS_TOKEN;
  const phoneNumber= process.env.RECIPIENT_WAID;
  
  
  const headers = {
    Authorization: `Bearer ${accessToken}`,
    'Content-Type': 'application/json',
  };

  const body = {
    messaging_product: 'whatsapp',
    recipient_type: 'individual',
    to: phoneNumber,
    type: 'text',
    text: {
      preview_url: false,
      body: messageContent,
    },
  };

  const url = `https://graph.facebook.com/v17.0/${fromPhoneNumberId}/messages`;

  axios
    .post(url, body, { headers })
    .then((response) => {
      console.log(response.data);
      res.sendStatus(200);
    })
    .catch((error) => {
        console.log(error.response.data);
      res.sendStatus(500);
    });

    

}

}


module.exports = new whatsappController();

