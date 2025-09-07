export type TicketResult = {
    data: {
        ticket: string,
        estimatedWaitTime: number
    }
}

export type AlbumResult = {
    id: number
    master_id: number
    title: string
    cover_image: string
}

export type CollageAlbum = AlbumResult & {
    tier: string
    badge?: string
}

export type CollageTier = {
    title: string
    color: string
}

export type CollageAlbumWithIndex = CollageAlbum & {
    i: number
}

export type PopulatedCollageTier = CollageTier & {
    albums: CollageAlbumWithIndex[]
}

export type CollageData = {
    tiers: CollageTier[]
    albums: CollageAlbum[]
}

export const defaultCollageData = (): CollageData => ({
    tiers: [],
    albums: []
})

export function isCollageData(input: any): input is CollageData {
    if (input === null) return false
    if (typeof input !== 'object') return false
    if (!Array.isArray(input.tiers)) return false
    if (!Array.isArray(input.albums)) return false
    return true
}

export const getCollageFromLocalStorage = (): CollageData => {
    const ls = localStorage.getItem('dugwtf::collage')
    if (!ls) return defaultCollageData()
    try {
        const collage = JSON.parse(ls)
        if (!isCollageData(collage)) return defaultCollageData()
        return collage
    } catch {
        return defaultCollageData()
    }
}

export const saveCollageToLocalStorage = (collage: CollageData) => {
    localStorage.setItem('dugwtf::collage', JSON.stringify(collage))
}


export type CollageStore = {
    collageData: CollageData
    populatedTiers: PopulatedCollageTier[]
    beingMovedIndex: number
}

export const collageStore = $state<CollageStore>({
    collageData: defaultCollageData(),
    get populatedTiers() {
        const albums: CollageAlbumWithIndex[] = this.collageData.albums.map((alb, i) => ({ ...alb, i }))

        let tiers = this.collageData.tiers.reduce((tiers: PopulatedCollageTier[], tier: CollageTier) => {
            tiers.push({
                ...tier,
                albums: albums.filter(album => album.tier === tier.title)
            })
            return tiers
        }, [])

        const tierTitles = this.collageData.tiers.map(t => t.title)

        tiers = [...tiers, {
            title: 'untiered',
            color: 'transparent',
            albums: albums.filter((album: CollageAlbum) => !tierTitles.includes(album.tier))
        }]

        return tiers
    },
    beingMovedIndex: -1
})


export const addAlbumToCollage = (album: AlbumResult) => {
    collageStore.collageData.albums = [
        ...collageStore.collageData.albums,
        { ...album, tier: "" }
    ]
    saveCollageToLocalStorage(collageStore.collageData)
}

export const removeAlbumFromCollage = (album: AlbumResult | CollageAlbum) => {
    const i = collageStore.collageData.albums.findIndex(alb => alb.id === album.id)
    collageStore.collageData.albums.splice(i, 1)
    saveCollageToLocalStorage(collageStore.collageData)
}

export const moveAlbumInCollage = (currentIndex: number, newIndex: number) => {
    const album = collageStore.collageData.albums[currentIndex]

    if (!album) {
        console.warn("Cannot move album because currentIndex does not match any album.", currentIndex, album)
        return
    }

    if (
        newIndex < 0 
        || newIndex > collageStore.collageData.albums.length
        || !Number.isInteger(newIndex)
    ) {
        console.warn("Cannot move album because newIndex is invalid", newIndex)
        return
    }

    // Get tier
    const newNeighbor = (
        collageStore.collageData.albums[newIndex]
        || collageStore.collageData.albums[newIndex-1]
        || collageStore.collageData.albums[newIndex+1]
        || album
    );
    album.tier = newNeighbor.tier

    // Splice and quit
    collageStore.collageData.albums.splice(currentIndex, 1)
    collageStore.collageData.albums.splice(newIndex > currentIndex ? (newIndex - 1) : newIndex, 0, album)
    collageStore.beingMovedIndex = -1
    saveCollageToLocalStorage(collageStore.collageData)
}

export function createAlbumRows(albums: CollageAlbumWithIndex[], perRow: number) {
    const result: CollageAlbumWithIndex[][] = [];
    const rowCount = Math.ceil(albums.length/perRow)
    for (let i = 0; i < rowCount; i++) {
        const start = i * perRow
        const end = (i+1) * perRow
        result.push(albums.slice(start, end))
    }
    return result
}