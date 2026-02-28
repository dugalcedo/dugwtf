import validator from "validator";
import bcrypt from 'bcryptjs'
import { cookieOptions, defineDugwtfRequestHandler, getUserFromEvt } from "../../../../_old-lib/server/requestHandling.js";
import { NeodugUser, useNeodugDb, createNeodugUserDTO, createNeodugUserToken, parseNeodugUserToken, createNeodugUserDTO_POPULATED } from "../../../../_old-lib/server/neodugDb.js"
import { createCorsOptionsHandler } from "../../../../_old-lib/server/cors.js"

export const OPTIONS = createCorsOptionsHandler()

// REGISTER
type RegisterBody = {
    username: string
    password: string
    email: string
}

export const POST = defineDugwtfRequestHandler(async (evt) => {
    await useNeodugDb()

    const body: RegisterBody = await evt.request.json()
    body.username = body.username.trim().replaceAll(/\s+/gm, ' ')

    if (!validator.isStrongPassword(body.password)) throw {
        status: 400,
        message: "Password must be at least 8 characters and contain at least one of each: lowercase, uppercase, number, symbol"
    }

    const existingUser = await NeodugUser.findOne({
        username: body.username
    })

    if (existingUser) throw {
        status: 400,
        message: `Username taken`
    }

    body.password = await bcrypt.hash(body.password, 7)

    const newUser = await NeodugUser.create({
        username: body.username,
        email: body.email,
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
    const foundUser = await getUserFromEvt(evt)

    if (!foundUser.verified) throw {
        status: 401,
        message: "unverified",
        data: { email: foundUser.email}
    }

    return {
        message: "Token verified.",
        data: {
            user: createNeodugUserDTO_POPULATED(foundUser)
        }
    }
})