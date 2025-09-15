const posts = import.meta.glob('./blog/*.md', { query: '?raw', import: 'default' })
import { toDugIpa } from './dugipa.js'
import showdown from 'showdown'
const mdConverter = new showdown.Converter()

export const blogs: Record<string, string> = {}
export const dates: string[] = []

for (const pathName in posts) {
    const post = await posts[pathName]() as string
    const fileName = pathName.replace('./blog/','')
    blogs[fileName] = mdConverter.makeHtml(toDugIpa(post))    
    dates.push(fileName.replace('.md', ''))
}

dates.sort((a, b) => new Date(b).getTime() - new Date(a).getTime())