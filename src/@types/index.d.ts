type Card = {
    label: string;
    score: number;
}

type Deck = Array<Card>;

type Player = {
    uid: string;
    username: string;
}

type Round = {
    hands: { [key: string]: Deck }
    table: Deck;
    deck: Deck;
}

type Game = {
    uid: string;
    players: Array<Player>;
    rounds: Array<Round>;
}

type GamesList = Array<Game>