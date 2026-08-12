import { countries, countriesExcept, continents } from "./service"
import { cgState } from "./cgState.svelte"
import { flagCodeMap } from "../../../components/fun/Flag"

export type Preset = [number, number, number, string[]|'all', string[]|'all', number?];

const NORDICS = ['Denmark', 'Sweden', 'Finland', 'Norway', 'Iceland']
const CHINA = ['China', 'Taiwan', 'Hong Kong', 'Macau']
const MIDDLE_EAST = ["Bahrain", "Cyprus", "Egypt", "Iran", "Iraq", "Jordan", "Kuwait", "Lebanon", "Oman", "Palestine", "Qatar", "Saudi Arabia", "Syria", "Turkey", "Yemen"]
const INDIA = ["India"]
const RUSSIA = ["Russia"]
const CARIBBEAN = ["Aruba", "Bahamas", "Barbados", "Cuba", "Curaçao", "Dominican Republic", "Haiti", "Jamaica", "Martinique", "Trinidad and Tobago"]
const NORTH_AMERICA = ["Belize", "Canada", "Costa Rica", "El Salvador", "Guatemala", "Honduras", "México", "Nicaragua", "Panama", "United States", ...CARIBBEAN]
const SOUTH_AMERICA = ["Argentina", "Bolivia", "Brazil", "Chile", "Colombia", "Ecuador", "French Guiana", "Guyana", "Paraguay", "Peru", "Suriname", "Uruguay", "Venezuela"]
const CENTRAL_ASIA = ["Kazakhstan", "Kyrgyzstan", "Tajikistan", "Turkmenistan", "Uzbekistan"]
const SOUTHEAST_ASIA = ["Brunei", "Cambodia", "Indonesia", "Laos", "Malaysia", "Myanmar", "Philippines", "Singapore", "Thailand", "Timor-Leste", "Vietnam"]
const ASIA = ["Afghanistan", "Armenia", "Azerbaijan", "Bahrain", "Bangladesh", "Bhutan", "China", "Georgia", "India", "Iran", "Iraq", "Israel", "Japan", "Jordan", "Kuwait", "Lebanon", "Maldives", "Mongolia", "Nepal", "North Korea", "Oman", "Pakistan", "Palestine", "Qatar", "Saudi Arabia", "South Korea", "Sri Lanka", "Syria", "Taiwan", "Turkey", "United Arab Emirates", "Yemen", ...CENTRAL_ASIA, ...SOUTHEAST_ASIA]
const OCEANIA = ["Australia", "Fiji", "French Polynesia", "New Caledonia", "New Zealand", "Papua New Guinea", "Samoa", "Solomon Islands", "Tonga", "Vanuatu"]
const NORTH_AFRICA = ["Algeria", "Egypt", "Libya", "Morocco", "Sudan", "Tunisia", "Western Sahara"]
const WEST_AFRICA = ["Benin", "Burkina Faso", "Cabo Verde", "Côte d'Ivoire", "Gambia", "Ghana", "Guinea", "Guinea-Bissau", "Liberia", "Mali", "Mauritania", "Niger", "Nigeria", "Senegal", "Sierra Leone", "Togo"]
const EAST_AFRICA = ["Burundi", "Comoros", "Djibouti", "Eritrea", "Ethiopia", "Kenya", "Madagascar", "Malawi", "Mauritius", "Mayotte", "Mozambique", "Réunion", "Rwanda", "Somalia", "South Sudan", "Tanzania", "Uganda"]
const AFRICA = ["Angola", "Botswana", "Cameroon", "Central African Republic", "Chad", "Democratic Republic of the Congo", "Equatorial Guinea", "Gabon", "Lesotho", "Namibia", "Republic of the Congo", "São Tomé and Príncipe", "South Africa", "Swaziland", "Zambia", "Zimbabwe", ...NORTH_AFRICA, ...WEST_AFRICA, ...EAST_AFRICA]

export const PRESETS: Record<
    string, Record<
        string, Preset
    >
