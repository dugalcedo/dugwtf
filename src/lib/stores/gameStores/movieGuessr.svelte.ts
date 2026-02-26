import { stringSimilarity } from 'string-similarity-js'

// ===== MEMO =====

let _all: MG_Record | null = null;
let _ids: string[] = [];
let wrongAnswerSignal: any = 0;

// ===== TYPES =====

export type MG_Movie = {
    id: string
    title: string
    year: number
    rating: number
    pageNo: number
    href: string
    directors: string[]
    top3Cast: string[]
    reviews: string[]
    // game state
    unsanitizedReviews?: string[]
    reviewsRevealed?: number
    omdb?: OMDB_Movie | null
    directorsRevealed?: boolean
    castRevealed?: number
    yearRevealed?: boolean
    ratingRevealed?: boolean
    mpaRatingRevealed?: boolean
    boxOfficeRevealed?: boolean
    blurryPosterRevealed?: boolean
    runtimeRevealed?: boolean
    countryRevealed?: boolean
    popularityRankRevealed?: boolean
    wrongAnswers?: string[]
    cashOverride?: number
}

export type MG_Record = Record<string, MG_Movie>

export type MG_StoreStatus = (
    | 'not-started'
    | 'fetching'
    | 'started'
    | 'error'
    | 'correct'
    | 'bankrupt'
    | 'end'
)

export type MG_DifficultyName = (
    | 'hard'
    | 'normal'
    | 'easy'
    | 'extra-easy'
)

export type MG_Difficulty = {
    getMax: () => number
}

export const MG_DifficultyRecord: Record<MG_DifficultyName, MG_Difficulty> = {
    hard: {
        getMax: () => _ids.length
    },
    normal: {
        getMax: () => 2000
    },
    easy: {
        getMax: () => 1000
    },
    "extra-easy": {
        getMax: () => 250
    }
}



export type MG_Store = {
    status: MG_StoreStatus
    movies: MG_Movie[]
    i: number
    guessVal: string
    signalingWrongAnswer: boolean
    difficulty: MG_DifficultyName
    code?: string
}

export type OMDB_Movie = {
    mpaRating?: string
    runtime?: string
    country?: string
    poster?: string
    boxOffice?: string
}

export type CostName = (
    | 'review'
    | 'cast'
    | 'year'
    | 'director'
    | 'poster'
    | 'rating'
    | 'country'
    | 'mpaRating'
    | 'boxOffice'
    | 'runtime'
    | 'wrongAnswer'
)

// ===== CONSTANTS =====

export const COSTS: Record<CostName, number> = {
    review: 15,
    cast: 15,
    year: 5,
    director: 25,
    poster: 25,
    rating: 3,
    country: 3,
    mpaRating: 3,
    boxOffice: 3,
    runtime: 3,
    wrongAnswer: 10,
}

const WALLET_FACTOR = 0.3;

export const STARTING_CASH = (() => {
    const penaltySum = Object.entries(COSTS).reduce((sum, [k, v]) => {
        if (k === 'cast') return sum + (v*3);
        if (k === 'review') return sum + (v*4);
        return sum + v
    }, 0)

    return Math.ceil(penaltySum * WALLET_FACTOR)
})();

export const YELLOW_THRESH = Math.floor(STARTING_CASH*(2/3));
export const RED_THRESH = Math.ceil(STARTING_CASH*(1/3));

const SIMIL_THRESHOLD = 0.73

const UNSCRUBBABLE_WORDS = new Set([
    // articles
    'the', 'a', 'an', 'some',
    // be-words
    'be', 'is', 'are', 'am',
    // binding words
    'and', 'with', 'but', 'or',
    // prepositions
    'to', 'of', 'in', 'for', 'on', 'at', 'by', 'from',
    // inanimate pronouns
    'that', 'this', 'it', 
    // personal pronouns
    'I', 'me', 'we', 'us', 'he', 'she', 'him', 'her', 'you', 'they', 'them',
    // possessive pronouns
    'his', 'hers', 'my', 'our', 'your', 'their', 
    // other verbs
    'have', 'say', 'do', 'will', 
    // misc
    'not', 'as', 'there', 'so'
])

// ===== STORE =====

