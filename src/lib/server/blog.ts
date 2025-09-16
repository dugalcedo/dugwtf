const posts = import.meta.glob('./blog/*.html', { query: '?raw', import: 'default' })
import { parseBlog } from './dugipa.js'

export const blogs: Record<string, string> = {}
export const dates: string[] = []

for (const pathName in posts) {
    const post = await posts[pathName]() as string
    const fileName = pathName.replace('./blog/','')
    blogs[fileName] = parseBlog(post)
    dates.push(fileName.replace('.html', ''))
}

dates.sort((a, b) => new Date(b).getTime() - new Date(a).getTime())