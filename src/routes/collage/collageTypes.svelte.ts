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

export type PopulatedCollageTier = CollageTier & {
    albums: CollageAlbum[]
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
    tiers: PopulatedCollageTier[]
}

export const collageStore = $state<CollageStore>({
    collageData: defaultCollageData(),
    get tiers() {
        let tiers = this.collageData.tiers.reduce((tiers: PopulatedCollageTier[], tier: CollageTier) => {
            tiers.push({
                ...tier,
                albums: this.collageData.albums.filter(album => album.tier === tier.title)
            })
            return tiers
        }, [])

        const tierTitles = this.collageData.tiers.map(t => t.title)

        return [...tiers, {
            title: 'untiered',
            color: 'transparent',
            albums: this.collageData.albums.filter((album: CollageAlbum) => !tierTitles.includes(album.tier))
        }]
    }
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