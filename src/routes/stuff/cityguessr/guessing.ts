import type { City, CityInGame } from "./cgTypes"
import stringSimilarity from "string-similarity-js"

/** How close a guess has to be to a name. Lower = more typos forgiven. */
const SIMILARITY_THRESHOLD = 0.8

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

const namesOf = (city: City) => [city.name, ...city.altNames]

/**
 * Every name that counts as an answer for this city: its own, the towns sharing
 * its cluster, and everything else visible in the shot. Deduped, since a
 * neighbouring cluster in frame often lists the same suburbs.
 */
export const allowedNames = (city: CityInGame): string[] => [
    ...new Set([namesOf(city), ...city.citiesInRect.map(namesOf)].flat())
]

export const isCorrectGuess = (city: CityInGame, guess: string): boolean =>
    !!guess.trim() && allowedNames(city).some(name => nameMatches(name, guess))
