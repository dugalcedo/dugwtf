import { countries, countriesExcept, continents } from "./service"
import { cgState } from "./cgState.svelte"

export type Preset = [number, number, number, string[], string[], number?];

const NORDICS = ['Denmark', 'Sweden', 'Finland', 'Norway', 'Iceland']

export const PRESETS: Record<
    string, Record<
        string, Preset
    >
> = {
    USA: {
        easy: [5, 3, 800_000, ['United States'], []],
        medium: [8, 4, 500_000, ['United States'], []],
        hard: [10, 5, 200_000, ['United States'], []],
        "very hard": [10, 5, 100_000, ['United States'], [], 3_000_000],
        "insane": [15, 6, -Infinity, ['United States'], [], 999_999]
    },
    Nordics: {
        easy: [5, 3, 150_000, NORDICS, []],
        medium: [8, 4, 100_000, NORDICS, []],
        hard: [10, 5, 75_000, NORDICS, []],
        "very hard": [10, 5, -Infinity, NORDICS, [], 299_999]
    },
    Europe: {
        easy: [5, 3, 500_000, [], ['Europe']],
        medium: [8, 4, 200_000, [], ['Europe']],
        hard: [10, 5, 100_000, [], ['Europe']],
        "very hard": [10, 5, -Infinity, [], ['Europe'], 2_000_000],
        "insane": [15, 5, -Infinity, [], ['Europe'], 799_999],
    },
    China: {
        easy: [5, 3, 5_000_000, ['China'], []],
        medium: [8, 4, 3_000_000, ['China'], []],
        hard: [10, 5, 2_000_000, ['China'], []],
        "very hard": [10, 5, 1_000_000, ['China'], []],
        insane: [15, 5, 1_000_000, ['China'], []],
        hardcore: [15, 5, 800_000, ['China'], [], 7_999_999],
        hell: [15, 5, -Infinity, ['China'], [], 5_999_999]
    }
}

export const applyPreset = (preset: Preset) => {
    cgState.init = {
        length: preset[0],
        allowedIncorrectGuesses: preset[1],
        cityOpts: {
            minPop: preset[2],
            countries: new Set(preset[3]),
            continents: new Set(preset[4]),
            maxPop: preset[5] ?? Infinity
        }
    }
}

export const storeMatchesPreset = (preset: Preset) => {
    return (
        cgState.init.length === preset[0]
        && cgState.init.allowedIncorrectGuesses === preset[1]
        && cgState.init.cityOpts.minPop === preset[2]
        && JSON.stringify([...cgState.init.cityOpts.countries]) === JSON.stringify(preset[3])
        && JSON.stringify([...cgState.init.cityOpts.continents]) === JSON.stringify(preset[4])
        && cgState.init.cityOpts.maxPop === (preset[5]??Infinity)
    )
}