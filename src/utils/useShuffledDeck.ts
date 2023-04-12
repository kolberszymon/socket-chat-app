import { useMemo } from 'react';

export const useDeck = (): Deck => {
    return useMemo((): Deck => {
        return [
            ...Array(10).fill({ label: 'A', score: 2 }),
            ...Array(2).fill({ label: 'B', score: 8 }),
            ...Array(2).fill({ label: 'C', score: 8 }),
            ...Array(4).fill({ label: 'D', score: 4 }),
            ...Array(12).fill({ label: 'E', score: 2 }),
            ...Array(2).fill({ label: 'F', score: 6 }),
            ...Array(4).fill({ label: 'G', score: 6 }),
            ...Array(2).fill({ label: 'H', score: 7 }),
            ...Array(8).fill({ label: 'I', score: 2 }),
            ...Array(2).fill({ label: 'J', score: 13 }),
            ...Array(2).fill({ label: 'K', score: 8 }),
            ...Array(4).fill({ label: 'L', score: 3 }),
            ...Array(2).fill({ label: 'M', score: 5 }),
            ...Array(6).fill({ label: 'N', score: 5 }),
            ...Array(8).fill({ label: 'O', score: 2 }),
            ...Array(2).fill({ label: 'P', score: 6 }),
            ...Array(2).fill({ label: 'Q', score: 15 }),
            ...Array(6).fill({ label: 'R', score: 5 }),
            ...Array(4).fill({ label: 'S', score: 3 }),
            ...Array(6).fill({ label: 'T', score: 3 }),
            ...Array(6).fill({ label: 'U', score: 4 }),
            ...Array(2).fill({ label: 'V', score: 11 }),
            ...Array(2).fill({ label: 'W', score: 10 }),
            ...Array(2).fill({ label: 'X', score: 12 }),
            ...Array(4).fill({ label: 'Y', score: 4 }),
            ...Array(2).fill({ label: 'Z', score: 14 }),
            ...Array(2).fill({ label: 'ER', score: 7 }),
            ...Array(2).fill({ label: 'CL', score: 10 }),
            ...Array(2).fill({ label: 'IN', score: 7 }),
            ...Array(2).fill({ label: 'TH', score: 9 }),
            ...Array(2).fill({ label: 'QU', score: 9 }),
        ]
    }, []);
}
export const useShuffledDeck = (): Array<Card> => {
    const deck = useDeck();

    return useMemo(() => deck.sort(() => Math.random() - 0.5), [ deck ]);
}