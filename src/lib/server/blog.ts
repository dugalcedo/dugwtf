import fs from 'fs/promises'
import { toDugIpa } from './dugipa.js'

import showdown from 'showdown'
const mdConverter = new showdown.Converter()

const blogDir = await fs.readdir('./blog')
export const blogs: Record<string, string> = {}

for (const file of blogDir) {
    try {
        const ipa = toDugIpa(await fs.readFile(`./blog/${file}`, 'utf-8'))
        blogs[file] = mdConverter.makeHtml(ipa)
    } catch {}
}

