
let _allSamples: null | Record<number, GG_Sample> = null;
let _ids: number[] = [];

export type GG_Sample = {
    id: number
    artist: string
    title: string
    genreName: string
    url: string
    additionalSamples: GG_Additional_Sample[]
    aritstRevealed?: boolean
    titleRevealed?: boolean
    wrongGuesses?: string[]
}

export type GG_Additional_Sample = {
    id: number
    artist: string
    title: string
    url: string
    revealed?: boolean
    aritstRevealed?: boolean
    titleRevealed?: boolean
}

export type GG_Status = (
    | 'beforeStart'
    | 'error'
    | 'fetching-random'
    | 'fetching-by-id'
    | 'started'
    | 'lost-round'
    | 'won-round'
    | 'resetting'
)

export type CostTooltip = {
    name: string
    msg: string
    color: string
    animationName: string
    cost: number
    newScore: number
}

export type GenreGuessrStore = {
    samples: null | GG_Sample[]
    scorecards: Scorecard[]
    status: GG_Status
    i: number
    notification: null | string
    costTooltip: null | CostTooltip
    gameId: string
}

export type Lettercard = {
    genreName: string
    revealed: (string|null)[]
    revealableCount: number
    percentRevealed: () => number
    letterCost: number
}

export type Scorecard = {
    sampleId: number
    secondsSpentListening: number
    lettercard: Lettercard
    artistsRevealed: number
    titlesRevealed: number
    additionalSamplesRevealed: number
    wrongGuesses: number
    score: () => number
}

export const gg = $state<GenreGuessrStore>({
    samples: null,
    scorecards: [],
    status: 'beforeStart',
    i: 0,
    notification: null,
    costTooltip: null,
    get gameId() {
        if (this.samples === null) return ""
        return this.samples.map((s: GG_Sample) => {
            return encodeSampleId(s.id)
        }).join('')
    }
})

export const PENALTIES = {
    secondsSpentListening: 2, // remove n points for every second over 10 spent listening
    artistRevealed: 10, // remove n points if artist revealed
    titleRevealed: 10, // remove n points if title revealed
    additionalSamplesRevealed: 5, // remove n points for every sample revealed
    letterRevealedFactor: 1.5, // remove n * percentRevealed()
    wrongGuess: 25, // remove n for every wrong guess
}
export const newScorecard = (sample: GG_Sample): Scorecard => {
    return {
        sampleId: sample.id,
        secondsSpentListening: 0,
        lettercard: newLettercard(sample),
        artistsRevealed: 0,
        titlesRevealed: 0,
        additionalSamplesRevealed: 0,
        wrongGuesses: 0,
        score() {
            let score = 100;
            score -= 100 * this.lettercard.percentRevealed() * PENALTIES.letterRevealedFactor;

            score -= this.wrongGuesses * PENALTIES.wrongGuess;

            score -= this.artistsRevealed * PENALTIES.artistRevealed;
            score -= this.titlesRevealed * PENALTIES.titleRevealed;
            const secondsOver10Listened = this.secondsSpentListening - 10;
            if (secondsOver10Listened > 0) score -= (secondsOver10Listened*PENALTIES.secondsSpentListening);
            score -= (this.additionalSamplesRevealed*PENALTIES.additionalSamplesRevealed); 

            if (score < 0) score = 0;

            return Number(score.toFixed(2));
        }
    }
}

export const newLettercard = (s: GG_Sample): Lettercard => {
    const AUTO_REVEAL = [' ', '-'];
    let revealableCount = 0

    const revealed = s.genreName.split('').map(char => {
        if (AUTO_REVEAL.includes(char)) return char;
        revealableCount++;
        return null;
    })

    return {
        genreName: s.genreName,
        revealed,
        revealableCount,
        percentRevealed() {
            let count = 0
            for (const char of this.revealed) {
                if (char === null) continue;
                if (AUTO_REVEAL.includes(char)) continue;
                count++
            }
            return count / this.revealableCount
        },
        letterCost: Number((1/revealableCount * PENALTIES.letterRevealedFactor * 100).toFixed(2))
    }
}

