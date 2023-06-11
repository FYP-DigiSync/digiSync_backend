const express = require('express');
const router = express.Router();
const whatsappController = require('../Controllers/whatsappController');
const asyncWrapper = require('../Middleware/asycWrapper');
const auth = require('../Middleware/authMiddleware');

router.post('/messageOnWhatsapp', asyncWrapper(whatsappController.messageOnWhatsapp));