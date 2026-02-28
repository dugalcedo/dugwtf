type ParseWauOptions = {
    fontSize: string
}

const onsets = new Set(['p', 'b', 'f', 'v', 'm', 'w', 't', 'd', 'T', 'D', 's', 'z', 'S', 'Z', 'c', 'j', 'n', 'l', 'k', 'g', 'h', 'y', 'r'])
const codas = new Set(['p', 'b', 'f', 'v', 'm', 'w', 't', 'd', 'T', 'D', 's', 'z', 'S', 'Z', 'c', 'j', 'n', 'l', 'k', 'g', 'r', 'q', 'Q'])
const standalones = new Set(['p', 'b', 'f', 'v', 'm', 'w', 't', 'd', 'T', 'D', 's', 'z', 'S', 'Z', 'c', 'j', 'n', 'l', 'k', 'g', 'h', 'y', 'r', 'q', 'Q'])
const vowels = new Set(['E', 'i', 'o', 'I', 'O', 'ö', 'U', 'e', 'a', 'A', 'u', 'ä', 'x'])
const modifiers = new Set(['$', '£'])

export const isWauSyllable = (str: string): boolean => {
    switch (str.length) {
        case 1:
            return modifiers.has(str) || standalones.has(str) || vowels.has(str);
        case 2:
            if (onsets.has(str[0])) return vowels.has(str[1]);
            if (vowels.has(str[0])) return codas.has(str[1]);
            return false; 
        case 3:
            if (onsets.has(str[0])) {
                return vowels.has(str[1]) && codas.has(str[2])
            }
            return false
        default:
            return false
    }
}

export const toCharCodesWithUnderscores = (str: string) => {
    return str.split('').map(char => char.charCodeAt(0)).join('_')
}


export const parseWau = (str: string): string => {
    let options: Record<string, any> = {};
    const optionsMatch = str.match(/\|\|\|.+\|\|\|/gm)
    const optionsStr = optionsMatch?.[0] || "";
    console.log(optionsStr)
    try {
        options = JSON.parse(optionsStr.replaceAll('|||',''))
        str = str.replace(optionsStr, '')
    } catch {}

    const fontSize = options.fontSize || "32px";

    // const wauSpace = `<span class="wau-space" style="min-width: calc(${fontSize} * 2);"></span>`;
    const wauSpace = ``;

    const words = str.trim().split(' ')
    words.forEach((word, i) => {
        let wordIsBold = false

        if (word.startsWith('B')) {
            wordIsBold = true
            word = word.slice(1)
        }

        const blocks = word.split('-')

        blocks.forEach((block, j) => {
            if (isWauSyllable(block)) {
                // wau syllable
                const fileName = toCharCodesWithUnderscores(block)
                const folder = wordIsBold ? 'waublocks_cropped_bold' : 'waublocks_cropped';
                blocks[j] = `<img class="wau" style="height: ${fontSize};" src="https://dugalcedo.github.io/wau/public/${folder}/${fileName}.svg">`
            } else {
                // non-wau syllbale
                blocks[j] = `<span class="wau-nonblock" style="font-size: calc(${fontSize});">${block}</span>`
            }
        })
        words[i] = `<span class="wau-word" style="display: inline-flex; height: ${fontSize}; gap: calc(${fontSize} / 5);">${blocks.join('')}</span>`
    })

    // STYLE
    let style = ""

    style += `font-size: ${fontSize};`
    style += `column-gap: calc(${fontSize} * 1.67);`
    style += `row-gap: calc(${fontSize} / 2);`

    return `<div class="wau-paragraph" style="${style}">${words.join(wauSpace)}</div>`
}