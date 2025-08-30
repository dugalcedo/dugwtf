import dotenv from 'dotenv'; dotenv.config()
import validator from 'validator'
import jwt from 'jsonwebtoken'
import mongoose, { Schema, model, Types, type HydratedDocument, type Mongoose } from "mongoose";

///////// USER

export interface NeodugUserInterface {
    _id: Types.ObjectId
    username: string
    password: string
    commentBoxes: Types.ObjectId[]
}

const NeodugUserSchema = new Schema<NeodugUserInterface>({
    username: {
        type: String,
        required: true,
        unique: true,
        minLength: 3,
        maxlength: 50,
        validate: [{
            message: "Username must be alphanumeric.",
            validator: (v: string) => {
                return validator.isAlphanumeric(v)
            }
        }]
    },
    password: {
        type: String,
        required: true
    },
    commentBoxes: {
        type: [Schema.Types.ObjectId],
        required: true,
        default: [],
        ref: 'commentbox'
    }
})

export const NeodugUser = model<NeodugUserInterface>('user', NeodugUserSchema, 'users')
export type NeodugUserType = HydratedDocument<NeodugUserInterface>

///////// COMMENTBOX

export interface NeodugCommentboxInterface {
    _id: Types.ObjectId
    user_id: Types.ObjectId
    name: string
    comments: Types.ObjectId[]
}


const NeodugCommentboxSchema = new Schema<NeodugCommentboxInterface>({
    user_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    },
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50,
        validate: [{
            message: "Username must be alphanumeric.",
            validator: (v: string) => {
                return validator.isAlphanumeric(v)
            }
        }]
    },
    comments: {
        type: [Schema.Types.ObjectId],
        required: true,
        default: [],
        ref: 'comment'
    }
})

export const NeodugCommentbox = model<NeodugCommentboxInterface>('commentbox', NeodugCommentboxSchema, 'commentboxes')
export type NeodugCommentboxType = HydratedDocument<NeodugCommentboxInterface>

///// COMMENT

export interface NeodugCommentInterface {
    _id: Types.ObjectId
    author: string
    body: string
    commentbox_id: Types.ObjectId
}

const NeodugCommentSchema = new Schema<NeodugCommentInterface>({
    author: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 32
    },
    body: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 300
    },
    commentbox_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'commentbox'
    }
})

export const NeodugComment = model<NeodugCommentInterface>('comment', NeodugCommentSchema, 'comments')
export type NeodugCommentType = HydratedDocument<NeodugCommentInterface>

//////// CONNECTION

let connection: Mongoose
export async function useNeodugDb() {
    if (connection) return connection
    try {
        if (!process.env.NEODUG_CONN_STR) {
            console.log("MISSING ENVIRONMENT VARIABLE: NEODUG_CONN_STR")
            throw { status: 503, message: "Database down." }
        }
        connection = await mongoose.connect(process.env.NEODUG_CONN_STR)
        return connection
    } catch (error) {
        if ((error as any)?.status === 503) throw error;
        console.log("DATABASE DOWN", error)
        throw { status: 503, message: "Database down." }
    }
}

/////// HELPERS

export const createNeodugUserDTO = (user: NeodugUserType) => {
    return {
        _id: user._id.toString(),
        username: user.username,
        commentBoxIds: user.commentBoxes.map(cb => cb._id.toString())
    }
}

export const createNeodugUserToken = (user: NeodugUserType) => {
    if (!process.env.JWT_SECRET) {
        console.log("MISSING ENVIRONMENT VARIABLE: JWT_SECRET")
        throw { status: 503, message: "Database down." }
    }

    return jwt.sign(user._id.toString(), process.env.JWT_SECRET)
}

export const parseNeodugUserToken = (token: string): string => {
    if (!process.env.JWT_SECRET) {
        console.log("MISSING ENVIRONMENT VARIABLE: JWT_SECRET")
        throw { status: 503, message: "Database down." }
    }

    try {
        const id = jwt.verify(token, process.env.JWT_SECRET)
        if (typeof id !== 'string') throw { status: 400, message: "Weird token" }
        return id
    } catch (error) {
        console.log("FAILED PARSING TOKEN:", error)
        throw { status: 400, message: "Broken token" }
    }
}

export const createNeodugUserDTO_POPULATED = (user: any) => {
    
    return {
        _id: user._id.toString(),
        username: user.username as string,
        commentBoxes: user.commentBoxes.map((cb: any) => {
            return {
                _id: cb._id.toString(),
                name: cb.name as string,
                comments: cb.comments.map((c: any) => {
                    return {
                        _id: c._id.toString(),
                        author: c.author as string,
                        body: c.body as string
                    }
                })
            }
        })
    }
}