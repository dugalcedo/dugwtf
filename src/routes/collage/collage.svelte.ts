import z from 'zod'

const TicketResultSchema = z.object({
    data: z.object({
        ticket: z.string(),
        estimatedWaitTime: z.number()
    })
})

export type TicketResult = z.infer<typeof TicketResultSchema>;

const AlbumResultSchema = z.object({
    id: z.int(),
    master_id: z.int(),
    title: z.string(),
    cover_image: z.string()
}).strip()

export type AlbumResult = z.infer<typeof AlbumResultSchema>

const ListSchema = z.object({
    name: z.string(),
    albums: z.array(AlbumResultSchema)
})

export type List = z.infer<typeof ListSchema>

const CollageDataSchema = z.object({
    collages: z.array(ListSchema).max(3)
})

export type CollageData = z.infer<typeof CollageDataSchema>

export type CollageStore = {
    data: CollageData,
    selectedCollage: null | string,
    fontSize: number,
    perRow: number,
    titlesToSide: boolean
    extendedWidth: boolean
    gap: number
    roundness: number
    beingMovedIndex: number
}

export const collageStore: CollageStore = $state<CollageStore>({
    data: newCollageData(),
    selectedCollage: null,
    fontSize: 12,
    perRow: 4,
    titlesToSide: true,
    extendedWidth: false,
    gap: 5,
    roundness: 0,
    beingMovedIndex: -1
})

////

function newCollageData(): CollageData {
    return {
        collages: []
    }
}

//// localStorage

export function getCollageDataFromLocalStorage(): {
    error?: string,
    data: CollageData
} {
    const ls = localStorage.getItem('dugwtf::collage')

    if (!ls) return {
        error: "localStorage empty",
        data: newCollageData()
    }

    try {
        const parsed = CollageDataSchema.parse(JSON.parse(ls))
        return { data: parsed }
    } catch (error) {
        return {
            error: (error as any)?.message || "Failed to parse collage data",
            data: newCollageData()
        }
    }
}

export function saveToLocalStorage() {
    CollageDataSchema.parse($state.snapshot(collageStore.data))
    localStorage.setItem('dugwtf::collage', JSON.stringify(collageStore.data))
}


//// mutations

export function addAlbum(album: AlbumResult) {
    album = AlbumResultSchema.parse(album)
    const list = collageStore.data.collages.find(list => list.name === collageStore.selectedCollage)
    if (!list) return
    list.albums.push(album)
    saveToLocalStorage()
}

export function removeAlbum(album: AlbumResult) {
    album = AlbumResultSchema.parse(album)
    const list = collageStore.data.collages.find(list => list.name === collageStore.selectedCollage)
    if (!list) return
    const i = list.albums.findIndex(alb => alb.id == album.id)
    list.albums.splice(i, 1)
    saveToLocalStorage()
}

export function moveAlbum(collage: List, newIndex: number) {
    const albumBeingMoved = collage.albums[collageStore.beingMovedIndex]
    
    // Delete
    collage.albums.splice(collageStore.beingMovedIndex, 1)

    // Make up for deletion
    if (newIndex > collageStore.beingMovedIndex) newIndex--;

    collage.albums.splice(newIndex, 0, albumBeingMoved);


    collageStore.beingMovedIndex = -1
    // saveToLocalStorage()
}

export function addCollage(listName: string) {
    listName = listName.trim().toLowerCase()
    if (collageStore.data.collages.some(list => list.name == listName)) return;
    if (collageStore.data.collages.length >= 3) return;
    collageStore.data.collages.push({ name: listName, albums: [] })
    saveToLocalStorage()
}

export function deleteCollage() {
    const listName = collageStore.selectedCollage
    console.log(`Deleting ${listName}`)
    if (!listName) return
    collageStore.data.collages = collageStore.data.collages.filter(list => list.name != listName)
    saveToLocalStorage()
}
