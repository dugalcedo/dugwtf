const SENTENCE_END_RE = /[.!?§]/

function tokenize(text: string): Array<{ type: 'word' | 'gap'; value: string }> {
    const tokens: Array<{ type: 'word' | 'gap'; value: string }> = []
    let i = 0
    while (i < text.length) {
        const wordMatch = text.slice(i).match(/^[a-zA-Z0-9\u00C0-\u017F]+/)
        if (wordMatch) {
            tokens.push({ type: 'word', value: wordMatch[0] })
            i += wordMatch[0].length
        } else {
            const gapMatch = text.slice(i).match(/^[^a-zA-Z0-9\u00C0-\u017F]+/)!
            tokens.push({ type: 'gap', value: gapMatch[0] })
            i += gapMatch[0].length
        }
    }
    return tokens
}

export function makeMoreReadable(el: HTMLElement): void {
    const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT)
    const textNodes: Text[] = []
    let node: Text | null
    while ((node = walker.nextNode() as Text | null)) {
        if (node.textContent && node.textContent.trim().length > 0) {
            textNodes.push(node)
        }
    }

    type FlatNode = { node: HTMLSpanElement | Text; isWord: boolean }
    const allNodes: FlatNode[] = []
    const sentenceBoundaryAfter = new Set<number>()

    for (const textNode of textNodes) {
        const tokens = tokenize(textNode.textContent ?? '')
        const replacements: (HTMLSpanElement | Text)[] = []

        for (let ti = 0; ti < tokens.length; ti++) {
            const token = tokens[ti]

            if (token.type === 'gap') {
                // Remove § characters from the gap text
                const cleanedValue = token.value.replace(/§/g, '')
                
                if (cleanedValue.length > 0) {
                    const gapText = document.createTextNode(cleanedValue)
                    replacements.push(gapText)
                    allNodes.push({ node: gapText, isWord: false })
                }

                // Check if this gap contains sentence-ending punctuation
                if (SENTENCE_END_RE.test(token.value)) {
                    const punctIndex = token.value.search(SENTENCE_END_RE)
                    const afterPunct = token.value.slice(punctIndex + 1)
                    // Mark boundary if there's whitespace after punctuation, 
                    // it's a § character, or we're at the end of tokens
                    if (/\s/.test(afterPunct) || token.value.includes('§') || ti === tokens.length - 1) {
                        // Only add boundary if we have nodes to reference
                        if (allNodes.length > 0) {
                            sentenceBoundaryAfter.add(allNodes.length - 1)
                        }
                    }
                }
            } else {
                const span = document.createElement('span')
                span.textContent = token.value
                replacements.push(span)
                allNodes.push({ node: span, isWord: true })
            }
        }

        const parent = textNode.parentNode!
        for (const replacement of replacements) {
            parent.insertBefore(replacement, textNode)
        }
        parent.removeChild(textNode)
    }

    const sentences: HTMLSpanElement[][] = []
    let currentWordSpans: HTMLSpanElement[] = []

    for (let i = 0; i < allNodes.length; i++) {
        const { node, isWord } = allNodes[i]

        if (isWord) {
            currentWordSpans.push(node as HTMLSpanElement)
        }

        const isLastNode = i === allNodes.length - 1
        if (sentenceBoundaryAfter.has(i) || isLastNode) {
            if (currentWordSpans.length > 0) {
                sentences.push(currentWordSpans)
                currentWordSpans = []
            }
        }
    }

    for (const wordSpans of sentences) {
        const wordCount = wordSpans.length

        wordSpans.forEach((span, wordIndex) => {
            if (wordIndex === 0) {
                span.style.fontWeight = 'bold'
                span.style.fontSize = '1.1em'
                span.style.lineHeight = '1em'
            } else if (wordCount > 4) {
                const wordsFromEnd = wordCount - wordIndex
                if (wordsFromEnd <= 4) {
                    const opacity = 0.6 + ((wordsFromEnd - 1) * 0.1)
                    const fontSize = 0.9 + ((wordsFromEnd - 1) * 0.025)
                    span.style.opacity = String(opacity)
                    span.style.fontSize = fontSize+"em"
                }
            }
        })
    }
}