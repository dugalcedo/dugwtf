import { createCorsOptionsHandler } from "../../../../lib/server/cors.js"
import { NeodugComment, NeodugCommentbox, useNeodugDb } from "../../../../lib/server/neodugDb.js"
import { defineDugwtfRequestHandler, getUserFromEvt } from "../../../../lib/server/requestHandling.js"

export const OPTIONS = createCorsOptionsHandler()

type RegisterCommentboxBody = {
    name: string
}
export const POST = defineDugwtfRequestHandler(async (evt) => {
    const user = await getUserFromEvt(evt)
    const body: RegisterCommentboxBody = await evt.request.json()

    const existingCommentBox = await NeodugCommentbox.findOne({
        user_id: user._id
    })

    if (existingCommentBox) throw {
        status: 400,
        message: `You can only have one comment box.`
    }

    const newCommentBox = await NeodugCommentbox.create({
        name: body.name,
        user_id: user._id
    })

    user.commentboxes.push(newCommentBox._id)
    await user.save()

    return {
        message: "Commentbox registered",
        data: newCommentBox.toJSON()
    }
})

export const GET = defineDugwtfRequestHandler(async (evt) => {
    const name = new URL(evt.url).searchParams.get('name')

    if (!name) throw {
        status: 400,
        message: "Missing name parameter"
    }

    const commentbox = await NeodugCommentbox.findOne({ name })

    if (!commentbox) throw {
        status: 404,
        message: `No comment box found with name ${name}`
    }

    const comments = await NeodugComment.find({ commentbox_id: commentbox._id })

    return {
        message: "Commentbox retrieved",
        data: {
            _id: commentbox._id,
            comments: comments.map(c => ({
                _id: c._id,
                author: c.author,
                body: c.body,
                date: c.date.toString()
            }))
        }
    }
    
})