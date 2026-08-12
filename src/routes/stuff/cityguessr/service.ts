import type { City, CityImageOptions } from "./cgTypes"


let fetchedCities: City[] | null = null


export async function getImageUrls(count: number, opts: CityImageOptions): Promise<(City&{url:string})[]> {
    const cities = await fetchCities()
    if (!cities) return []
    const filtered = shuffle(cities.filter(city => {
        const matchesContinents = (opts.continents === 'all') || opts.continents.has(city.continent)
        const matchesCountries = (opts.countries === 'all') || opts.countries.has(city.country)
        const matchesPop = city.population >= opts.minPop && city.population <= opts.maxPop
        return (matchesContinents || matchesCountries) && matchesPop
    }))
    return filtered.splice(0, count).map(city => {
        const url = mapImageUrlForCity(city)
        return {...city, url}
    })
}


/** Every city in the dataset, not just the ones in play. Cached after the first call. */
export async function fetchCities(): Promise<City[] | null> {
    if (fetchedCities) return fetchedCities
    try {
        fetchedCities = await (await fetch("/data/cg-cities.json")).json()
        return fetchedCities
    } catch (error) {
        console.error("failed fetching cities")
        console.error(error)
        return null
    }
}

const ESRI_WORLD_IMAGERY =
    "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/export"

/** Web Mercator (EPSG:3857) semi-major axis, in metres. */
const R = 6378137

/**
 * How much wider than the city's own extent to frame the shot. 1.0 crops
 * exactly to the urban footprint; higher pulls back to include surrounding
 * coastline/terrain, which is most of what makes a city guessable. This is the
 * dial to turn if shots feel too tight or too far out.
 */
const FRAMING = 1

/** Web Mercator northing, in metres, for a latitude in degrees. */
export const mercatorY = (lat: number) =>
    R * Math.log(Math.tan(Math.PI / 4 + (lat * Math.PI) / 360))

/** Web Mercator easting, in metres, for a longitude in degrees. */
export const mercatorX = (lon: number) => R * ((lon * Math.PI) / 180)

/**
 * The square the satellite shot actually covers, in Web Mercator metres —
 * centre plus half-side. Split out from `mapImageUrlForCity` so the guess
 * checker can ask what's visible in the frame without re-deriving the maths.
 */
export function frameFor(city: City): { cx: number, cy: number, half: number } {
    if (city.bounds) {
        // Frame the city's true extent. Centring on `lat`/`lon` instead would
        // put the cluster's centroid mid-frame, which for an elongated city
        // can push the named town clean out of shot.
        const west = mercatorX(city.bounds.west)
        const east = mercatorX(city.bounds.east)
        const south = mercatorY(city.bounds.south)
        const north = mercatorY(city.bounds.north)

        return {
            cx: (west + east) / 2,
            cy: (south + north) / 2,
            // Square image, so the longer side decides.
            half: (Math.max(east - west, north - south) * FRAMING) / 2,
        }
    }
    // No envelope in the source geometry — fall back to assuming a roughly
    // square city of the given area.
    return {
        cx: mercatorX(city.lon),
        cy: mercatorY(city.lat),
        half: (Math.sqrt(Math.max(city.areaKm2, 1)) * 1000 * FRAMING) / 2,
    }
}

/**
 * Builds a satellite image URL centred on the city.
 *
 * The bbox is sent in Web Mercator metres rather than degrees so a square bbox
 * yields a square image — a square bbox in *degrees* would stretch badly away
 * from the equator, since a degree of longitude shrinks with latitude.
 *
 * Esri World Imagery is free and needs no API key. Same source Dougymander
 * uses, though that one hits the XYZ tile endpoint because it pans.
 */
export function mapImageUrlForCity(city: City, size = 640): string {
    const { cx, cy, half } = frameFor(city)

    const bbox = [cx - half, cy - half, cx + half, cy + half].join(",")

    const params = new URLSearchParams({
        bbox,
        bboxSR: "3857",
        imageSR: "3857",
        size: `${size},${size}`,
        format: "jpg",
        f: "image",
    })

    return `${ESRI_WORLD_IMAGERY}?${params}`
}

function shuffle<T>(arr: T[]): T[] {
    const newArr: T[] = []
    while (arr.length) {
        const r = Math.floor(Math.random()*arr.length)
        newArr.push(arr.splice(r, 1)[0])
    }
    return newArr
}

