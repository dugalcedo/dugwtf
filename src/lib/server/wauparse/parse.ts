type WauBlock = {
    value: string
    hasSchwa: boolean
    hasOnset: boolean
    hasCoda: boolean
    isNonWau: boolean
    onsetChars?: string[]
    vowel?: string
    codaChars?: string[]
}

const VOWELS = "EioIOöUeaAuäx";
const CONSONANTS = "pbfvmwtdTDszSZcjnlkghyrq";
const WAU_CHARS = VOWELS + CONSONANTS;

function isVowel(char: string): boolean {
    return VOWELS.includes(char);
}

function isConsonant(char: string): boolean {
    return CONSONANTS.includes(char);
}

function isWauChar(char: string): boolean {
    return WAU_CHARS.includes(char);
}

function isWhitespace(char: string): boolean {
    return /^\s$/.test(char);
}

function parseWauString(str: string): WauBlock[] {
    const blocks: WauBlock[] = [];
    const vowelIndices: number[] = [];
    
    for (let i = 0; i < str.length; i++) {
        if (isVowel(str[i])) {
            vowelIndices.push(i);
        }
    }

    if (vowelIndices.length === 0) {
        return [{
            value: str,
            hasSchwa: false,
            hasOnset: true,
            hasCoda: false,
            isNonWau: false,
            onsetChars: str.split('')
        }];
    }

    let currentStart = 0;
    for (let v = 0; v < vowelIndices.length; v++) {
        const vIndex = vowelIndices[v];
        const onsetChars: string[] = [];
        for (let j = currentStart; j < vIndex; j++) {
            onsetChars.push(str[j]);
        }

        let codaEnd = vIndex;
        if (v < vowelIndices.length - 1) {
            const nextVIndex = vowelIndices[v + 1];
            const consonantsBetween = nextVIndex - vIndex - 1;
            if (consonantsBetween > 1) {
                codaEnd = vIndex + 1;
            } else {
                codaEnd = vIndex;
            }
        } else {
            codaEnd = str.length - 1;
        }

        const value = str.substring(currentStart, codaEnd + 1);
        const vowelChar = str[vIndex];
        const codaChars: string[] = [];
        for (let j = vIndex + 1; j <= codaEnd; j++) {
            codaChars.push(str[j]);
        }

        blocks.push({
            value,
            hasSchwa: vowelChar === 'x',
            hasOnset: onsetChars.length > 0,
            hasCoda: codaChars.length > 0,
            isNonWau: false,
            onsetChars: onsetChars.length > 0 ? onsetChars : undefined,
            vowel: vowelChar,
            codaChars: codaChars.length > 0 ? codaChars : undefined
        });

        currentStart = codaEnd + 1;
    }

    return blocks;
}

export const parseWau = (input: string): WauBlock[] => {
    const blocks: WauBlock[] = [];
    let i = 0;
    const length = input.length;

    while (i < length) {
        if (input[i] === '§') {
            const endEscape = input.indexOf('½', i + 1);
            if (endEscape === -1) {
                i++;
            } else {
                const escapedText = input.substring(i + 1, endEscape);
                blocks.push({
                    value: escapedText,
                    hasSchwa: false,
                    hasOnset: false,
                    hasCoda: false,
                    isNonWau: true
                });
                i = endEscape + 1;
            }
        } else if (!isWauChar(input[i])) {
            let nonWauStr = '';
            while (i < length && !isWauChar(input[i]) && input[i] !== '§') {
                nonWauStr += input[i];
                i++;
            }
            if (nonWauStr) {
                blocks.push({
                    value: nonWauStr,
                    hasSchwa: false,
                    hasOnset: false,
                    hasCoda: false,
                    isNonWau: true
                });
            }
        } else {
            let wauStr = '';
            while (i < length && isWauChar(input[i]) && input[i] !== '§') {
                wauStr += input[i];
                i++;
            }
            if (wauStr) {
                const syllableBlocks = parseWauString(wauStr);
                blocks.push(...syllableBlocks);
            }
        }
    }

    return blocks;
};

