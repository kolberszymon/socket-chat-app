import React from "react";
import { WORD_SCORES } from "../utils/cardsList";

export default function LetterCard({ letter, isopen }) {
    const largeLetters = ['z', 'w', 't', 'm'];
    const score = WORD_SCORES[letter];
    return (
        <div className="flex flex-col justify-between h-52 w-36 bg-white rounded-sm text-black shadow-2xl m-1 px-1">
            {isopen ? (<>
            <div className="flex flex-col uppercase card-letter-font">
                <span className="text-2xl p-1 pb-0">{letter}</span>
                <span className="pl-1">{score}</span>
            </div>
            <span className={`text-center uppercase card-center-letter pt-6 pl-1 pr-1${letter.length === 2 ? ' card-center-letter--smaller' : ''}${largeLetters.includes(letter) ? ' card-center-letter--smallest' : ''}`}>
                {letter}
            </span>
            <div className="flex flex-col rotate-180 uppercase card-letter-font">
                <span className="text-2xl p-1 pb-0">{letter}</span>
                <span className="pl-1">{score}</span>
            </div>
            </>) : (
                <div className="closed-card"></div>
            )}
        </div>
    )
}