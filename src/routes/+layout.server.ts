import type { LayoutServerLoad } from "./$types";
import { userTable } from "$lib/server/db/schema";
import { getPostgresDb } from "$lib/server/db/connect";
import { eq } from "drizzle-orm";
import { verifyToken } from "$lib/server/serverUtils/jwt";

export const load: LayoutServerLoad = async (ctx) => {
    const token = ctx.cookies.get('dugwtf-token')

    if (!token) return {}

    let parsed: any
    try {
        parsed = verifyToken(token)
    } catch {
        return { error: "invalid token" }
    }

    const db = getPostgresDb()

    if (!db) return {
        error: "db down"
    }

    const [user] = await db
        .select()
        .from(userTable)
        .where(
            eq(userTable.id, parsed.id)
        )

    if (!user) return {
        error: "user not found"
    }

    return {
        user: {
            displayName: user.displayName,
            email: user.email,
            verified: user.verified,
            lastVerificationCodeSentAt: user.lastVerificationCodeSentAt,
            isAdmin: ['dug', 'admin'].includes(user.role||'')
        }
    }
}