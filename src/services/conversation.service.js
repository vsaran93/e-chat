const mongoose = require('mongoose');
const Conversation = require("../models/conversation.model");
class ConversationService {
  async create(details) {
    const conversation = new Conversation(details);
    return await conversation.save();
  }
  async getConversationByUserId(id) {
    try {
      return await Conversation.aggregate([
        {
          $lookup: {
            from: 'users',
            let: { userId: "$from" },
            pipeline: [
              { $match: { $expr: { $eq: [ "$_id", "$$userId" ] } } },
              { $project: { firstName: 1, lastName: 1 } }
            ],
            as: 'sender'
          }
        },
        {
          $lookup: {
            from: 'users',
            let: { userId: "$to" },
            pipeline: [
              { $match: { $expr: { $eq: [ '$_id', "$$userId" ] } } },
              { $project: { firstName: 1, lastName: 1 } }
            ],
            as: 'receiver'
          }
        },
        {
          $match: {
              $or: [
                { from: mongoose.Types.ObjectId(id) },
                { to: mongoose.Types.ObjectId(id) }
              ]
          }
        },
        {
          $project: {
            sender: 1,
            receiver: 1,
          }
        }
      ])
    }
    catch(err) {
      console.log('error', err)
    }
  }
}

const conversationService = new ConversationService();
module.exports = conversationService;
