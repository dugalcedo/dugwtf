const INTERVAL = 125

function makeShinyLink(el) {
    style(el, {
        position: 'relative',
    })
    let content = el.innerText
    let shine = document.createElement('div')
    shine.classList.add('shine')
    let chars = content.split('')
    chars.forEach((char, i) => {
        let charSpan = document.createElement('span')
        charSpan.innerText = char
        style(charSpan, {
            color: 'white',
            opacity: 0
        })
        setTimeout(() => {
            setInterval(() => {
                style(charSpan, {opacity: 0.5})
            }, chars.length*INTERVAL);
            setTimeout(() => {
                setInterval(() => {
                    style(charSpan, {opacity: 0})
                }, chars.length*INTERVAL);
            }, INTERVAL);
        }, i*INTERVAL);
        shine.append(charSpan)
    })
    el.append(shine)
}

export default makeShinyLink