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