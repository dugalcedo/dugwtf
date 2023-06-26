document.addEventListener('setActivePlayer', setActivePlayer)
document.addEventListener('changePlayer', changePlayer)

const activePlayer = _('#active-player')

function changePlayer(e) {
    let {
        href
    } = e.detail
}

function setActivePlayer(e) {
    let dug = e.detail
    
    activePlayer.style.backgroundColor = 
        dug.color ?
        '#' + dug.color :
        'black'

    let textColor = 
        dug.invert ?
        'black' :
        'white'

    activePlayer.style.color = textColor

    activePlayer.innerHTML = `
            <span>ACTIVE PLAYER: <i>${dug.title}</i></span>
            <a href="#dug/${dug.id.replace('DUG','')}">
                <button
                style="border: 1px solid ${textColor}; color: ${textColor}"
                >
                    go to player
                </button>
            </a>
            <button onclick="stopPlayer()"
            style="border: 1px solid ${textColor}; color: ${textColor}"
            >
                STOP
            </button>
        `

}
    
function stopPlayer() {
    if (location.hash.startsWith('#dug/')) {
        location.hash = '#'
    }
    let currentEl = _('#current-dug')
    currentEl.innerHTML = ""
    activePlayer.innerHTML = ""
    activePlayer.style.backgroundColor = 'transparent'
    document.dispatchEvent(new CustomEvent('stopPlayer'))
}