export const countries = [
    "Afghanistan",
    "Albania",
    "Algeria",
    "Angola",
    "Argentina",
    "Armenia",
    "Aruba",
    "Australia",
    "Austria",
    "Azerbaijan",
    "Bahamas",
    "Bahrain",
    "Bangladesh",
    "Barbados",
    "Belarus",
    "Belgium",
    "Belize",
    "Benin",
    "Bhutan",
    "Bolivia",
    "Bosnia and Herzegovina",
    "Botswana",
    "Brazil",
    "Brunei",
    "Bulgaria",
    "Burkina Faso",
    "Burundi",
    "Cabo Verde",
    "Cambodia",
    "Cameroon",
    "Canada",
    "Central African Republic",
    "Chad",
    "Chile",
    "China",
    "Colombia",
    "Comoros",
    "Costa Rica",
    "Croatia",
    "Cuba",
    "Curaçao",
    "Cyprus",
    "Czechia",
    "Côte d'Ivoire",
    "Democratic Republic of the Congo",
    "Denmark",
    "Djibouti",
    "Dominican Republic",
    "Ecuador",
    "Egypt",
    "El Salvador",
    "Equatorial Guinea",
    "Eritrea",
    "Estonia",
    "Ethiopia",
    "Fiji",
    "Finland",
    "France",
    "French Guiana",
    "French Polynesia",
    "Gabon",
    "Gambia",
    "Georgia",
    "Germany",
    "Ghana",
    "Greece",
    "Guatemala",
    "Guinea",
    "Guinea-Bissau",
    "Guyana",
    "Haiti",
    "Honduras",
    "Hungary",
    "Iceland",
    "India",
    "Indonesia",
    "Iran",
    "Iraq",
    "Ireland",
    "Israel",
    "Italy",
    "Jamaica",
    "Japan",
    "Jersey",
    "Jordan",
    "Kazakhstan",
    "Kenya",
    "Kosovo",
    "Kuwait",
    "Kyrgyzstan",
    "Laos",
    "Latvia",
    "Lebanon",
    "Lesotho",
    "Liberia",
    "Libya",
    "Lithuania",
    "Luxembourg",
    "Madagascar",
    "Malawi",
    "Malaysia",
    "Maldives",
    "Mali",
    "Malta",
    "Martinique",
    "Mauritania",
    "Mauritius",
    "Mayotte",
    "Moldova",
    "Mongolia",
    "Montenegro",
    "Morocco",
    "Mozambique",
    "Myanmar",
    "México",
    "Namibia",
    "Nepal",
    "Netherlands",
    "New Caledonia",
    "New Zealand",
    "Nicaragua",
    "Niger",
    "Nigeria",
    "North Korea",
    "North Macedonia",
    "Northern Cyprus",
    "Norway",
    "Oman",
    "Pakistan",
    "Palestine",
    "Panama",
    "Papua New Guinea",
    "Paraguay",
    "Peru",
    "Philippines",
    "Poland",
    "Portugal",
    "Puerto Rico",
    "Qatar",
    "Republic of the Congo",
    "Romania",
    "Russia",
    "Rwanda",
    "Réunion",
    "Samoa",
    "Saudi Arabia",
    "Senegal",
    "Serbia",
    "Sierra Leone",
    "Singapore",
    "Slovakia",
    "Slovenia",
    "Solomon Islands",
    "Somalia",
    "South Africa",
    "South Korea",
    "South Sudan",
    "Spain",
    "Sri Lanka",
    "Sudan",
    "Suriname",
    "Swaziland",
    "Sweden",
    "Switzerland",
    "Syria",
    "São Tomé and Príncipe",
    "Taiwan",
    "Tajikistan",
    "Tanzania",
    "Thailand",
    "Timor-Leste",
    "Togo",
    "Tonga",
    "Trinidad and Tobago",
    "Tunisia",
    "Turkey",
    "Turkmenistan",
    "Uganda",
    "Ukraine",
    "United Arab Emirates",
    "United Kingdom",
    "United States",
    "Uruguay",
    "Uzbekistan",
    "Vanuatu",
    "Venezuela",
    "Vietnam",
    "Western Sahara",
    "Yemen",
    "Zambia",
    "Zimbabwe"
]

export const countriesExcept = (exclusion: string[]): Set<string> => {
    const set = new Set(countries)
    for (const ex of exclusion) {
        set.delete(ex)
    }
    return set
}

export const continents = [
    "Africa",
    "Asia",
    "Europe",
    "North America",
    "Oceania",
    "South America"
]
