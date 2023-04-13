export const DESC_CARD_COUNT = {
    a: 10,
    b: 2,
    c: 2,
    d: 4,
    e: 12,
    f: 2,
    g: 4,
    h: 2,
    i: 8,
    j: 2,
    k: 2,
    l: 4,
    m: 2,
    n: 6,
    o: 8,
    p: 2,
    q: 2,
    r: 6,
    s: 4,
    t: 6,
    u: 6,
    v: 2,
    w: 2,
    x: 2,
    y: 4,
    z: 2,
    '!': 2,
    '@': 2,
    '#': 2,
    '$': 2,
    '%': 2
}

export const WORD_SCORES = {
    a: 2,
    b: 8,
    c: 5,
    d: 2,
    e: 2,
    f: 6,
    g: 6,
    h: 7,
    i: 2,
    j: 13,
    k: 8,
    l: 3,
    m: 5,
    n: 5,
    o: 2,
    p: 6,
    q: 15,
    r: 5,
    s: 3,
    t: 3,
    u: 4,
    v: 11,
    w: 10,
    x: 12,
    y: 4,
    z: 14,
    er: 7,
    cl: 10,
    in: 7,
    th: 9,
    qu: 9,
    '!': 7,
    '@': 10,
    '#': 7,
    '$': 9,
    '%': 9
}

export const DOUBLE_LETTER_PLACEHOLDERS = {
    er: '!',
    cl: '@',
    in: '#',
    th: '$',
    qu: '%'
}
export const PLACEHOLDER_DOUBLE_LETTERS = {
    '@': 'cl',
    '!': 'er',
    '#': 'in',
    '$': 'th',
    '%': 'qu'
}

export function convertPlaceHoldersToDoubleLetters(cards) {
    let wordWithoutPlaceholders = ''

    for (const letter of word) {
        if (letter in PLACEHOLDER_DOUBLE_LETTERS) {
            wordWithoutPlaceholders += PLACEHOLDER_DOUBLE_LETTERS[letter]
        }
        else {
            wordWithoutPlaceholders += letter
        }
    }

    return wordWithoutPlaceholders
}

export function convertDoubleLettersToPlaceholders(word) {
    let wordWithPlaceHolders = ''
    for (let i = 0; i < word.length; i++) {
        if (word[i] === '(') {
            const doubleLetter = word.substring(i + 1, word.indexOf(')', i))
            wordWithPlaceHolders += DOUBLE_LETTER_PLACEHOLDERS[doubleLetter]
            i = word.indexOf(')', i)
        }
        else {
            wordWithPlaceHolders += word[i]
        }
    }

    return wordWithPlaceHolders
}

export function getRandomCard(n = 1) {
    const desc = getDesc();
    const result = [];
    const getRandomValue = () => {
        const randomIndex = Math.floor((Math.random() * desc.length));
        let value = desc[randomIndex];
        desc.splice(1, randomIndex);
        if (value in PLACEHOLDER_DOUBLE_LETTERS) {
            value = PLACEHOLDER_DOUBLE_LETTERS[value];
        }
        return value;
    }
    for (let i = 0; i < n; i++) {
        result.push({
            id: Math.floor(Math.random() * 10000),
            value: getRandomValue()
        });
    }
    return result;
}

export function getDesc() {
    let desc = [];
    Object.keys(DESC_CARD_COUNT).forEach((cardValue,i) => {
        for (let count = 0; count < DESC_CARD_COUNT[cardValue]; count++) {
            desc.push(cardValue)
        }
    });
    return desc;
}
