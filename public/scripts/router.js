import makeShinyLink from "./shinyLink.js"
import routeScripts from "./routeScripts.js"

const main = _('main')

launch()

function launch() {
    checkHash()
    window.addEventListener('hashchange', checkHash)
}

function checkHash() {
    const currentHash = location.hash

    // get route name
    let route
    if (currentHash === "" || currentHash === '#') {
        route = 'home'
    } else {
        route = currentHash.replace('#','')
    }

    if (route.startsWith('dug/')) route = 'dug'
    
    //hide routes
    hideAllRoutes()

    let matchingRoute = _(`#${route}`)
    if (matchingRoute) {
        show(matchingRoute)
    } else {
        createRoute(route)
    }

    unpolishLinks()
    polishLink(route)
}


function hideAllRoutes() {
    let routes = main.querySelectorAll(':scope > *')
    routes.forEach(route => {hide(route)})
}

function polishLink(route) {
    let anchor = _(`a[data-nav="${route}"]`)
    if (!anchor) return
    makeShinyLink(anchor)
    style(anchor, {
        "text-decoration": "underline"
    })
}

function unpolishLinks () {
    let shines = _(`.shine`)
    each(shines, (shine => { shine.remove() }))
    let anchors = _('a[data-nav]')
    each(anchors, (anchor => {
        style(anchor, {
            "text-decoration": "none"
        })
    }))
}

async function createRoute(route) {
    let routeWrapper = document.createElement('div')
    routeWrapper.setAttribute('id', route)

    let html = await fetch(`components/routes/${route}.html`)
    html = await html.text()
    routeWrapper.innerHTML = html
    main.append(routeWrapper)
    routeScripts[route]()
}