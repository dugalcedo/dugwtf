import { parseWau } from "./parse.js";

export const toWauHTML = (input: string): string => {
    let html = ""
    const blocks = parseWau(input)
    for (const block of blocks) {
        // non-wau
        if (block.isNonWau) {
            html += `<span class="non-wau-block">${block.value}</span>`
            continue
        }

        let innerHTML = ""

        if (block.hasOnset) {
            innerHTML += `<span class="wau-block_onset">`
            innerHTML += block.onsetChars?.map(char => `<img src="/images/wau/${char.charCodeAt(0)}.png" />`).join('')
            innerHTML += `</span>`
        }

        if (block.vowel == 'x' && block.hasOnset && block.hasCoda) {
            // DO NOTHING
        } else if (block.vowel) {
            innerHTML += `<span class="wau-block_vowel"><img src="/images/wau/${block.vowel.charCodeAt(0)}.png" /></span>`
        }

        if (block.hasCoda) {
            innerHTML += `<span class="wau-block_coda">`
            innerHTML += block.codaChars?.map(char => `<img src="/images/wau/${char.charCodeAt(0)}.png" />`).join('')
            innerHTML += `</span>`
        }

        html += `<span class="wau-block">${innerHTML}</span>`
    }
    return html
}
