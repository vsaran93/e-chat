const Conversation = require("../models/conversation.model");
class ConversationService {
  async create(details) {
    const conversation = new Conversation(details);
    return await conversation.save();
  }
}

const conversationService = new ConversationService();
module.exports = conversationService;
