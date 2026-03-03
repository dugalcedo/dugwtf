import { userTable, type DbUser } from "$lib/server/db/schemas/user";
import { drhHandle } from "$lib/server/requestHandling/handle";
import { z } from "zod";
import { verifyPassword } from "$lib/server/util/hashing";
import { eq } from "drizzle-orm";
import { signToken } from "$lib/server/util/jwt";

export const POST = drhHandle({
    zodSchema: z.object({
        displayName: z.string().optional(),
        email: z.string().optional(),
        password: z.string("password required")
    }),
    async handler({ db, body, cookies }) {

        // FIND USER
        let user: DbUser;        
        if (body.displayName) {
            const results = await db
                .select()
                .from(userTable)
                .where(
                    eq(userTable.displayName, body.displayName)
                )
            user = results[0]
        }
        else if (body.email) {
            const results = await db
                .select()
                .from(userTable)
                .where(
                    eq(userTable.email, body.email)
                )
            user = results[0]
        }
        else throw {
            status: 400,
            type: "login-input",
            severLog: "no displayName or email provided",
            clientMsg: "you must provide either a display name or email"
        }

        // NOT FOUND
        if (!user) throw {
            status: 401,
            type: "login-input",
            serverLog: `no user found "${body.displayName||body.email}"`,
            clientMsg: "invalid credentials"
        }


        // VERIFY PASSWORD
        const passwordIsValid = verifyPassword(body.password, user.hash)
        if (!passwordIsValid) throw {
            status: 401,
            type: "login-input",
            serverLog: `wrong password"`,
            clientMsg: "invalid credentials"
        }

        // SUCCESS
        const token = signToken({ id: user.id, hash: user.hash })

        cookies.set("dugwtf-token", token, {
            path: "/",
            httpOnly: true,
            maxAge: 30 * 24 * 60 * 60
        })

        return {
            status: 201,
            msg: "logged in",
            data: { token }
        }
    },
})