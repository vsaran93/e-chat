const userService = require("../services/user.service");
const conversationService = require("../services/conversation.service");
const status = require("http-status");

module.exports.register = async function (req, res) {
  const user = await userService.register(req.body);
  switch (user.responseCode) {
    case status.BAD_REQUEST:
      res.status(400);
      res.json({ msg: user.msg });
      break;
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

module.exports.login = async function (req, res) {
  const user = await userService.login(req.body);
  switch (user.responseCode) {
    case status.NOT_FOUND:
      res.status(404);
      res.json({ msg: user.msg });
      break;
    case status.BAD_REQUEST:
      res.status(400);
      res.json({ msg: user.msg });
      break;
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

module.exports.getAllUers = async function (req, res) {
  const user = await userService.getAllUsers();
  switch (user) {
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

module.exports.getAllUerConversation = async function (req, res) {
  console.log('check user id', req.userId)
  const user = await conversationService.getConversationByUserId(
    req.userId
  );
  switch (user) {
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