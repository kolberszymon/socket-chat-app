export default (io, socket) => {
  const updateGame = (msg) => {
    console.log(socket.id, ' : ', msg);
    socket.broadcast.emit("inGameState", msg);
  };

  const createdMessage = (msg) => {
    socket.broadcast.emit("newIncomingMessage", msg);
  };

  socket.on("updateGameState", updateGame);
  socket.on("createdMessage", createdMessage);
};
