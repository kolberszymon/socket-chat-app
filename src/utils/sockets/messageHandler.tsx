const game: Game = { players: [], rounds: [], uid: 'ggg' };
export default (io, socket) => {
    const updateGame = (msg) => {
        // console.log('updateGame', socket.id, ' : ', msg);
        socket.broadcast.emit("inGameState", msg);
    };

    const createdMessage = (msg) => {
        socket.broadcast.emit("newIncomingMessage", msg);
    };

    socket.on("updateGameState", updateGame);
    socket.on("createdMessage", createdMessage);

    socket.on("join-to-game", (msg) => {
        console.log('Joined new player: %s', msg);
        // socket.broadcast.emit('update-game-state', {
        //     ...game,
        //     players: [...game.players, player]
        // })
    })
};
