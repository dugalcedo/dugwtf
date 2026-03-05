import { drhHandle } from "$lib/server/requestHandling/handle";
import { userTable } from "$lib/server/db/schema";
import { and, eq } from "drizzle-orm"
import { ROOT_URL } from "$env/static/private";

const INVALID_OBJ = (data?: any) => {
    return {
        type: "verifyEmail",
        status: 400,
        clientMsg: "invalid code",
        serverLog: "invalid code",
        serverData: data
    }
}

export const GET = drhHandle({
    parseBody: false,
    async handler({ keepLoggedIn, params, db }) {

        const code = params.code;

        if (!code || code.length < 15) throw INVALID_OBJ({code})

        const [user] = await db.select()
            .from(userTable)
            .where(eq(userTable.verificationCode, code));
        
        if (!user) throw INVALID_OBJ({code, user})

        await db.update(userTable)
            .set({ verified: true })
            .where(
                and(
                    eq(userTable.verified, false),
                    eq(userTable.id, user.id)
                )
            );

        keepLoggedIn(user)

        return {
            msg: "",
            custom: Response.redirect(`${ROOT_URL}/verify`)
        }
    },
})