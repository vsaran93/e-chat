const status = require("http-status");
const Message = require("../models/message.model");
const logger = require('../../config/logger');

const conversationService = require("./conversation.service");


class MessageService {
  async addMessgae(args) {
      try {
        const { userId, messageObject } = args;
        messageObject.from = userId;
        let conversationId = "";
        if (messageObject.chatType === "new") {
          const conversation = await conversationService.create(messageObject);
          conversationId = conversation._id;
        } else {
          conversationId = messageObject.conversationId;
        }
        const message = new Message({
          text: messageObject.text,
          read: false,
          conversationId,
        });
        return await message.save();
      }
      catch(err) {
        logger.error('add messager error: ', err)
        return { responseCode: status.SERVICE_UNAVAILABLE }
      }
  }
  async getMessageByConversation(args) {
    try {
      const { conversationId } = args;
      return await Message.find({ conversationId }, { text: 1, createdAt: 1, _id: 1 })
    }
    catch(err) {
      logger.error('add messager error: ', err)
      return { responseCode: status.SERVICE_UNAVAILABLE }
    }
  }
}

const messageService = new MessageService();
module.exports = messageService;
