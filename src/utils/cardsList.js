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

export function getRandomCart(n = 1) {
    const letters = Object.keys(WORD_SCORES);
    const result = [];
    const getRandomValue = () => {
        let value = letters[Math.floor((Math.random() * letters.length))];
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
