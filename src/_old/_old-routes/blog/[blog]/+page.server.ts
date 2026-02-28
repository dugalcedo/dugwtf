import { type BlogPageData } from '../../../_old-lib/types.js'
import { blogs, extractDateAndTitle } from '../../../_old-lib/server/blog.js'

export const load = async ({ params }): Promise<BlogPageData> => {

    const [date] = extractDateAndTitle(params.blog)

    return {
        blog: blogs[date] || null
    }
}