import { createCorsOptionsHandler } from "../../../../lib/server/cors.js"
import { NeodugComment, NeodugCommentbox } from "../../../../lib/server/neodugDb.js"
import { defineDugwtfRequestHandler, getIP } from "../../../../lib/server/requestHandling.js"

export const OPTIONS = createCorsOptionsHandler()

type AddCommentBody = {
    commentboxName: string
    author: string
    body: string
}
export const POST = defineDugwtfRequestHandler(async (evt) => {
    const body: AddCommentBody = await evt.request.json()

    const commentbox = await NeodugCommentbox.findOne({ name: body.commentboxName })

    if (!commentbox) throw {
        status: 404,
        message: `No commentbox found with name "${body.commentboxName}"`
    }

    let comments = await NeodugComment.find({ commentbox_id: commentbox._id })
    comments.sort((a, b) => {
        return b.date.getTime() - a.date.getTime()
    })

    const newComment = await NeodugComment.create({
        commentbox_id: commentbox._id,
        author: body.author,
        body: body.body,
        date: new Date(),
        ip: getIP(evt)
    })

    if (comments.length > 100) {
        for (let i = 99; i < comments.length; i++) {
            await NeodugComment.findByIdAndDelete(comments[i]._id)
        }
    }

    return {
        message: "Comment added",
        data: {
            _id: newComment._id,
            author: newComment.author,
            body: newComment.body,
            date: newComment.date.toString()
        }
    }
})