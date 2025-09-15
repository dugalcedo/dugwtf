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
