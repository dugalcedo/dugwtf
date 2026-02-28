import dotenv from 'dotenv'; dotenv.config()
import Queue from "../../../_old-lib/queue.js";
import { v4 } from 'uuid';
import { type RequestEvent } from '@sveltejs/kit';
import { LASTFM_API_KEY } from '$env/static/private'

export const lastfmQueue = Queue.create('lastfm')


type LastfmPeriod = (
    | 'overall'
    | '7day'
    | '1month'
    | '3month'
    | '6month'
    | '12month'
)

type LastfmAlbum = {
    artist: {
        url: string
        name: string
        mbid: string
    }
    image: {
        size: string
        "#text": string
    }[]
    mbid: string
    url: string
    playcount: number
    name: string
}

export const getUsersTopAlbums = async (
    username: string, 
    period: LastfmPeriod,
    limit: number
) => {
    if (
        !process.env.LASTFM_APP_NAME
        || !process.env.LASTFM_API_KEY
        || !process.env.LASTFM_SHARED_SECRET
        || !process.env.LASTFM_USER
    ) {
        console.error(`Missing Lastfm env vars`)
        throw {
            status: 503,
            message: "Database down"
        }
    }

    const url = `http://ws.audioscrobbler.com/2.0/?method=user.gettopalbums&user=${username}&period=${period}&limit=${limit}&format=json&api_key=${process.env.LASTFM_API_KEY}`

    const res = await fetch(url)
    const data = await res.json()

    const albums: LastfmAlbum[] = data.topalbums?.album

    if (!albums || !albums.length) throw {
        status: 404,
        message: "Albums not found"
    }

    return albums.map(alb => ({
        title: `${alb.artist.name} - ${alb.name}`,
        id: v4(),
        cover_image: findCoverArt(alb)
    }))
}

function findCoverArt(alb: LastfmAlbum): string {
    if (!alb.image) return ""
    const sizes = ['small', 'medium', 'large', 'extralarge']
    alb.image.sort((a,b) => sizes.indexOf(b.size) - sizes.indexOf(a.size))
    const xtralarge = alb.image[0]
    if (!xtralarge) return ""
    return xtralarge['#text']
}

export function getParams(evt: RequestEvent<Partial<Record<string, string>>, string | null>) {
    const {
        username,
        limit,
        period
    } = Object.fromEntries(new URL(evt.request.url).searchParams)

    if (!username || !limit || !period) {
        throw {
            status: 400,
            message: `Username, limit, and period searchParams are required`
        }
    }

    if (
        period != 'overall'
        && period != '7day'
        && period != '1month'
        && period != '3month'
        && period != '6month'
        && period != '12month'
    ) throw {
        status: 400,
        message: `Invalid period`
    }

    const limitInt = parseInt(limit)
    if (limitInt < 5 || limitInt > 200) throw {
        status: 400,
        message: `Limit must be between 5 and 200`
    }

    return {
        username,
        period: period as LastfmPeriod,
        limit: limitInt
    }
}