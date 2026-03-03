import { userTable } from "$lib/server/db/schemas/user";
import { drhHandle } from "$lib/server/requestHandling/handle";
import { z } from 'zod'
import { hashPassword } from "$lib/server/util/hashing";
import { signToken } from "$lib/server/util/jwt";

export const POST = drhHandle({
    zodSchema: z.object({
        displayName: z
            .string("displayName required")
            .min(3, "must be between 3 and 31 characters")
            .max(31, "must be between 3 and 31 characters"),
        email: z.string("email required")
            .min(6, "must be between 6 and 255 characters")
            .max(255, "must be between 6 and 255 characters"),
        password: z
            .string("password required")
    }),
    async handler({ db, body, validateFound, cookies }) {
        const [newUser] = await db
            .insert(userTable)
            .values({
                displayName: body.displayName,
                hash: hashPassword(body.password),
                email: body.email,
            })
            .returning();

        validateFound(newUser, "user not found")

        const token = signToken({ id: newUser.id, hash: newUser.hash })

        cookies.set("dugwtf-token", token, {
            path: "/",
            httpOnly: true,
            maxAge: 30 * 24 * 60 * 60
        })

        return {
            status: 201,
            msg: "signed up",
            data: { token }
        }
    },
})