> = {
    USA: {
        easy: [5, 4, 800_000, ['United States'], []],
        medium: [8, 5, 500_000, ['United States'], []],
        hard: [10, 5, 200_000, ['United States'], []],
        "very hard": [10, 5, 100_000, ['United States'], [], 3_000_000],
        "insane": [15, 6, 0, ['United States'], [], 999_999],
        "all cities": [20, 10, 0, ['United States'], []]
    },
    World: {
        medium: [5, 4, 10_000_000, [], 'all'],
        hard: [8, 5, 5_000_000, [], 'all'],
        "very hard": [10, 5, 2_000_000, [], 'all'],
        insane: [15, 6, 1_000_000, [], 'all', 10_000_000],
        hardcore: [15, 6, 800_000, [], 'all', 7_500_000],
        "hell level 1": [15, 6, 500_000, [], 'all', 5_000_000],
        "hell level 2": [15, 6, 500_000, [], 'all', 2_000_000],
        "hell level 3": [15, 6, 100_000, [], 'all', 2_000_000],
        "all cities": [20, 10, 0, [], 'all']
    },
    Europe: {
        easy: [5, 4, 1_000_000, [], ['Europe']],
        medium: [8, 4, 600_000, [], ['Europe']],
        hard: [10, 5, 200_000, [], ['Europe']],
        "very hard": [10, 5, -Infinity, [], ['Europe'], 2_000_000],
        "insane": [15, 5, -Infinity, [], ['Europe'], 799_999],
        "all cities": [20, 10, 0, [], ['Europe']]
    },
    Nordics: {
        easy: [5, 3, 150_000, NORDICS, []],
        medium: [8, 4, 100_000, NORDICS, []],
        hard: [10, 5, 75_000, NORDICS, []],
        "very hard": [10, 5, -Infinity, NORDICS, [], 299_999],
        "all cities": [20, 10, 0, NORDICS, []]
    },
    China: {
        easy: [5, 3, 5_000_000, CHINA, []],
        medium: [8, 4, 3_000_000, CHINA, []],
        hard: [10, 5, 2_000_000, CHINA, []],
        "very hard": [10, 5, 1_000_000, CHINA, []],
        insane: [15, 6, 1_000_000, CHINA, []],
        hardcore: [15, 6, 800_000, CHINA, [], 7_999_999],
        hell: [15, 6, -Infinity, CHINA, [], 5_999_999],
        "all cities": [20, 10, 0, CHINA, []]
    },
    "Middle East": {
        easy: [5, 3, 5_000_000, MIDDLE_EAST, []],
        medium: [8, 4, 1_000_000, MIDDLE_EAST, []],
        hard: [10, 5, 750_000, MIDDLE_EAST, [], 5_000_000],
        "very hard": [10, 5, 500_000, MIDDLE_EAST, [], 2_000_000],
        "all citites": [20, 10, 0, MIDDLE_EAST, []]
    },
    "North America": {
        easy: [5, 4, 2_000_000, NORTH_AMERICA, []],
        medium: [8, 5, 1_000_000, NORTH_AMERICA, []],
        hard: [10, 5, 500_000, NORTH_AMERICA, []],
        "very hard": [10, 5, 200_000, NORTH_AMERICA, [], 1_999_999],
        insane: [15, 6, 100_000, NORTH_AMERICA, [], 499_999],
        "all cities": [20, 10, 0, NORTH_AMERICA, []]
    },
    Caribbean: {
        easy: [5, 3, 300_000, CARIBBEAN, []],
        medium: [8, 4, 200_000, CARIBBEAN, []],
        hard: [10, 5, 100_000, CARIBBEAN, []],
        "very hard": [10, 6, 0, CARIBBEAN, [], 199_999],
        "all cities": [15, 10, 0, CARIBBEAN, []]
    },
    "South America": {
        easy: [5, 4, 2_000_000, SOUTH_AMERICA, []],
        medium: [8, 5, 1_000_000, SOUTH_AMERICA, []],
        hard: [10, 5, 500_000, SOUTH_AMERICA, []],
        "very hard": [10, 5, 200_000, SOUTH_AMERICA, [], 1_999_999],
        insane: [15, 6, 100_000, SOUTH_AMERICA, [], 499_999],
        "all cities": [20, 10, 0, SOUTH_AMERICA, []]
    },
    Asia: {
        easy: [5, 4, 5_000_000, ASIA, []],
        medium: [8, 5, 2_000_000, ASIA, []],
        hard: [10, 5, 1_000_000, ASIA, []],
        "very hard": [10, 5, 500_000, ASIA, [], 1_999_999],
        insane: [15, 6, 200_000, ASIA, [], 999_999],
        hell: [15, 6, 100_000, ASIA, [], 499_999],
        "all cities": [20, 10, 0, ASIA, []]
    },
    "Central Asia": {
        easy: [5, 3, 500_000, CENTRAL_ASIA, []],
        medium: [8, 4, 200_000, CENTRAL_ASIA, []],
        hard: [10, 5, 100_000, CENTRAL_ASIA, []],
        "very hard": [10, 6, 0, CENTRAL_ASIA, [], 199_999],
        "all cities": [15, 10, 0, CENTRAL_ASIA, []]
    },
    "Southeast Asia": {
        easy: [5, 4, 2_000_000, SOUTHEAST_ASIA, []],
        medium: [8, 5, 1_000_000, SOUTHEAST_ASIA, []],
        hard: [10, 5, 500_000, SOUTHEAST_ASIA, []],
        "very hard": [10, 5, 200_000, SOUTHEAST_ASIA, [], 999_999],
        insane: [15, 6, 100_000, SOUTHEAST_ASIA, [], 499_999],
        "all cities": [20, 10, 0, SOUTHEAST_ASIA, []]
    },
    India: {
        easy: [5, 4, 3_000_000, INDIA, []],
        medium: [8, 5, 1_000_000, INDIA, []],
        hard: [10, 5, 500_000, INDIA, []],
        "very hard": [10, 5, 200_000, INDIA, [], 999_999],
        insane: [15, 6, 100_000, INDIA, [], 499_999],
        "all cities": [20, 10, 0, INDIA, []]
    },
    Russia: {
        easy: [5, 3, 750_000, RUSSIA, []],
        medium: [8, 4, 300_000, RUSSIA, []],
        hard: [10, 5, 200_000, RUSSIA, []],
        "very hard": [10, 5, 100_000, RUSSIA, [], 499_999],
        insane: [15, 6, 0, RUSSIA, [], 199_999],
        "all cities": [20, 10, 0, RUSSIA, []]
    },
    Oceania: {
        easy: [5, 3, 500_000, OCEANIA, []],
        medium: [8, 4, 200_000, OCEANIA, []],
        hard: [10, 5, 100_000, OCEANIA, []],
        "very hard": [10, 6, 0, OCEANIA, [], 199_999],
        "all cities": [15, 10, 0, OCEANIA, []]
    },
    Africa: {
        easy: [5, 4, 3_000_000, AFRICA, []],
        medium: [8, 5, 1_000_000, AFRICA, []],
        hard: [10, 5, 500_000, AFRICA, []],
        "very hard": [10, 5, 200_000, AFRICA, [], 999_999],
        insane: [15, 6, 100_000, AFRICA, [], 499_999],
        "all cities": [20, 10, 0, AFRICA, []]
    },
    "North Africa": {
        easy: [5, 4, 1_000_000, NORTH_AFRICA, []],
        medium: [8, 5, 500_000, NORTH_AFRICA, []],
        hard: [10, 5, 200_000, NORTH_AFRICA, []],
        "very hard": [10, 5, 100_000, NORTH_AFRICA, [], 499_999],
        insane: [15, 6, 0, NORTH_AFRICA, [], 199_999],
        "all cities": [20, 10, 0, NORTH_AFRICA, []]
    },
    "West Africa": {
        easy: [5, 4, 1_000_000, WEST_AFRICA, []],
        medium: [8, 5, 500_000, WEST_AFRICA, []],
        hard: [10, 5, 200_000, WEST_AFRICA, []],
        "very hard": [10, 5, 100_000, WEST_AFRICA, [], 499_999],
        insane: [15, 6, 0, WEST_AFRICA, [], 199_999],
        "all cities": [20, 10, 0, WEST_AFRICA, []]
    },
    "East Africa": {
        easy: [5, 4, 1_000_000, EAST_AFRICA, []],
        medium: [8, 5, 500_000, EAST_AFRICA, []],
        hard: [10, 5, 200_000, EAST_AFRICA, []],
        "very hard": [10, 5, 100_000, EAST_AFRICA, [], 499_999],
        insane: [15, 6, 0, EAST_AFRICA, [], 199_999],
        "all cities": [20, 10, 0, EAST_AFRICA, []]
    }
}

