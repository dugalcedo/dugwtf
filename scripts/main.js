import "./router.js"

window.currentDate = new Date()

window.addEventListener('dugsLoaded', ()=>{
    let annis = []
    dugs.listed.forEach(dug => {
        let diff = currentDate-dug.date.released.date
        let years = diff/1000/60/60/24/365
        let age = Math.round(years)
        let prox = age - years
        let fyllerAr = Math.abs(prox) < 0.017
        if (fyllerAr) {
            annis.push([dug, age])
        }
    })
    if (annis.length) {
        let message = `the following album${annis.length>1?'s have anniversaries':' has an anniversary'}:`
        annis.forEach(([dug, age]) => {
            message += `<div class="anni">
                            <span>${dug.TITLE}</span>
                            <span>${age} year${age>1?'s':''}</span>
                            <span>${dug.date.released.display}</span>
                        </div>`
        })
        openModal({
            heading: 'album anniversaries',
            message
        })
    }
})