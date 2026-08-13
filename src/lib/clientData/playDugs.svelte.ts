import { type Dug, type DugTrack, type PlaylistKey, playlists, playlistTupleToTrack } from "./dugs"
import shuffle from "$lib/clientUtils/shuffle"

export type PlaylistItem = {
    url: string,
    el: HTMLAudioElement,
    /** The album the song came from — cover art, artist, bandcamp link, etc. */
    dug: Dug,
    track: DugTrack,
    trackNo: number
}

type PlayDugsStore = {
    visible: boolean
    playing: boolean
    playlistKey: null | PlaylistKey
    playlist: null | PlaylistItem[]
    playingIndex: number
    /** Always dugPlayer.playlist[dugPlayer.playingIndex]. Never assign it directly. */
    nowPlaying: null | PlaylistItem
}

const audioElementCache = new Map<string, HTMLAudioElement>()

/** Playlists are background music, so they sit well under everything else. */
const VOLUME = 0.25

export const dugPlayer = $state<PlayDugsStore>({
    visible: false,
    playing: false,
    playlistKey: null,
    playlist: null,
    playingIndex: 0,
    nowPlaying: null
})

/**
 * The only writer of playingIndex, so nowPlaying can't drift out of sync with it.
 */
const setPlayingIndex = (i: number) => {
    dugPlayer.playingIndex = i
    dugPlayer.nowPlaying = dugPlayer.playlist?.[i] ?? null
}

/** Guards against a playlist of dead urls looping forever through onerror. */
let consecutiveErrors = 0

const ensureClient = () => {
    if (!(globalThis as any).Audio) throw new Error("cannot be called server-side")
}

export const loadSong = (url: string) => {
    ensureClient()
    const existing = audioElementCache.get(url)
    if (existing) return existing
    const el = new Audio(url)
    el.volume = VOLUME
    // A playlist builds every element up front; without this each one would
    // start fetching from R2 immediately. The next song is preloaded on play.
    el.preload = "none"
    audioElementCache.set(url, el)
    return el
}

/**
 * The one place that pauses. Elements are cached and shared between playlists,
 * so "only one song at a time" has to be enforced across the whole cache, not
 * just the current playlist.
 */
const pauseAllExcept = (keep?: HTMLAudioElement) => {
    for (const el of audioElementCache.values()) {
        if (el === keep || el.paused) continue
        el.pause()
    }
}

const play = (el: HTMLAudioElement) => {
    el.play()?.catch(err => {
        // A song we've already moved on from — pauseAllExcept aborts a play()
        // that hasn't resolved yet, which is routine when skipping.
        if (getNowPlaying()?.el !== el) return

        // Otherwise the store must not go on claiming to be playing. Usually
        // this is autoplay being blocked outside a user gesture.
        dugPlayer.playing = false
        if (err?.name !== "AbortError") console.warn("could not play song:", el.src, err)
    })
}

export const loadPlaylist = (key: PlaylistKey) => {
    ensureClient()

    const playlist = playlists[key]
    if (!playlist) {
        console.warn("no playlist with this key:", key)
        return false
    }

    pauseAllExcept()
    dugPlayer.playing = false
    dugPlayer.playlistKey = key
    dugPlayer.playlist = []
    setPlayingIndex(0)
    consecutiveErrors = 0

    for (const tuple of shuffle(playlist)) {
        const resolved = playlistTupleToTrack(tuple)
        if (!resolved) {
            console.warn(`could not load this song:`, tuple)
            continue
        }
        dugPlayer.playlist.push({
            url: resolved.url,
            el: loadSong(resolved.url),
            dug: resolved.album,
            track: resolved.track,
            trackNo: resolved.trackNo
        })
    }

    setPlayingIndex(0)
    armPlaylistItemsWithListeners()
    return dugPlayer.playlist.length > 0
}

export type PlayPlaylistOptions = {
    key: PlaylistKey
    visible?: boolean
}

export const startPlayingPlaylist = (opts: PlayPlaylistOptions) => {
    dugPlayer.visible = opts.visible ?? false

    if (!loadPlaylist(opts.key)) {
        console.warn("no playable songs in this playlist:", opts.key)
        return
    }

    playCurrentSong(true)
}

