import type { City, CityImageOptions, CityInGame } from "./cgTypes"
import { getImageUrls, countries, continents } from "./service"
import { PRESETS } from "./presets.svelte"

export type CgState = {
    status: 'loading' | 'started' | 'over' | 'not-started' 
    loadingTurn: boolean
    cities: CityInGame[]
    userAnswers: string[],
    turn: number
    init: GameInit
    incorrectGuesses: number
    correctGuesses: number
}

export type GameInit = {
    length: number
    cityOpts: CityImageOptions
    allowedIncorrectGuesses: number
}

export const cgState = $state<CgState>({
    status: 'not-started',
    loadingTurn: false,
    cities: [],
    userAnswers: [],
    turn: 0,
    incorrectGuesses: 0,
    correctGuesses: 0,
    init: {
        length: PRESETS.USA.medium[0],
        allowedIncorrectGuesses: PRESETS.USA.medium[1],
        cityOpts: {
            minPop: PRESETS.USA.medium[2],
            maxPop: Infinity,
            countries: new Set(['United States']),
            continents: new Set([])
        }
    }
})

export const startNewGame = async () => {
    cgState.status = 'loading'
    cgState.turn = 0
    cgState.correctGuesses = 0
    cgState.incorrectGuesses = 0
    cgState.userAnswers = []
    cgState.cities = await getImageUrls(cgState.init.length, cgState.init.cityOpts)
    loadTurn()
    cgState.status = 'started'
}

export const nextTurn = () => {
    if (cgState.turn >= cgState.cities.length-1) {
        cgState.status = 'over'
    }
    else {
        cgState.turn++
        loadTurn()
    }
}

// ensure image loads before user can control anything
const loadTurn = () => {
    cgState.loadingTurn = true
    const img = document.createElement('img')
    img.src = cgState.cities[cgState.turn]?.url
    img.addEventListener('load', () => {
        cgState.loadingTurn = false
    })
}