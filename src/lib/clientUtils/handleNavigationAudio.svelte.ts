import { onMount } from "svelte"
import { onNavigate } from "$app/navigation"
import { page } from "$app/state"
import type { PlaylistKey } from "$lib/clientData/dugs"
import { startPlayingPlaylist, unloadPlaylist } from "$lib/clientData/playDugs.svelte"

/** Routes that play a playlist for as long as you're on them. */
const routePlaylists: { matches: (pathname: string) => boolean, playlist: PlaylistKey }[] = [
    {
        matches: p => p.startsWith('/stuff/cityguessr'),
        playlist: 'ambientForGames'
    }
]

const playlistFor = (pathname: string) =>
    routePlaylists.find(r => r.matches(pathname))?.playlist ?? null

/** The playlist this module owns for the route we're on, started or not. */
let owned: PlaylistKey | null = null
let started = false

/** Removes the armed first-interaction listeners, if any. */
let disarm: null | (() => void) = null

const cancelPendingStart = () => {
    disarm?.()
    disarm = null
}

const start = (playlist: PlaylistKey) => {
    started = true
    startPlayingPlaylist({ key: playlist })
}

/**
 * A hard load into the route hasn't got a user gesture yet, so playing now
 * would just be blocked by autoplay. Wait for the first interaction instead.
 * Client-side navigation doesn't need this — the click that got you here
 * counts.
 */
const startOnFirstInteraction = (playlist: PlaylistKey) => {
    const events = ['pointerdown', 'keydown'] as const

    const onFirst = () => {
        cancelPendingStart()
        start(playlist)
    }

    for (const ev of events) addEventListener(ev, onFirst, { once: true })
    disarm = () => { for (const ev of events) removeEventListener(ev, onFirst) }
}

const syncTo = (pathname: string, viaNavigation: boolean) => {
    const wanted = playlistFor(pathname)

    // Same playlist (or still nothing) — leave it alone, so moving around
    // inside the route doesn't restart the music or undo a manual pause.
    if (wanted === owned) return

    cancelPendingStart()
    if (started) unloadPlaylist()
    owned = wanted
    started = false

    if (!wanted) return

    if (viaNavigation) start(wanted)
    else startOnFirstInteraction(wanted)
}

/**
 * Call once, during setup of the root layout.
 */
export default function handleNavigationAudio() {
    // onNavigate doesn't fire for the page you land on, so seed from the
    // current url. onMount keeps this off the server.
    onMount(() => {
        syncTo(page.url.pathname, false)
        return cancelPendingStart
    })

    onNavigate(nav => {
        if (nav.to) syncTo(nav.to.url.pathname, true)
    })
}
