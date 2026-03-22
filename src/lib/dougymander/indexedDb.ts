// ===== TYPES =====

type State = (
    "AL" | "AK" | "AZ" | "AR" | "CA" | "CO" | "CT" | "DE" | "FL" | "GA" |
    "HI" | "ID" | "IL" | "IN" | "IA" | "KS" | "KY" | "LA" | "ME" | "MD" |
    "MA" | "MI" | "MN" | "MS" | "MO" | "MT" | "NE" | "NV" | "NH" | "NJ" |
    "NM" | "NY" | "NC" | "ND" | "OH" | "OK" | "OR" | "PA" | "RI" | "SC" |
    "SD" | "TN" | "TX" | "UT" | "VT" | "VA" | "WA" | "WV" | "WI" | "WY" | 
    "DC" | "AS" | "GU" | "MP" | "PR" | "VI"
)

type ZipCode = {
    zip: string
    city: string
    state: State
    centerLat: number
    centerLng: number
    population: number
    polygons: Array<Array<{lat: number, lng: number}>>
    gridSquares?: string[]
}

// ===== CONSTANTS =====

const DB_NAME = "dougymander-db"
const VERSION = 2
const GRID_SIZE = 0.5

// ===== DB =====

let db: IDBDatabase | null = null

// ===== DB HELPERS =====

export const openDb = async () => {
    if (db) return db;

    db = await new Promise<IDBDatabase>((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, VERSION)

        request.onupgradeneeded = () => {
            const store = request.result.objectStoreNames.contains("zips")
                ? request.transaction!.objectStore("zips")
                : request.result.createObjectStore("zips", { keyPath: "zip" })

            if (!store.indexNames.contains("gridSquares")) {
                store.createIndex("gridSquares", "gridSquares", { multiEntry: true })
            }
        }

        request.onsuccess = () => {
            resolve(request.result)
        }

        request.onerror = () => {
            reject(request.error)
        }
    })

    return db
}

const gridKeysForRect = (minLat: number, minLng: number, maxLat: number, maxLng: number): string[] => {
    const keys: string[] = []
    const minGLat = Math.floor(minLat / GRID_SIZE)
    const maxGLat = Math.floor(maxLat / GRID_SIZE)
    const minGLng = Math.floor(minLng / GRID_SIZE)
    const maxGLng = Math.floor(maxLng / GRID_SIZE)
    for (let gLat = minGLat; gLat <= maxGLat; gLat++) {
        for (let gLng = minGLng; gLng <= maxGLng; gLng++) {
            keys.push(`${gLat}_${gLng}`)
        }
    }
    return keys
}

export const getZipsInRect = async (
    minLat: number,
    minLng: number,
    maxLat: number,
    maxLng: number
): Promise<ZipCode[]> => {
    const db = await openDb()
    const keys = gridKeysForRect(minLat, minLng, maxLat, maxLng)

    return new Promise<ZipCode[]>((resolve, reject) => {
        const transaction = db.transaction("zips", "readonly")
        const index = transaction.objectStore("zips").index("gridSquares")
        const seen = new Set<string>()
        const results: ZipCode[] = []
        let pending = keys.length

        if (pending === 0) {
            resolve(results)
            return
        }

        for (const key of keys) {
            const request = index.getAll(key)

            request.onsuccess = () => {
                for (const zip of request.result as ZipCode[]) {
                    if (
                        !seen.has(zip.zip) &&
                        zip.centerLat >= minLat && zip.centerLat <= maxLat &&
                        zip.centerLng >= minLng && zip.centerLng <= maxLng
                    ) {
                        seen.add(zip.zip)
                        results.push(zip)
                    }
                }
                if (--pending === 0) resolve(results)
            }

            request.onerror = () => reject(request.error)
        }
    })
}

export const indexZipsWithGridSquares = async () => {
    const db = await openDb()

    return new Promise<void>((resolve, reject) => {
        const transaction = db.transaction("zips", "readwrite")
        const store = transaction.objectStore("zips")
        const request = store.openCursor()

        request.onsuccess = (event) => {
            const cursor = (event.target as IDBRequest).result
            if (cursor) {
                const zip: ZipCode = cursor.value

                const gridSquares = new Set<string>()

                for (const polygon of zip.polygons) {
                    if (polygon.length === 0) continue

                    const lats = polygon.map(p => p.lat)
                    const lngs = polygon.map(p => p.lng)
                    const minGridLat = Math.floor(Math.min(...lats) / GRID_SIZE)
                    const maxGridLat = Math.floor(Math.max(...lats) / GRID_SIZE)
                    const minGridLng = Math.floor(Math.min(...lngs) / GRID_SIZE)
                    const maxGridLng = Math.floor(Math.max(...lngs) / GRID_SIZE)

                    for (let gLat = minGridLat; gLat <= maxGridLat; gLat++) {
                        for (let gLng = minGridLng; gLng <= maxGridLng; gLng++) {
                            gridSquares.add(`${gLat}_${gLng}`)
                        }
                    }
                }

                cursor.update({ ...zip, gridSquares: Array.from(gridSquares) })
                cursor.continue()
            } else {
                resolve()
            }
        }

        request.onerror = () => { reject(request.error) }
        transaction.onerror = () => { reject(transaction.error) }
    })
}

/*
    This function should insert the given zips and then index them by grid-squares.
    Is it doing that? Not yet, but it should be easy to add the grid-square indexing after we have the basic insertion working.
*/
export const insertZips = async (zips: ZipCode[]) => {
    const db = await openDb()

    return new Promise<void>((resolve, reject) => {
        const transaction = db.transaction("zips", "readwrite")
        const store = transaction.objectStore("zips")

        zips.forEach(zip => {
            store.put(zip)
        })

        transaction.oncomplete = () => {
            resolve()
        }

        transaction.onerror = () => {
            reject(transaction.error)
        }
    })
}