export const startRandomGame = async () => {
    gg.status = 'fetching-random'
    gg.scorecards = []
    gg.samples = null;
    gg.i = 0;

    const samples = await fetch5Random()

    if (!samples) {
        gg.status = 'error'
        return
    }

    gg.samples = samples
    gg.scorecards = samples.map(s => newScorecard(s))
    gg.status = 'started'
}

export const startGameFromCode = async (code: string) => {
    gg.status = 'fetching-by-id'
    gg.scorecards = []
    gg.samples = null;
    gg.i = 0;

    let samples: GG_Sample[] | null
    try {
        console.log('trying to fetch samples from code')
        samples = await fetchFromCode(code)
    } catch {
        gg.status = 'error'
        return
    }

    if (!samples) {
        gg.status = 'error'
        return
    }

    gg.samples = samples
    gg.scorecards = samples.map(s => newScorecard(s))
    gg.status = 'started'
}



export const getAllSamples = async (): Promise<Record<number, GG_Sample>> => {
    if (_allSamples) return _allSamples;
    const res = await fetch("/data/gg-samples.json")
    const json = await res.json()
    _allSamples = json
    _ids = Object.keys(json).map(id => Number(id))
    return json
}

export const fetchRandom = async (): Promise<GG_Sample | null> => {
    try {
        const allSamples = await getAllSamples()
        const id = _ids[Math.floor(Math.random()*_ids.length)]
        return allSamples[id]
    } catch (error) {
        console.error(error)
        return null
    }
}

export const fetch5Random = async (): Promise<GG_Sample[] | null> => {
    let attemptsRemaining = 10
    const samples: GG_Sample[] = []

    while (attemptsRemaining >= 0 && samples.length < 5) {
        /*!*/ attemptsRemaining--; /*!*/

        const sample = await fetchRandom()
        if (!sample) continue;
        if (samples.some(s => s.id == sample.id)) continue;
        samples.push(sample)
    }

    if (samples.length == 5) return samples;
    return null;
}

export const fetchFromCode = async (code: string): Promise<GG_Sample[] | null> => {
    code = code.trim()
    if (!code) throw null
    const ids = code.split('').map(decodeSampleId)
    const allSamples = await getAllSamples()
    const samples: GG_Sample[] = []
    for (const id of ids) {
        const result = allSamples[id]
        if (!result) return null;
        samples.push(result)
    }
    return samples
}

export const handleWin = () => {
    gg.status = 'won-round'
}

export const handleLose = () => {
    gg.status = 'lost-round'
}

export const reset = () => {
    if (gg.i >= 4) {
        console.error("cannot advance gg any further")
        return
    }

    gg.status = 'resetting'

    gg.i++

    gg.status = 'started'
}

export const nextRound = () => {
    reset()
}

let notificationTimeout: ReturnType<typeof setTimeout> = 0 as any;
export const notify = (str: string) => {
    if (notificationTimeout) clearTimeout(notificationTimeout);
    gg.notification = str;
    notificationTimeout = setTimeout(() => {
        gg.notification = null;
    }, 3000);
}

export const scoreColor = (n: number) => {
    return n >= 70 ? "var(--hl)"
        : n > 30 ? "var(--warning)"
        : "var(--error)"
}

// helper
const OFFSET = 0x4E00;
function encodeSampleId(n: number) {
  if (!Number.isInteger(n) || n < 0 || n > 10000) {
    throw new Error(`Input must be an integer from 0 to 10000, got: ${n}`);
  }
  return String.fromCodePoint(OFFSET + n);
}
function decodeSampleId(str: string): number {
  const codePoints = [...str].map(c => c.codePointAt(0)!);
  if (codePoints.length !== 1) {
    throw new Error(`Expected a single character, got: "${str}"`);
  }
  const n = codePoints[0] - OFFSET;
  if (!Number.isInteger(n) || n < 0 || n > 10000) {
    throw new Error(`Character "${str}" does not map to a number in range 0–10000`);
  }
  return n;
}