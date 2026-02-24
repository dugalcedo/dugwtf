import { readFileSync, writeFileSync } from 'fs'
const x = "b49bbfd7"

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
}

export type OMDB_Movie = {
    mpaRating?: string
    runtime?: string
    country?: string
    poster?: string
    boxOffice?: string
}

const failedMovieMap = {
    234: "tt0120915",
    306: "tt1951265",
    326: "tt2562232",
    331: "tt8847712",
    335: "tt4574334",
    343: "tt1951266",
    511: "tt14444726",
    540: "tt9603212",
    549: "tt6146586",
    555: "tt9603208",
    562: "tt0082933",
    589: "tt7713068",
    622: "tt0914798",
    645: "tt0117509",
    660: "tt1673434",
    666: "tt0443453",
    674: "tt27403986",
    677: "tt1324999",
    683: "tt4912910",
    871: "tt30472557",
    903: "tt2381249",
    923: "tt1229238",
    936: "tt0290334",
    983: "tt0114746",
    1008: "tt0056801",
    1064: "tt30319503",
    1069: "tt14539740",
    
}

const searchMovieOnOmdbApi = async (movie: MG_Movie): Promise<null | OMDB_Movie> => {
    const sanitizedMovieTitle = movie.title.replaceAll(' & ',' ')

    try {
        // 1. Search
        // await new Promise(resolve => setTimeout(resolve, 250))
        let firstMatch: any;

        
            const res1 = await fetch(`https://www.omdbapi.com/?apikey=${x}&s=${sanitizedMovieTitle}&y=${movie.year}`)
            if (!res1.ok) return null;
            const json1 = await res1.json()
            if (!Array.isArray(json1.Search)) return null;
            firstMatch = json1.Search[0];
            if (!firstMatch) return null;
        
        
        // 2. Lookup
        // await new Promise(resolve => setTimeout(resolve, 250))
        const res2 = await fetch(`https://www.omdbapi.com/?apikey=${x}&i=${firstMatch.imdbID}`)
        if (!res2.ok) return null;
        const json2 = await res2.json();
        if (!json2) return null;

        return {
            mpaRating: json2.Rated||"",
            runtime: json2.Runtime||"",
            country: json2.Country||"",
            boxOffice: json2.BoxOffice||"",
            poster: json2.Poster||""
        }
    } catch (error) {
        console.error("searchMovieOnOmdbApi error:", error)
        return null;
    }
}

const movies: Record<string, MG_Movie> = JSON.parse(readFileSync('static/data/mg-movies.json', 'utf-8'))
const newMovies: Record<string, MG_Movie> = JSON.parse(readFileSync('static/data/mg-movies-new.json', 'utf-8'))
const failedMovies: Record<string, MG_Movie> = JSON.parse(readFileSync('static/data/mg-movies-failed.json', 'utf-8'))

const ids = Object.keys(movies)
const skip = new Set<number>([])

for (let i = 0; i < ids.length; i++) {
    const movie = movies[i]
    console.log(`processing movie ${i} of ${ids.length}: "${movie.title}"`)

    if (skip.has(i)) {
        console.log(`force skipping`)
        continue
    }

    // check existing
    if (newMovies[i]) {
        console.log(`already processed. skipping.`)
        continue
    }

    const omdb = await searchMovieOnOmdbApi(movie)

    if (!omdb) {
        console.log(`omdb returned null. skipping.`)
        failedMovies[i] = movie
        writeFileSync('static/data/mg-movies-failed.json', JSON.stringify(failedMovies, null, 4))
        continue
    }

    const newMovie: MG_Movie = {
        ...movie,
        omdb
    }

    newMovies[i] = newMovie
    writeFileSync('static/data/mg-movies-new.json', JSON.stringify(newMovies, null, 4))
}