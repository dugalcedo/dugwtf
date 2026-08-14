import { moose } from '@dugalcedo/moose/server'
import { sendMail } from '$lib/server/services/nodemailer'
import type { CityInGame } from '../../../../stuff/cityguessr/cgTypes'

type ReportBody = {
    city: CityInGame
    userAnswer: string
    reason: string
}

const MAX_REASON_LENGTH = 2000

export const POST = moose({
    async handler(ctx) {
        const body = await ctx.request.json() as Partial<ReportBody>
        const { city, userAnswer, reason } = body

        if (!city || typeof city.name !== 'string' || typeof userAnswer !== 'string') {
            ctx.status = 422
            return { msg: 'invalid report' }
        }

        const escaped = {
            name: esc(city.name),
            admin1: esc(city.admin1 ?? '—'),
            country: esc(city.country),
            answer: esc(userAnswer),
            reason: esc((reason ?? '').slice(0, MAX_REASON_LENGTH)) || '<em>(no reason given)</em>'
        }

        await sendMail(
            `cityGuessr report: "${userAnswer}" for ${city.name}`,
            `
                <h2>cityGuessr answer report</h2>
                <p>
                    <strong>city:</strong> ${escaped.name} (${escaped.admin1}, ${escaped.country})<br>
                    <strong>city id:</strong> ${Number(city.id)}<br>
                    <strong>guessed:</strong> ${escaped.answer}
                </p>
                <p><strong>reason:</strong><br>${escaped.reason}</p>
                <p>
                    <strong>alt names:</strong> ${esc((city.altNames ?? []).join(', ')) || '—'}<br>
                    <strong>cities in rect:</strong> ${esc((city.citiesInRect ?? []).map(c => c.name).join(', ')) || '—'}<br>
                    <strong>population:</strong> ${Number(city.population)}<br>
                    <strong>difficulty:</strong> ${esc(city.difficulty ?? '—')}<br>
                    <strong>coords:</strong> ${Number(city.lat)}, ${Number(city.lon)}
                </p>
                <p><a href="${esc(city.url ?? '')}">image</a></p>
            `
        )

        return { msg: 'report sent' }
    }
})

const esc = (s: string) => s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
