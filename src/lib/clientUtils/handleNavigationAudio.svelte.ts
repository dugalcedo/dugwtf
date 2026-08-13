import { onMount } from "svelte"
import { onNavigate } from "$app/navigation"
import { page } from "$app/state"
import type { PlaylistKey } from "$lib/clientData/dugs"
import { startPlayingPlaylist, unloadPlaylist } from "$lib/clientData/playDugs.svelte"
import { closeBcPlayer } from "$lib/stores/bcPlayerStore.svelte"

type RouteAudio = {
    /** Matches this path and everything under it. */
    path?: string
    /** For anything a path prefix can't express. Wins over `path` if both are set. */
    matches?: (pathname: string) => boolean
    /** Plays for as long as you're on the route. */
    playlist?: PlaylistKey
    /** Closes the bandcamp player on arrival, so it can't play over the playlist. */
    closesBcPlayer?: boolean
}

/**
 * What each route does to the audio. First match wins; a route that matches
 * nothing here is left alone. This table is the only thing you should need to
 * edit to add a route.
 */
const routeAudio: RouteAudio[] = [
    {
        path: '/stuff/cityguessr',
        playlist: 'ambientForGames',
        closesBcPlayer: true
    }
]

const matchesRoute = (r: RouteAudio, pathname: string) => {
    if (r.matches) return r.matches(pathname)
    if (!r.path) return false
    return pathname === r.path || pathname.startsWith(r.path + '/')
}

const audioFor = (pathname: string) =>
    routeAudio.find(r => matchesRoute(r, pathname)) ?? null

/** The entry we last acted on, so re-entering a route is distinguishable from moving around inside it. */
let ownedRoute: RouteAudio | null = null

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
    const route = audioFor(pathname)

    // On arrival only — otherwise navigating around inside the route would keep
    // slamming the player shut after you reopened it.
    if (route !== ownedRoute) {
        ownedRoute = route
        if (route?.closesBcPlayer) closeBcPlayer()
    }

    const wanted = route?.playlist ?? null

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
