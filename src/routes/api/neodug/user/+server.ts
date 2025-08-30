import validator from "validator";
import bcrypt from 'bcryptjs'
import { cookieOptions, defineDugwtfRequestHandler } from "../../../../lib/server/requestHandling.js";
import { NeodugUser, useNeodugDb, createNeodugUserDTO, createNeodugUserToken, parseNeodugUserToken, createNeodugUserDTO_POPULATED } from "../../../../lib/server/neodugDb.js"

// REGISTER
type RegisterBody = {
    username: string
    password: string
}

export const POST = defineDugwtfRequestHandler(async (evt) => {
    await useNeodugDb()

    const body: RegisterBody = await evt.request.json()

    if (!validator.isStrongPassword(body.password)) throw {
        status: 400,
        message: "Password must be at least 8 characters and contain at least one of each: lowercase, uppercase, number, symbol"
    }

    body.password = await bcrypt.hash(body.password, 7)

    const newUser = await NeodugUser.create({
        username: body.username,
        password: body.password
    })

    const token = createNeodugUserToken(newUser)
    evt.cookies.set('neodugtoken', token, cookieOptions)

    return {
        message: "User registered.",
        data: {
            user: createNeodugUserDTO(newUser),
            token
        }
    }
})

// LOG IN
type LogInBody = {
    username: string
    password: string
}

export const PUT = defineDugwtfRequestHandler(async (evt) => {
    await useNeodugDb()

    const body: LogInBody = await evt.request.json()

    const foundUser = await NeodugUser.findOne({ username: body.username })

    if (!foundUser) throw {
        status: 404,
        message: "User not found"
    }

    const validPwd = await bcrypt.compare(body.password, foundUser.password)

    if (!validPwd) throw {
        status: 400,
        message: "Incorrect password"
    }

    const token = createNeodugUserToken(foundUser)
    evt.cookies.set('neodugtoken', token, cookieOptions)

    return {
        message: "Logged in successfully.",
        data: {
            user: createNeodugUserDTO(foundUser),
            token
        }
    }
})

////// VERIFY TOKEN
export const GET = defineDugwtfRequestHandler(async (evt) => {
    const token = (
        evt.cookies.get('neodugtoken') 
        || evt.request.headers.get('x-neodugtoken')  
    );

    if (!token) throw {
        status: 400,
        message: "Missing token"
    }

    const user_id = parseNeodugUserToken(token)
    const foundUser = await NeodugUser.findById(user_id)
        .populate({
            path: 'commentBoxes',
            populate: {
                path: 'comments'
            }
        })

    if (!foundUser) throw {
        status: 400,
        message: "Token doesn't match an existing user. Maybe your username changed?"
    }

    return {
        message: "Token verified.",
        data: {
            user: createNeodugUserDTO_POPULATED(foundUser)
        }
    }
})