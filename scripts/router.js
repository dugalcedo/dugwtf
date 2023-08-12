const mainEl = document.querySelector('main')

handleHashChange()

window.addEventListener('hashchange', handleHashChange)

function handleHashChange() {
    let route = location.hash ?
                location.hash.startsWith('#DUG') ?
                    "dug"
                    :
                    location.hash.replace('#','')
                    :
                'home'
    render(route)
}

function render(route) {
    let el = document.querySelector(`dug-component[route="${route}"]`)
    let components = document.querySelectorAll('main dug-component')
    components.forEach(c => {c.classList.add('hidden')})
    if (el && route == 'dug') {
        el.remove()
        el = null
    }
    if (el) {
        el.classList.remove('hidden')
    } else {
        mainEl.innerHTML += `<dug-component route="${route}" src="/routes/${route}.html"></dug-component>`
    }
}