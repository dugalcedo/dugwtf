const map: Record<string, string> = {
    a: 'æ',
    A: 'ɛ͡i',
    b: 'b',
    c: 't͡ʃ',
    d: 'd',
    D: 'ð',
    e: 'ɛ',
    E: 'iː',
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
    p: 'p',
    q: 'iŋ',
    r: 'ɹ̈',
    R: 'ɚ',
    s: 's',
    S: 'ʃ',
    t: 't',
    T: 'θ',
    u: 'ɐ',
    U: 'ɵː',
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
    for (let i = 0; i < duglish.length; i++) {
        result += map[duglish[i]] || duglish[i]
    }
    return result
}
