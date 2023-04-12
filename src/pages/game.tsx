import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import { getRandomCart } from "../utils/cardsList"

let socket;

export default function CardGame() {
  const [start, setStart] = useState(false);
  const [player1Hand, setPlayer1Hand] = useState([]);
  const [player2Hand, setPlayer2Hand] = useState([]);
  const [table, setTable] = useState([]);

  useEffect(() => {
    socketInitializer();
  }, []);

  function randomCards() {
    const hand1 = getRandomCart(3);
    const hand2 = getRandomCart(3);
    const table = getRandomCart(3);
    setPlayer1Hand(hand1);
    setPlayer2Hand(hand2);
    setTable(table);
    socket.emit("updateGameState", { player1Hand: hand1, player2Hand: hand2, table: table });
  }

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
    event.dataTransfer.setData("hand", hand);
    event.dataTransfer.setData("card", JSON.stringify(card));
    event.currentTarget.style.opacity = .5;
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

    socket.emit("updateGameState", { player1Hand: updatedPlayer1Hand, player2Hand: updatedPlayer2Hand, table: updatedTable });

    setTable(() => [...updatedTable])
    setPlayer1Hand(() => [...updatedPlayer1Hand]);
    setPlayer2Hand(() => [...updatedPlayer2Hand]);
  };

  return (
    <div className="flex flex-col items-center p-4 mx-auto min-h-screen justify-center flex-wrap bg-purple-100">
      <h1 className="text-center">Game</h1>
      {!start && (<button className="bg-white rounded-md px-4 py-2 text-xl" onClick={() => {setStart(true);randomCards()}}>Start</button>)}
      {start && (
        <div className="desk border container mx-auto p-2 uppercase font-bold text-white">
          <div
            className="hand flex flex-row border-2 border-cyan-500 p-2"
            onDrop={(event) => handleDrop(event, "player1")}
            onDragOver={(event) => event.preventDefault()}
          >
            {player1Hand.map((card) => (
              <div
                key={card.id}
                className="card bg-purple-500 w-20 text-center p-4 m-1"
                draggable
                onDragStart={(event) => handleDragStart(event, card, "player1")}
                onDragEnd={(event) => event.currentTarget.style.opacity = '1'}
              >
                {card.value}
              </div>
            ))}
          </div>
          <div
            className="game-table flex flex-row border p-2 my-1 border-2 border-cyan-500"
            onDrop={(event) => handleDrop(event, "table")}
            onDragOver={(event) => event.preventDefault()}
          >
            {table.map((card) => (
              <div key={card.id}
                className="card bg-purple-500 w-20 text-center p-4 m-1"
                draggable
                onDragStart={(event) => handleDragStart(event, card, "table")}
                onDragEnd={(event) => event.currentTarget.style.opacity = '1'}
              >
                {card.value}
              </div>
            ))}
          </div>
          <div
            className="hand flex flex-row border-2 border-cyan-500 p-2"
            onDrop={(event) => handleDrop(event, "player2")}
            onDragOver={(event) => event.preventDefault()}
          >
            {player2Hand.map((card) => (
              <div
                key={card.id}
                className="card bg-purple-500 w-20 text-center p-4 m-1"
                draggable
                onDragStart={(event) => handleDragStart(event, card, "player2")}
                onDragEnd={(event) => event.currentTarget.style.opacity = '1'}
              >
                {card.value}
              </div>
            ))}
          </div>
        </div>)}
    </div>
  );
};
