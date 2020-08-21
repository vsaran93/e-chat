const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const bodyParser = require("body-parser");
const { port } = require("./config/vars");
const mongoose = require("./config/mongoose");
const routes = require("./routes");
const cors = require("cors");
const verifyUser = require('./src/middlewares/verifyUser');

mongoose.connect();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
app.use(cors());
app.get("/", (req, res) => {
  res.send("server is up !");
});
app.use("/v1/api", routes);

let connectedUsers = [];
io.use(async (socket, next) => {
  let token = socket.handshake.query.token;
  let validateUser = await verifyUser(token)
  if (validateUser.auth) {
    connectedUsers.push({socketId: socket.id, userId: validateUser.user._id});
    return next();
  }
  return next(new Error("invalid token...!"));
});

io.on("connection", (socket) => {
  console.log("a user connected.....!", connectedUsers);
});

http.listen(port, () => {
  console.log(`app is running on http://localhost:${port}`);
});
