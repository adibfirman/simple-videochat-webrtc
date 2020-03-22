import Peer from "simple-peer";
import io from "socket.io-client";

const socket = io("https://secret-everglades-14227.herokuapp.com");
const video = document.querySelector("video");
const client = {};

(async () => {
  const stream = await navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true
  });

  /** socket.io evnets */
  socket.emit("NewClient");
  socket.on("CreatePeer", makePeer);
  socket.on("BackOffer", frontAnswer);
  socket.on("BackAnswer", signalAnswer);
  socket.on("Disconnect", removePeer);

  /** handle play video */
  video.srcObject = stream;
  video.play();

  function initPeer(type) {
    const initiator = type === "init";
    const peer = new Peer({ initiator, stream, trickle: false });

    peer.on("stream", stream => createVideo(stream));
    peer.on("close", function() {
      document.getElementById("peerVideo").remove();
      peer.destroy();
    });

    return peer;
  }

  function makePeer() {
    client.gotAnswer = false;
    let peer = initPeer("init");
    peer.on("signal", data => {
      if (!client.gotAnswer) socket.emit("Offer");
    });

    client.peer = peer;
  }

  function createVideo(stream) {
    const video = document.createElement("video");
    video.id = "peerVideo";
    video.srcObject = stream;
    document.body.appendChild(video);

    video.play();
  }

  function frontAnswer(offer) {
    let peer = initPeer("notInit");
    peer.on("signal", data => socket.emit("Answer", data));

    peer.signal(offer);
    client.peer = peer;
  }

  function signalAnswer(answer) {
    client.gotAnswer = true;
    let peer = client.peer;

    peer.signal(answer);
  }

  function removePeer() {
    document.getElementById("peerVideo").remove();

    if (client.peer) client.peer.destroy();
  }
})();