/**
 * @param force if the song is already playing, start it over
 */
export const playCurrentSong = (force?: boolean) => {
    if (!dugPlayer.playlist?.length) {
        console.warn("cannot play current song because there is no playlist", $state.snapshot(dugPlayer))
        return
    }

    // wrap if out of range
    if (dugPlayer.playingIndex < 0 || dugPlayer.playingIndex >= dugPlayer.playlist.length) {
        setPlayingIndex(0)
    }

    const item = dugPlayer.playlist[dugPlayer.playingIndex]!
    pauseAllExcept(item.el)

    if (!item.el.paused && !force) return

    // Elements are cached, so one that has been heard before is sitting at its
    // end. Every start through here is a start from the top; unpause() resumes.
    if (item.el.currentTime > 0) item.el.currentTime = 0

    play(item.el)
}

export const playNextSong = () => {
    if (!dugPlayer.playlist?.length) return
    setPlayingIndex((dugPlayer.playingIndex + 1) % dugPlayer.playlist.length)
    playCurrentSong(true)
}

export const playPrevSong = () => {
    if (!dugPlayer.playlist?.length) return
    setPlayingIndex((dugPlayer.playingIndex + dugPlayer.playlist.length - 1) % dugPlayer.playlist.length)
    playCurrentSong(true)
}

export const pause = () => {
    const np = getNowPlaying()
    if (!np) return;
    np.el.pause()
    dugPlayer.playing = false
}

export const unpause = () => {
    const np = getNowPlaying()
    if (!np) return;
    pauseAllExcept(np.el)
    play(np.el)
}

/** Stop, and rewind the playlist to its first song. */
export const stop = () => {
    pauseAllExcept()
    dugPlayer.playing = false
    setPlayingIndex(0)
}

/** Stop and forget the playlist entirely. The next load reshuffles it. */
export const unloadPlaylist = () => {
    stop()
    dugPlayer.playlist = null
    dugPlayer.playlistKey = null
    dugPlayer.visible = false
    setPlayingIndex(0) // the playlist is gone, so this clears nowPlaying
}

export const getNowPlaying = () => dugPlayer.nowPlaying

export const armPlaylistItemsWithListeners = () => {
    if (!dugPlayer.playlist) return

    for (const item of dugPlayer.playlist) {
        item.el.onplay = () => handlePlay(item)
        item.el.onended = () => handleEnded(item)
        item.el.onpause = () => handlePause(item)
        item.el.onerror = () => handleError(item)
    }
}

/** Fetch the next song while the current one plays, to keep the gap short. */
const preloadNext = () => {
    const pl = dugPlayer.playlist
    if (!pl?.length) return

    const current = pl[dugPlayer.playingIndex]
    const next = pl[(dugPlayer.playingIndex + 1) % pl.length]
    if (!next || next.el === current?.el || next.el.preload === "auto") return

    next.el.preload = "auto"
    next.el.load()
}

const indexOfItem = (item: PlaylistItem) =>
    dugPlayer.playlist?.findIndex(i => i.el === item.el) ?? -1

// --- listeners ---

const handlePlay = (item: PlaylistItem) => {
    // Also catches a play started from outside this module (media keys, devtools),
    // which is why the index is taken from the element rather than assumed.
    const i = indexOfItem(item)
    if (i !== -1) setPlayingIndex(i)

    dugPlayer.playing = true
    consecutiveErrors = 0
    preloadNext()
}

const handleEnded = (item: PlaylistItem) => {
    playNextSong()
}

const handlePause = (item: PlaylistItem) => {
    // Ignore the outgoing song being paused to make way for the next one.
    if (getNowPlaying()?.el !== item.el) return
    dugPlayer.playing = false
}

const handleError = (item: PlaylistItem) => {
    console.warn("could not load this song:", item.url, item.el.error?.message)

    consecutiveErrors++
    if (consecutiveErrors >= (dugPlayer.playlist?.length ?? 0)) {
        console.warn("every song in this playlist failed to load, stopping")
        stop()
        return
    }

    playNextSong()
}
