import { type BlogPageData } from '../../../lib/types.js'
import { blogs } from '../../../lib/server/blog.js'

export const load = async ({ params }): Promise<BlogPageData> => {

    return {
        date: params.date,
        md: blogs[`${params.date}.html`] || null
    }
}