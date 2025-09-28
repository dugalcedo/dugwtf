import { parseWau } from "./parseWau.js"

const map: Record<string, string> = {
    a: 'æ',
    A: 'ɛ͡i',
    ä: 'æ͡ɵ',
    å: 'ɔ',
    b: 'b',
    c: 't͡ʃ',
    d: 'd',
    D: 'ð',
    e: 'ɛ',
    E: 'i',
    f: 'f',
    g: 'g',
    G: 'ŋ',
    h: 'h',
    i: 'ɪ',
    I: 'ä͡i',
    j: 'd͡ʒ',
    k: 'k',
    l: 'l',
    L: 'ɫ',
    m: 'm',
    n: 'n',
    o: 'ä',
    O: 'ɐ͡ɵ',
    ö: 'o͡i',
    p: 'p',
    q: 'iŋ',
    r: 'ɹ̈',
    R: 'ɚ',
    s: 's',
    S: 'ʃ',
    t: 't',
    T: 'θ',
    u: 'ɐ',
    U: 'ɵ',
    v: 'v',
    w: 'w',
    y: 'j',
    x: 'ə',
    X: 'ɾ',
    z: 'z',
    Z: 'ʒ'
}


type MatchMonad = {
    match: boolean,
    value: string
}

const getMatchesAndNonMatches = (input: string, regExp: RegExp): MatchMonad[] => {
    const result: MatchMonad[] = [];
    let lastIndex = 0;
    let match;
    
    // Reset the regex to start from the beginning
    regExp.lastIndex = 0;
    
    while ((match = regExp.exec(input)) !== null) {
        // Add non-matching text before the current match
        if (match.index > lastIndex) {
            result.push({
                match: false,
                value: input.substring(lastIndex, match.index)
            });
        }
        
        // Add the current match
        result.push({
            match: true,
            value: match[0]
        });
        
        // Update lastIndex to the end of the current match
        lastIndex = match.index + match[0].length;
        
        // Handle zero-length matches to avoid infinite loops
        if (match[0].length === 0) {
            regExp.lastIndex++;
        }
    }
    
    // Add any remaining non-matching text after the last match
    if (lastIndex < input.length) {
        result.push({
            match: false,
            value: input.substring(lastIndex)
        });
    }
    
    return result;
}

const parseWhileIgnoring = (input: string, parser: (input: string) => string, reg: RegExp, sliceLength: number): string => {
    let result = ""
    const matchMonads = getMatchesAndNonMatches(input, reg)
    for (const { match, value } of matchMonads) {
        if (match) {
            // Should ignore
            const text = value.slice(sliceLength, -(sliceLength) || undefined)
            result += text
        } else {
            result += parser(value)
        }
    }
    return result
}

export const toDugIpa = (duglish: string) => {
    let result = ""
    let nonDugOpen = false

    for (let i = 0; i < duglish.length; i++) {
        const char = duglish[i]

        if (nonDugOpen) {
            if (char == '½') nonDugOpen = false;
            else result += char
            continue
        }

        if (char == '§') {
            nonDugOpen = true
            continue;
        }

        result += map[char] || char
    }

    return result
}

export const parseBlog = (input: string): string => {
    // find wau
    const wauRegExp = /\{\{wau\}\}(?:(?!\{\{\/wau\}\}).)*\{\{\/wau\}\}/gs;
    const wauMatches = [...input.matchAll(wauRegExp)]
    for (const wauMatch of wauMatches) {
        const original = wauMatch[0].trim()
        const trimmed = original.slice(7, -8)
        const parsed = parseWhileIgnoring(trimmed, parseWau, /<[^>]+>/gm, 0)
        input = input.replace(original, parsed)
    }

    const dugRegExp = /\{\{dugipa\}\}(?:(?!\{\{\/dugipa\}\}).)*\{\{\/dugipa\}\}/gs;
    const dugMatches = [...input.matchAll(dugRegExp)]
    for (const dugMatch of dugMatches) {
        const original = dugMatch[0].trim()
        const trimmed = original.slice(10, -11)
        const parsed = parseWhileIgnoring(trimmed, toDugIpa, /<[^>]+>/gm, 0)
        input = input.replace(original, parsed)
    }
    
    return input
}