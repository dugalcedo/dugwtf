import type { City } from "./cgTypes"
import { fetchCities, frameFor, mercatorX, mercatorY } from "./service"
import stringSimilarity from "string-similarity-js"

/** How close a guess has to be to a name. Lower = more typos forgiven. */
const SIMILARITY_THRESHOLD = 0.8

/**
 * How far outside the frame still counts, in km. 0 means the town's centre has
 * to be inside the picture; higher forgives ones sitting just off the edge.
 */
const FRAME_MARGIN_KM = 5

/** Letters that don't decompose into base + combining mark under NFD. */
const UNDECOMPOSABLE: Record<string, string> = {
    'ø': 'o', 'đ': 'd', 'ð': 'd', 'ł': 'l', 'ħ': 'h', 'ı': 'i',
    'ß': 'ss', 'æ': 'ae', 'œ': 'oe', 'þ': 'th',
}

/**
 * The dataset can't make its own mind up — it has "St. Louis", "St Albans" and
 * "Saint Petersburg" — so both sides get expanded to the long form.
 */
const ABBREVIATIONS: Record<string, string> = {
    st: 'saint', ste: 'sainte', sankt: 'saint', sant: 'saint',
    ft: 'fort', mt: 'mount', mtn: 'mountain',
    hts: 'heights', spgs: 'springs', spg: 'springs',
    jct: 'junction', ctr: 'center', cty: 'city',
    n: 'north', s: 'south', e: 'east', w: 'west',
}

/**
 * Folds a name to plain lowercase latin so the dataset's spelling and the
 * user's needn't agree on accents: "Malmo", "malmö" and "MALMÖ" all become
 * "malmo". Works both directions — the dataset is the accented one about as
 * often as the guess is.
 */
const normalize = (s: string) => s
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .toLowerCase()
    .replace(/[øđðłħıßæœþ]/g, c => UNDECOMPOSABLE[c])
    // apostrophes/hyphens/periods are noise: "st. john's" vs "st johns"
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .split(" ")
    .map(word => ABBREVIATIONS[word] ?? word)
    .join(" ")

const nameMatches = (name: string, guess: string) =>
    stringSimilarity(normalize(name), normalize(guess), 3) >= SIMILARITY_THRESHOLD

/** Every name this city answers to. */
const namesOf = (city: City) => [city.name, ...city.altNames]

/** Tests whether a point is visible in the shot framed on `city`. */
const visibleIn = (city: City) => {
    const { cx, cy, half } = frameFor(city)
    // Mercator inflates distances by 1/cos(lat), so the margin has to as well.
    const margin = (FRAME_MARGIN_KM * 1000)
        / Math.max(Math.cos(city.lat * Math.PI / 180), 0.01)
    const reach = half + margin

    return (lat: number, lon: number) =>
        Math.abs(mercatorX(lon) - cx) <= reach
        && Math.abs(mercatorY(lat) - cy) <= reach
}

/**
 * Is `guess` an acceptable answer for `city`? True for any town in the picture,
 * whether that's the city itself, somewhere sharing its cluster, or a
 * neighbouring cluster that fell inside the frame.
 */
export const isCorrectGuess = async (city: City, guess: string): Promise<boolean> => {
    if (!guess.trim()) return false
    if (namesOf(city).some(name => nameMatches(name, guess))) return true

    const all = await fetchCities()
    if (!all) return false

    const isVisible = visibleIn(city)

    // Geometry first — it's arithmetic, the similarity check is not.
    return all.some(other =>
        other.id !== city.id
        && isVisible(other.lat, other.lon)
        && namesOf(other).some(name => nameMatches(name, guess))
    )
}
