const status = require("http-status");

const messageService = require('../services/message.service');

module.exports.addMessage = async function (req, res) {
  const message = messageService.addMessgae({
      userId: req.userId,
      messageObject: req.body
  });
  switch (message.responseCode) {
    case status.SERVICE_UNAVAILABLE:
      res.status(500);
      res.json({ msg: "something went wrong" });
      break;
    default:
      res.status(200);
      res.json({ data: user });
      break;
  }
};
