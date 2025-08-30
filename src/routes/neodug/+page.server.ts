import { NeodugUser, createNeodugUserDTO_POPULATED, parseNeodugUserToken, useNeodugDb } from '../../lib/server/neodugDb.js'

export const load = async (evt) => {
    let user

    try {
        await useNeodugDb()

        const userFromTokenRes = await evt.fetch('/api/neodug/user')
        if (userFromTokenRes.ok) user = (await userFromTokenRes.json())?.data?.user;

        return {
            user
        }
    } catch (error) {
        return {
            errorMessage: (error as any)?.message
        }
    }
}