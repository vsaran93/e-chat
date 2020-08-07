const status = require("http-status");
const Message = require("../models/message.model");
const logger = require('../../config/logger');

const conversationService = require("./conversation.service");


class MessageService {
  async addMessgae(args) {
      const { userId, messageObject } = args;
      try {
        messageObject.from = userId;
        let conversationId = "";
        if (args.chatType === "new") {
          const conversation = await conversationService.create(messageObject);
          conversationId = conversation._id;
        } else {
          conversationId = args.conversationId;
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
}

const messageService = new MessageService();
module.exports = messageService;
