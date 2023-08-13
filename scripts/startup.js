class Component extends HTMLElement {
    constructor() {
        super()
    }

    connectedCallback() {
        fetch(this.getAttribute('src'))
            .then(res => {
                if (!res.ok) {
                    this.classList.add('component-error')
                    return `Error ${res.status}: ${res.statusText}`
                }
                return res.text()
            })
            .then(html => {
                this.innerHTML = html
                let scripts = this.querySelectorAll('script')
                scripts.forEach(script => {
                    eval(script.innerText)
                })
            })
    }
}

customElements.define('dug-component', Component)

class DugsAge extends HTMLElement {
    constructor(){super()}
    connectedCallback(){
        let bday = new Date('1992.06.03')
        let now = new Date()
        this.innerText = Math.floor((now-bday)/1000/60/60/24/365)
    }
}

customElements.define('dug-age', DugsAge)

window.openModal = function(options) {
    const {
        heading = "",
        message,
        x = true,
        ok = false,
        cancel = false,
    } = options

    let backdrop = document.createElement('div')
    backdrop.classList.add('backdrop')
    let modal = document.createElement('div')
    modal.classList.add('modal')

    if (heading) {
        let headingEl = document.createElement('h2')
        headingEl.innerHTML = heading
        modal.append(headingEl)
    }

    if (x) {
        let xBtn = document.createElement('button')
        xBtn.innerText = 'X'
        xBtn.classList.add('x-btn')
        xBtn.addEventListener('click', e=>{e.currentTarget.parentElement.parentElement.remove()})
        modal.append(xBtn)
    }

    let body = document.createElement('p')
    body.classList.add('modal-body')
    body.innerHTML = message
    modal.append(body)

    backdrop.append(modal)
    document.body.append(backdrop)
}

