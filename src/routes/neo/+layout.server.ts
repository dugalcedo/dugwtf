import { NeodugEmailVerification, createNeodugUserDTO_POPULATED, useNeodugDb } from '../../lib/server/neodugDb.js'
import { getUserFromEvt } from '../../lib/server/requestHandling.js'

export const load = async (evt): Promise<NeodugData_FE> => {
    let user
    let emailVerification

    try {
        await useNeodugDb()

        const userDoc = await getUserFromEvt(evt)

        if (userDoc) {
            user = createNeodugUserDTO_POPULATED(userDoc)

            const foundEV = await NeodugEmailVerification.findOne({ email: userDoc.email })
            if (foundEV) emailVerification = {
                email: foundEV.email,
                lastEmail: foundEV.lastEmail?.toString() || ""
            }
        }

        return {
            user,
            emailVerification
        }
    } catch (error) {
        return {
            error: (error as any)?.message
        }
    }
}