const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const bodyParser = require('body-parser');
const { port } = require("./config/vars");
const mongoose = require("./config/mongoose");
const routes = require("./routes");

mongoose.connect();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json());
app.get("/", (req, res) => {
  res.send("server is up !");
});
app.use("/api/v1", routes);
io.on("connection", (socket) => {
  console.log("a user connected.....!");
});

http.listen(port, () => {
  console.log(`app is running on http://localhost:${port}`);
});
