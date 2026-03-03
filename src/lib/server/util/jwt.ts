import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '$env/static/private'

const THIRTY_DAYS_IN_SECONDS = 30 * 24 * 60 * 60;

export const signToken = <P extends Json>(payload: P) => {
    try {
        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: THIRTY_DAYS_IN_SECONDS })
        return token
    } catch (error) {
        console.log("failed signing token:", payload);
        throw error
    }
}

export const verifyToken = <P extends Json>(token: string): P => {
    try {
        const parsed = jwt.verify(token, JWT_SECRET)
        if (typeof parsed === 'string') throw null;
        return parsed as P
    } catch (error) {
        throw {
            type: "token",
            serverLog: "did not parse invalid token",
            clientMsg: "invalid/expired token",
            status: 400
        }
    }
}