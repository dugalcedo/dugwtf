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