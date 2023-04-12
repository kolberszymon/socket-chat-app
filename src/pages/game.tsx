import React, { useState, useEffect } from "react";
import io from "socket.io-client";

let socket;

export default function CardGame() {
  const [player1Hand, setPlayer1Hand] = useState([{ id: 4, value: 'V' }, { id: 5, value: 'K' }, { id: 7, value: 'G' }]);
  const [player2Hand, setPlayer2Hand] = useState([{ id: 1, value: 'D' }, { id: 2, value: 'E' }, { id: 3, value: 'F' }]);
  const [table, setTable] = useState([{ id: 6, value: 'A' }, { id: 9, value: 'B' }, { id: 8, value: 'C' }]);

  useEffect(() => {
    socketInitializer();
  }, []);

  const socketInitializer = async () => {
    // We just call it because we don't need anything else out of it
    await fetch("/api/socket");

    socket = io();

    socket.on("inGameState", ({ player1Hand, player2Hand, table }) => {
      setPlayer1Hand(player1Hand);
      setPlayer2Hand(player2Hand);
      setTable(table);
      console.log('in', { player1Hand, player2Hand, table });
    });
  };

  const handleDragStart = (event, card, hand) => {
    event.dataTransfer.setData("card", JSON.stringify(card));
    event.dataTransfer.setData("hand", hand);
  };

  const handleDrop = (event, hand) => {
    event.preventDefault();
    const card = JSON.parse(event.dataTransfer.getData("card"));
    const sourceHand = event.dataTransfer.getData("hand");

    let updatedPlayer1Hand = [...player1Hand];
    let updatedPlayer2Hand = [...player2Hand];
    let updatedTable = [...table];

    // remove card
    if (sourceHand === "table") {
      updatedTable = updatedTable.filter((c) => c.id !== card.id);
    }
    if (sourceHand === "player1") {
      updatedPlayer1Hand = updatedPlayer1Hand.filter((c) => c.id !== card.id);
    }
    if (sourceHand === "player2") {
      updatedPlayer2Hand = updatedPlayer2Hand.filter((c) => c.id !== card.id);
    }
    // add card
    if (hand === "table") {
      updatedTable.push(card);
    }
    if (hand === "player1") {
      updatedPlayer1Hand.push(card);
    }
    if (hand === "player2") {
      updatedPlayer2Hand.push(card);
    }

    socket.emit("updateGameState", { player1Hand:updatedPlayer1Hand, player2Hand:updatedPlayer2Hand, table:updatedTable });

    setTable(() => [...updatedTable])
    setPlayer1Hand(() => [...updatedPlayer1Hand]);
    setPlayer2Hand(() => [...updatedPlayer2Hand]);
  };

  return (
    <div>
      <h1 className="text-center">Game</h1>
      <div className="desk border container mx-auto p-2">
        <div
          className="hand flex flex-row border p-2"
          onDrop={(event) => handleDrop(event, "player1")}
          onDragOver={(event) => event.preventDefault()}
        >
          {player1Hand.map((card) => (
            <div
              key={card.id}
              className="card bg-neutral-200 p-4 m-1 border"
              draggable
              onDragStart={(event) => handleDragStart(event, card, "player1")}
            >
              {card.value}
            </div>
          ))}
        </div>
        <div
          className="game-table flex flex-row border p-2 my-1"
          onDrop={(event) => handleDrop(event, "table")}
          onDragOver={(event) => event.preventDefault()}
        >
          {table.map((card) => (
            <div key={card.id}
              className="card bg-neutral-200 p-4 m-1 border"
              draggable
              onDragStart={(event) => handleDragStart(event, card, "table")}
            >
              {card.value}
            </div>
          ))}
        </div>
        <div
          className="hand flex flex-row border p-2"
          onDrop={(event) => handleDrop(event, "player2")}
          onDragOver={(event) => event.preventDefault()}
        >
          {player2Hand.map((card) => (
            <div
              key={card.id}
              className="card bg-neutral-200 p-4 m-1 border"
              draggable
              onDragStart={(event) => handleDragStart(event, card, "player2")}
            >
              {card.value}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
