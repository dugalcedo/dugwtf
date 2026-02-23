import { createCorsOptionsHandler } from "../../../../_old-lib/server/cors.js"
import { NeodugEmailVerification, NeodugUser, sendVerificationEmail } from "../../../../_old-lib/server/neodugDb.js"
import { defineDugwtfRequestHandler, getUserFromEvt } from "../../../../_old-lib/server/requestHandling.js"

export const OPTIONS = createCorsOptionsHandler()

export const POST = defineDugwtfRequestHandler(async (evt) => {
    const user = await getUserFromEvt(evt)
    const existingEv = await NeodugEmailVerification.findOne({ email: user.email })

    if (!existingEv) {
        const newEv = await NeodugEmailVerification.create({ email: user.email })
        await newEv.save()
        await sendVerificationEmail(newEv)
        return { message: "Email sent" }
    }

    if (!existingEv.lastEmail) {
        existingEv.lastEmail = new Date()
        await existingEv.save()
        await sendVerificationEmail(existingEv)
        return { message: "Email sent" }
    }

    const now = new Date()
    const msSinceLastEmail = now.getTime() - existingEv.lastEmail.getTime();
    const fifteenMinutes = 1000*60*15;
    const diff = fifteenMinutes - msSinceLastEmail;
    const m = Math.floor(diff/1000/60)
    const s = Math.round((diff/1000)-m*60)
    if (msSinceLastEmail < fifteenMinutes) throw {
        status: 400,
        message: `You must wait ${m} minutes and ${s} seconds before you can send another email.`
    }

    existingEv.lastEmail = new Date()
    await existingEv.save()
    await sendVerificationEmail(existingEv)
    return { message: "Email sent" }
})

type VerifyEmailBody = {
    evid: string
}
export const PUT = defineDugwtfRequestHandler(async (evt) => {
    const body: VerifyEmailBody = await evt.request.json()
    const foundEv = await NeodugEmailVerification.findById(body.evid)

    if (!foundEv) throw {
        status: 404,
        message: "Invalid URL"
    }

    const user = await NeodugUser.findOne({ email: foundEv.email })

    if (!user) throw {
        status: 404,
        message: "Email does not match any users"
    }

    user.verified = true
    await user.save()
    await NeodugEmailVerification.findOneAndDelete({ _id: body.evid })

    return {
        message: "Email verified"
    }
})