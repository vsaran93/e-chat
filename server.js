const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const port = 3007;

app.get("/", (req, res) => {
  res.send("server is up !");
});

io.on("connection", (socket) => {
  console.log("a user connected.....!");
});

http.listen(port, () => {
  console.log(`app is running on http://localhost:${port}`);
});
