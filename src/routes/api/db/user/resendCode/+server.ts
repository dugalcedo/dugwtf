import { drhHandle } from "$lib/server/requestHandling/handle";
import { getUserOrThrow } from "$lib/server/serverUtils/getUser";
import { sendVerificationEmail } from "$lib/server/services/nodemailer";

export const GET = drhHandle({
    parseBody: false,
    async handler(ctx) {
        const user = await getUserOrThrow(ctx)
        const result = await sendVerificationEmail(ctx.db, user)

        switch (result) {
            case "success": return { msg: "email sent" }
            case "error": throw {
                status: 500,
                type: "resend-code",
                clientMsg: "something went wrong",
                serverLog: "failed sending email"
            }
            default:
                throw {
                    status: 403,
                    type: "resend-code",
                    serverLog: "user tried to resend email too soon",
                    clientMsg: `you must wait ${(result/(1000*60)).toFixed(.1)} more minutes before you can resend another verification code`
                }
        }
    },
})