const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const { port } = require("./config/vars");
const mongoose = require("./config/mongoose");
const routes = require("./routes");

mongoose.connect();

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
