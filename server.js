const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const port = 5000;

let clients = 0;

io.on("connection", socket => {
  socket.on("NewClient", () => {
    if (clients < 2) {
      if (clients === 1) this.emit("CreatePeer");
    } else this.emit("SessionActive");
  });

  socket.on("Offer", sendOffer);
  socket.on("Answer", sendAnswer);
  socket.on("disconnect", disconnect);
});

function sendOffer(data) {
  this.broadcast.emit("BackAnswer", data);
}

function sendAnswer(data) {
  this.broadcast.emit("BackAnswer", data);
}

function disconnect() {
  if (clients > 0) {
    if (clients <= 2) this.broadcast.emit("Disconnect");
    clients--;
  }
}

app.get("/", (req, res) => {
  res.send("Welcome to a basic express App");
});

http.listen(port, () => console.log(`Active on ${port} port`));
