const express = require('express');
const router =  express.Router();
const authenticate = require('../src/middlewares/verifyToken');
const messageController = require('../src/controllers/message.controller');


router.post('/add', authenticate ,messageController.addMessage);
router.get('/get-message-by-conversation', authenticate ,messageController.getMessageByConversation);
module.exports = router;