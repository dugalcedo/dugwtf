import { defineDugwtfRequestHandler } from "../../../lib/server/requestHandling.js"
import { blogs } from "../../../lib/server/blog.js"


export const GET = defineDugwtfRequestHandler(async (evt) => {
    const date = new URL(evt.url).searchParams.get('date')

    if (!date) throw {
        status: 400,
        message: 'Missing search param "date"'
    }

    const blog = blogs[date + '.md']

    if (!blog) throw {
        status: 404,
        message: 'Blog not found'
    }

    return {
        message: "Blog found",
        data: blog
    }
})