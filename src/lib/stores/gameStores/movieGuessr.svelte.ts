import { stringSimilarity } from 'string-similarity-js'

// ===== MEMO =====

let _all: MG_Record | null = null;
let _ids: string[] = [];
let wrongAnswerSignal: any = 0;

// ===== TYPES =====

export type MG_Movie = {
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

export type MG_Store = {
    status: MG_StoreStatus
    movies: MG_Movie[]
    i: number
    guessVal: string
    signalingWrongAnswer: boolean
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

const STARTING_CASH = (() => {
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

// ===== STORE =====

export const mg = $state<MG_Store>({
    status: 'not-started',
    movies: [],
    i: 0,
    guessVal: '',
    signalingWrongAnswer: false
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
        mg.movies = fiveRandom
        mg.status = 'started'
    } catch (error) {
        console.log("error starting movie_guessr:", error)
        mg.status = 'error'
    }
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
    return json
}

const getRandomMovie = async (): Promise<MG_Movie | null> => {
    const all = await getAllMovies()
    const id = _ids[Math.floor(Math.random()*_ids.length)]
    const movie = all[id]
    if (!movie) return null

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
    ;([...movie.top3Cast, ...movie.directors, movie.title]).forEach(name => {
        lcWords.push(...name.toLowerCase().split(' '))
    })

    // replace all words
    lcWords.forEach(name => {
        rev = caseInsensitiveScrubMatch(rev, name)
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

// const searchMovieOnOmdbApi = async (movie: MG_Movie): Promise<null | OMDB_Movie> => {
//     // in case of rate limiting
//     await new Promise(resolve => setTimeout(resolve, 1000))
//     try {
//         // 1. Search
//         const res1 = await fetch(`https://www.omdbapi.com/?apikey=${x}&s=${movie.title}&y=${movie.year}`)
//         if (!res1.ok) return null;
//         const json1 = await res1.json()
//         if (!Array.isArray(json1.Search)) return null;
//         const firstMatch = json1.Search[0];
//         if (!firstMatch) return null;

//         // 2. Lookup
//         const res2 = await fetch(`https://www.omdbapi.com/?apikey=${x}&i=${firstMatch.imdbID}`)
//         if (!res2.ok) return null;
//         const json2 = await res2.json();
//         if (!json2) return null;

//         return {
//             mpaRating: json2.Rated||"",
//             runtime: json2.Runtime||"",
//             country: json2.Country||"",
//             boxOffice: json2.BoxOffice||"",
//             poster: json2.Poster||""
//         }
//     } catch (error) {
//         console.error("searchMovieOnOmdbApi error:", error)
//         return null;
//     }
// }

export const deriveRemainingCashFromMovie = (m: MG_Movie | undefined | null) => {
    if (!m) return 0;

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