const flagsFor = (group: string[]): string[] =>
    [...new Set(group)]
        .filter(name => flagCodeMap[name])
        .sort((a, b) => a.localeCompare(b))

export const PRESET_FLAGS: Record<string, string[]> = {
    USA: ["US California"],
    World: ["World"],
    Europe: ["Europe"],
    Nordics: flagsFor(NORDICS),
    China: flagsFor(CHINA),
    "Middle East": flagsFor(MIDDLE_EAST),
    "North America": flagsFor(NORTH_AMERICA),
    Caribbean: flagsFor(CARIBBEAN),
    "South America": flagsFor(SOUTH_AMERICA),
    Asia: flagsFor(ASIA),
    "Central Asia": flagsFor(CENTRAL_ASIA),
    "Southeast Asia": flagsFor(SOUTHEAST_ASIA),
    India: flagsFor(INDIA),
    Russia: flagsFor(RUSSIA),
    Oceania: flagsFor(OCEANIA),
    Africa: flagsFor(AFRICA),
    "North Africa": flagsFor(NORTH_AFRICA),
    "West Africa": flagsFor(WEST_AFRICA),
    "East Africa": flagsFor(EAST_AFRICA)
}

export const applyPreset = (preset: Preset) => {
    cgState.init = {
        length: preset[0],
        allowedIncorrectGuesses: preset[1],
        cityOpts: {
            minPop: preset[2],
            countries: preset[3] === 'all' ? 'all' : new Set(preset[3]),
            continents: preset[4] === 'all' ? 'all' : new Set(preset[4]),
            maxPop: preset[5] ?? Infinity
        }
    }
}

const sameAreas = (
    stored: Set<string> | 'all',
    preset: string[] | 'all',
    everything: string[]
): boolean => {
    const a = stored === 'all' ? new Set(everything) : stored
    const b = preset === 'all' ? new Set(everything) : new Set(preset)
    return a.size === b.size && [...a].every(item => b.has(item))
}

export const storeMatchesPreset = (preset: Preset) => {
    return (
        cgState.init.length === preset[0]
        && cgState.init.allowedIncorrectGuesses === preset[1]
        && cgState.init.cityOpts.minPop === preset[2]
        && sameAreas(cgState.init.cityOpts.countries, preset[3], countries)
        && sameAreas(cgState.init.cityOpts.continents, preset[4], continents)
        && cgState.init.cityOpts.maxPop === (preset[5]??Infinity)
    )
}