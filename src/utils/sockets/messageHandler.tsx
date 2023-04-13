export default (io, socket) => {
  const updateGame = (msg) => {
    //console.log(socket.id, ' : ', msg); 
    msg.id = socket.id;
    socket.broadcast.emit("inGameState", msg);
  };

  const createdMessage = (msg) => {
    socket.broadcast.emit("newIncomingMessage", msg);
  };

  socket.on("updateGameState", updateGame);
  socket.on("createdMessage", createdMessage);
};
