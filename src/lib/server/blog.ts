const posts = import.meta.glob('./blog/*.html', { query: '?raw', import: 'default' })
import { parseBlog } from './dugipa.js'
import { type Blog } from '../types.js'

export const blogs: Record<string, Blog> = {}
export const labels: string[] = []

export const extractDateAndTitle = (fileName: string): [string, string] => {
    return [
        fileName.slice(0, fileName.indexOf('_')),
        fileName.slice(fileName.indexOf('_')+1, fileName.indexOf('.'))
    ]
}

for (const pathName in posts) {
    const post = await posts[pathName]() as string
    const fileName = pathName.replace('./blog/','')
    const [date, title] = extractDateAndTitle(fileName)
    blogs[date] = {
        date,
        title,
        post: parseBlog(post)
    }
    labels.push(fileName.replace('.html',''))
}
