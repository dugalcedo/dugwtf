import { userTable } from "$lib/server/db/schemas/user";
import { drhHandle } from "$lib/server/requestHandling/handle";
import { z } from 'zod'
import { hashPassword } from "$lib/server/serverUtils/hashing";
import { genCode } from "$lib/server/serverUtils/util"
import { sendVerificationEmail } from "$lib/server/services/nodemailer";

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
    async handler({ db, body, validateFound, keepLoggedIn }) {
        const [newUser] = await db
            .insert(userTable)
            .values({
                displayName: body.displayName,
                hash: hashPassword(body.password),
                email: body.email,
                verificationCode: genCode()
            })
            .returning();

        validateFound(newUser, "user not found")
        sendVerificationEmail(newUser.email, newUser.verificationCode)
        const token = keepLoggedIn(newUser)

        return {
            status: 201,
            msg: "signed up",
            data: { token }
        }
    },
})