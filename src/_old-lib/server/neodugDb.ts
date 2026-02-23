import dotenv from 'dotenv'; dotenv.config()
import validator from 'validator'
import jwt from 'jsonwebtoken'
import mongoose, { Schema, model, Types, type HydratedDocument, type Mongoose } from "mongoose";
import nodemailer from 'nodemailer'

///////// USER

export interface NeodugUserInterface {
    _id: Types.ObjectId
    username: string
    email: string
    password: string
    verified: boolean
    commentboxes: Types.ObjectId[]
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
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [{
            message: "Invalid email.",
            validator: (v: string) => {
                return validator.isEmail(v)
            }
        }]
    },
    verified: {
        type: Boolean,
        required: true,
        default: false
    },
    password: {
        type: String,
        required: true
    },
    commentboxes: {
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
    banned_ips?: string[]
    comments_require_approval?: boolean
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
        unique: true,
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
    },
    banned_ips: {
        type: [String],
        required: true,
        default: []
    },
    comments_require_approval: {
        type: Boolean,
        required: true,
        default: false
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
    date: Date
    ip?: string
    approved?: boolean
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
    },
    date: {
        type: Date,
        required: true
    },
    ip: {
        type: String,
        required: true,
        default: ""
    },
    approved: {
        type: Boolean,
        required: true,
        default: false
    }
})

export const NeodugComment = model<NeodugCommentInterface>('comment', NeodugCommentSchema, 'comments')
export type NeodugCommentType = HydratedDocument<NeodugCommentInterface>

////// EMAILVERIFICATION

export interface NeodugEmailVerificationInterface {
    _id: Types.ObjectId
    email: string
    lastEmail?: Date
}

const NeodugEmailVerificationSchema = new Schema<NeodugEmailVerificationInterface>({
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [{
            message: "Invalid email.",
            validator: (v: string) => {
                return validator.isEmail(v)
            }
        }]
    },
    lastEmail: {
        type: Date
    }
})

export const NeodugEmailVerification = model<NeodugEmailVerificationInterface>('emailverification', NeodugEmailVerificationSchema, 'emailverifications')
export type NeodugEmailVerificationType = HydratedDocument<NeodugEmailVerificationInterface>

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

/////// EMAIL

export async function sendVerificationEmail(ev: NeodugEmailVerificationType) {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        console.log("MISSING ENV VARS FOR NODEMAILER")
        throw { status: 503, message: "Database down." }
    }

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    })

    await transporter.sendMail({
        from: `"Dug Alcedo from dug.wtf" <${process.env.EMAIL_USER}>`,
        to: ev.email,
        subject: "Verify your email for dug.wtf",
        html: `
            <h2>Dug.wtf</h2>
            <a href="${process.env.URL || "https://dug.wtf"}/neo/verify/${ev._id}">
                Click here to verify your email address.
            </a>
        `
    })

    ev.lastEmail = new Date()
    await ev.save()
}


/////// HELPERS

export const createNeodugUserDTO = (user: NeodugUserType) => {
    return {
        _id: user._id.toString(),
        username: user.username,
        commentBoxIds: user.commentboxes.map(cb => cb._id.toString())
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
        email: user.email as string,
        verified: user.verified as boolean,
        commentboxes: user.commentboxes.map((cb: any) => {
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