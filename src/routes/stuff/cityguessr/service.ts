import type { City, CityImageOptions, CityInGame } from "./cgTypes"
import shuffle from "$lib/clientUtils/shuffle"


let fetchedCities: City[] | null = null


export async function getImageUrls(count: number, opts: CityImageOptions): Promise<CityInGame[]> {
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
        return {...city, url, citiesInRect: citiesInFrame(city, cities)}
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

/**
 * How far outside the frame a city can sit and still count as being in the
 * shot, in km. 0 demands its centre be inside the picture; higher forgives ones
 * on the edge, whose built-up area is in frame even though their centre isn't.
 */
const FRAME_MARGIN_KM = 5

/** Web Mercator northing, in metres, for a latitude in degrees. */
const mercatorY = (lat: number) =>
    R * Math.log(Math.tan(Math.PI / 4 + (lat * Math.PI) / 360))

/** Web Mercator easting, in metres, for a longitude in degrees. */
const mercatorX = (lon: number) => R * ((lon * Math.PI) / 180)

/**
 * The square the satellite shot actually covers, in Web Mercator metres —
 * centre plus half-side. Split out from `mapImageUrlForCity` so `citiesInFrame`
 * can ask what's visible without re-deriving the maths.
 */
function frameFor(city: City): { cx: number, cy: number, half: number } {
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

/** A city's own footprint as a Web Mercator box. */
function extentOf(city: City): {
    minX: number, maxX: number, minY: number, maxY: number
} {
    if (city.bounds) {
        return {
            minX: mercatorX(city.bounds.west),
            maxX: mercatorX(city.bounds.east),
            minY: mercatorY(city.bounds.south),
            maxY: mercatorY(city.bounds.north),
        }
    }
    // No envelope in the source — assume a square of the given area. areaKm2 is
    // ground area, so the side has to be inflated by 1/cos(lat) to become
    // Mercator metres.
    const half = ((Math.sqrt(Math.max(city.areaKm2, 1)) * 1000) / 2)
        / Math.max(Math.cos(city.lat * Math.PI / 180), 0.01)
    const x = mercatorX(city.lon)
    const y = mercatorY(city.lat)
    return { minX: x - half, maxX: x + half, minY: y - half, maxY: y + half }
}

/**
 * The other cities you can see in the shot framed on `city`.
 *
 * Overlap is footprint against frame, not centroid against frame. GHS splits a
 * metro wherever built-up density dips, so a fragment like Riverwood — really
 * north-west Atlanta — sits 18km from Atlanta's centroid and would fail a
 * centroid test, even though the Atlanta cluster physically extends across the
 * whole picture. Any part of a city being in shot makes its name an answer.
 *
 * Bounding boxes are a loose stand-in for an irregular cluster, so this errs
 * generous: it can accept a big neighbour on the strength of a rectangle corner
 * over open water. Being too lenient about what counts as a right answer is the
 * cheaper mistake.
 */
function citiesInFrame(city: City, all: City[]): City[] {
    const { cx, cy, half } = frameFor(city)
    // Mercator inflates distances by 1/cos(lat), so the margin has to as well.
    const margin = (FRAME_MARGIN_KM * 1000)
        / Math.max(Math.cos(city.lat * Math.PI / 180), 0.01)
    const reach = half + margin

    const minX = cx - reach
    const maxX = cx + reach
    const minY = cy - reach
    const maxY = cy + reach

    return all.filter(other => {
        if (other.id === city.id) return false
        const e = extentOf(other)
        return e.minX <= maxX && e.maxX >= minX
            && e.minY <= maxY && e.maxY >= minY
    })
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
