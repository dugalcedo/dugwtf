import type { RequestEvent } from "@sveltejs/kit"

const WINDOW_MS = 20_000
const MAX_REQUESTS = 18

const BAN_MS = 60 * 60_000

const requestLog = new Map<string, number[]>()
const bannedUntil = new Map<string, number>()

setInterval(() => {
    const now = Date.now()
    for (const [ip, timestamps] of requestLog) {
        if (timestamps[timestamps.length - 1] < now - WINDOW_MS) requestLog.delete(ip)
    }
    for (const [ip, until] of bannedUntil) {
        if (until < now) bannedUntil.delete(ip)
    }
}, WINDOW_MS*2)

const throwAttack = (ip: string, serverLog: string, serverData: object) => {
    throw { type: "attack", status: 404, serverLog, clientMsg: "not found", serverData }
}

export const preventAttacks = (evt: RequestEvent) => {
    const ip = evt.getClientAddress()
    const now = Date.now()

    const banExpiry = bannedUntil.get(ip)
    if (banExpiry) throwAttack(ip, `banned IP attempted request: ${ip}`, { ip, bannedUntil: banExpiry })

    const ipLogs = requestLog.get(ip)
    const timestamps = (ipLogs ?? []).filter(t => now - t < WINDOW_MS)
    timestamps.push(now)
    requestLog.set(ip, timestamps)

    if (timestamps.length > MAX_REQUESTS) {
        bannedUntil.set(ip, now + BAN_MS)
        requestLog.delete(ip)
        throwAttack(ip, `rate limit exceeded, banning ${ip} for 1hr`, { ip, requestCount: timestamps.length })
    }
}