export const mg = $state<MG_Store>({
    status: 'not-started',
    movies: [],
    i: 0,
    guessVal: '',
    signalingWrongAnswer: false,
    difficulty: 'normal'
})

// ===== STORE-MUTATING FUNCTIONS =====

export const startGame = async () => {
    // RESET
    mg.status = 'fetching'
    mg.movies = []
    mg.i = 0

    try {
        const fiveRandom = await getFiveRandomMovies()
        if (!fiveRandom) throw new Error("failed finding 5 random movies")

        // generate code
        mg.code = fiveRandom.map(m => encodeMovieId(m.id)).join('')

        mg.movies = fiveRandom
        mg.status = 'started'
    } catch (error) {
        console.log("error starting movie_guessr:", error)
        mg.status = 'error'
    }
}

export const startGameFromCode = async (code: string) => {
    // RESET
    mg.status = 'fetching'
    mg.movies = []
    mg.i = 0

    const movies = await getFiveMoviesFromCode(code)

    if (!movies) {
        mg.status = 'error'
        return
    }

    mg.movies = movies
    mg.status = 'started'
}

export const guess = () => {
    const movie = mg.movies[mg.i]
    if (!movie) return;
    const title = movie.title||"";
    
    // derive similarity
    let similarity = 0
    if (!title) {
        return
    }
    else if (title.length < 7) {
        similarity = stringSimilarity(mg.guessVal, title, 1)
    }
    else if (title.length < 25) {
        similarity = stringSimilarity(mg.guessVal, title)
    }
    else {
        similarity = stringSimilarity(mg.guessVal, title, 3)
    }

    // handle "wrong" answer
    if (similarity < SIMIL_THRESHOLD) {
        console.log("INCORRECT")
        if (!movie.wrongAnswers) movie.wrongAnswers = [];
        movie.wrongAnswers = [...movie.wrongAnswers, mg.guessVal]

        // signal wrong answer
        if (wrongAnswerSignal) clearTimeout(wrongAnswerSignal);
        mg.signalingWrongAnswer = true
        wrongAnswerSignal = setTimeout(() => {
           mg.signalingWrongAnswer = false 
        }, 1000);

        // reset value
        mg.guessVal = ""
        
        return
    }

    handleCorrect()
    mg.guessVal = ""
}

export const handleCorrect = () => {
    console.log("CORRECT")
    mg.status = 'correct'
}

export const handleBankrupt = () => {
    console.log("BANKRUPT")
    const movie = mg.movies[mg.i]
    if (movie) movie.cashOverride = 0
    mg.status = 'bankrupt'
}

export const nextRound = () => {
    mg.status = 'fetching'

    mg.i++

    // handle end
    const movie = mg.movies[mg.i]
    if (!movie) {
        mg.status = 'end'
        return
    }

    mg.status = 'started'
}

// ===== HELPER FUNCTIONS =====

const getAllMovies = async (): Promise<MG_Record> => {
    if (_all) return _all;
    const res = await fetch("/data/mg-movies.json")
    const json = await res.json()
    _all = json
    _ids = Object.keys(json)
    _ids.sort((a, b) => Number(a)-Number(b))
    return json
}

const getRandomMovie = async (): Promise<MG_Movie | null> => {
    const all = await getAllMovies()
    const max = MG_DifficultyRecord[mg.difficulty].getMax()
    const id = _ids[Math.floor(Math.random()*max)]
    const movie = all[id]
    if (!movie) return null
    movie.id = id

    // append omdb movie (Now hardcoded)
    // movie.omdb = await searchMovieOnOmdbApi(movie)

    // sanitize and shuffle reviews
    movie.reviewsRevealed = 1
    shuffleArr(movie.reviews)
    movie.unsanitizedReviews = [...movie.reviews]
    movie.reviews = movie.reviews.map(rev => sanitizeReview(movie, rev))
    return movie
}

const getFiveRandomMovies = async (): Promise<MG_Movie[] | null> => {
    let attempts = 0;
    const movies: MG_Movie[] = []

    while (attempts < 15 && movies.length < 5) {
        /**/ attempts++ /**/
        const movie = await getRandomMovie()
        if (!movie) continue;
        if (movies.some(m => m.href === movie.href)) continue;
        movies.push(movie)
    }

    if (movies.length < 5) return null;

    return movies
}

