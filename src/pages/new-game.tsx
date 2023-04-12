import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import GameDeck from '../components/GameDeck';
import withPrivateRoute from '../components/withPrivateRoute';

let socket;
const NewGame = () => {

    const [player, setPlayer] = useState<Player>({ uid: '', username: '' });
    const [game, setGame] = useState<Game>({ players: [], rounds: [], uid: '' });


    useEffect(() => {
        socketInitializer();
        setPlayer({ uid: '001', username: localStorage.getItem('username') });
    }, []);

    const socketInitializer = async () => {
        await fetch("/api/socket");

        socket = io();
        socket.on('update-game-state', game => {
            setGame(game);
            console.log('in', game);
        })
    };

    useEffect(() => {
        if (player.username.length > 0 && socket === undefined) {
            setTimeout(() => socket.emit("join-to-game", player), 1000);
        }
    }, [player]);

    return <GameDeck game={ game } player={ player }/>;
};

export default withPrivateRoute(NewGame);