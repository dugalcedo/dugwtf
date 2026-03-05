import nodemailer from 'nodemailer'
import { EMAIL, EMAIL_APP_PASSWORD } from '$env/static/private'
import type { DbUser } from '../db/schemas/user'
import { userTable } from '../db/schemas/user'
import type { PostgresJsDatabase } from 'drizzle-orm/postgres-js'
import { eq } from 'drizzle-orm'

const THIRTY_MINUTES = 30 * 60 * 1000;

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: EMAIL,
        pass: EMAIL_APP_PASSWORD
    }
})

export const sendVerificationEmail = async (db: PostgresJsDatabase, user: DbUser) => {
    const now = Date.now()

    try {
        const msSince = now - (user.lastVerificationCodeSentAt?.getTime() || 0);
        console.log({user, msSince, now})
        if (msSince < THIRTY_MINUTES) return THIRTY_MINUTES - msSince;

        await db.update(userTable)
            .set({ lastVerificationCodeSentAt: new Date() })
            .where(eq(userTable.id, user.id))

        await transporter.sendMail({
            from: `"Dug Alcedo from dug.wtf" <${process.env.EMAIL_USER}>`,
            to: user.email,
            subject: "Verify your email for dug.wtf",
            html: `
                <h2>Dug.wtf</h2>
                <a href="https://dug.wtf/api/db/user/verifyEmail/${user.verificationCode}">
                    Click here to verify your email address.
                </a>
            `
        })

        return "success"
    } catch (error) {
        console.warn("Failed sending email:", error)
        return "error"
    }
}