const getMovieFromCode = async(code: string): Promise<MG_Movie | null> => {

    // get id
    let id: string;
    try {
        id = decodeMovieId(code)
    } catch (error) {
        console.error(error)
        return null
    }

    const all = await getAllMovies()
    const movie = all[id]
    if (!movie) return null;
    movie.id = id
    return movie
}

const getFiveMoviesFromCode = async(code: string): Promise<MG_Movie[] | null> => {

    let movies: MG_Movie[] = []

    for (let i = 0; i < code.length; i++) {
        const char = code[i]
        const movie = await getMovieFromCode(char)
        if (!movie) return null;
        movies.push(movie)
    }

    return movies
}

const shuffleArr = (arr: any[]) => {
  let i = arr.length, j, temp;
  while(--i > 0){
    j = Math.floor(Math.random()*(i+1));
    temp = arr[j];
    arr[j] = arr[i];
    arr[i] = temp;
  }  
}

const sanitizeReview = (movie: MG_Movie, rev: string): string => {
    // get lowercase array of all words to scrub
    const lcWords: string[] = []
    ;([...movie.top3Cast, ...movie.directors, movie.title]).forEach(word => {
        lcWords.push(...word.toLowerCase().split(' '))
    })

    // replace all words
    lcWords.forEach(word => {
        if (UNSCRUBBABLE_WORDS.has(word)) return;
        rev = caseInsensitiveScrubMatch(rev, word)
    })

    return rev
}

/**
 * For example, caseInsensitiveScrubMatch("hElLo hOw ArE yOu? aRe YoU oK?", "you")
 * would return "hElLo hOw ArE ▮▮▮? aRe ▮▮▮ oK?"
 */
const caseInsensitiveScrubMatch = (str: string, match: string): string => {
  const regex = new RegExp(`\\b${match}\\b`, 'gi');
  return str.replace(regex, (matched) => '▮'.repeat(matched.length));
}

export const deriveRemainingCashFromMovie = (m: MG_Movie | undefined | null) => {
    if (!m) return 0;
    if (m.cashOverride !== undefined) return m.cashOverride;

    let cash = STARTING_CASH

    // cast
    cash -= COSTS.cast * (m.castRevealed||0);
    // review
    cash -= COSTS.review * ((m.reviewsRevealed||1)-1);
    // wrong answers
    cash -= COSTS.wrongAnswer * (m.wrongAnswers?.length||0)

    // booleans
    cash -= COSTS.boxOffice * Number(m.boxOfficeRevealed===true);
    cash -= COSTS.country * Number(m.countryRevealed===true)
    cash -= COSTS.director * Number(m.directorsRevealed===true)
    cash -= COSTS.mpaRating * Number(m.mpaRatingRevealed===true)
    cash -= COSTS.poster * Number(m.blurryPosterRevealed===true)
    cash -= COSTS.rating * Number(m.ratingRevealed===true)
    cash -= COSTS.runtime * Number(m.runtimeRevealed===true)
    cash -= COSTS.year * Number(m.yearRevealed===true)

    return cash
}

export const deriveColorVarFromMoneyAmount = (cost: number) => {
    if (cost > YELLOW_THRESH) return 'hl'
    if (cost > RED_THRESH) return 'warning'
    return 'error'
}

// helper
const OFFSET = 0x4E00;
function encodeMovieId(id: string) {
    const n = Number(id)
    if (!Number.isInteger(n) || n < 0 || n > 10000) {
        throw new Error(`Input must be an integer from 0 to 10000, got: ${n}`);
    }
    return String.fromCodePoint(OFFSET + n);
}
function decodeMovieId(str: string): string {
    const codePoints = [...str].map(c => c.codePointAt(0)!);
    if (codePoints.length !== 1) {
        throw new Error(`Expected a single character, got: "${str}"`);
    }
    const n = codePoints[0] - OFFSET;
    if (!Number.isInteger(n) || n < 0 || n > 10000) {
        throw new Error(`Character "${str}" does not map to a number in range 0–10000`);
    }
    return n.toString();
}