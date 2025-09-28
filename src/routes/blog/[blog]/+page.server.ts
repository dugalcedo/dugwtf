import { type BlogPageData } from '../../../lib/types.js'
import { blogs, extractDateAndTitle } from '../../../lib/server/blog.js'

export const load = async ({ params }): Promise<BlogPageData> => {

    const [date] = extractDateAndTitle(params.blog)

    return {
        blog: blogs[date] || null
    }
}