const userService = require("../services/user.service");
const status = require("http-status");

module.exports.register = async function (req, res) {
  const user = await userService.register(req.body);
  switch (user.responseCode) {
    case status.BAD_REQUEST:
      res.status(400);
      res.json({ msg: user.msg });
    case status.SERVICE_UNAVAILABLE:
      res.status(500);
      res.json({ msg: "something went wrong" });
    default:
      res.status(200);
      res.json({ data: user });
  }
};

module.exports.login = async function (req, res) {
  const user = await userService.login(req.body);
  switch (user.responseCode) {
    case status.NOT_FOUND:
      res.status(404);
      res.json({ msg: user.msg });
    case status.BAD_REQUEST:
      res.status(400);
      res.json({ msg: user.msg });
    case status.SERVICE_UNAVAILABLE:
      res.status(500);
      res.json({ msg: "something went wrong" });
    default:
      res.status(200);
      res.json({ data: user });
  }
};