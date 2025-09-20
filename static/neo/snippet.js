class NeodugSnippet extends HTMLElement {

    constructor() {
        super()
    }

    connectedCallback() {
        this._load()
    }

    async _load() {
        // check for snippet.html
        try {
            const root = `${window.location.protocol}//${window.location.host}`
            this._folder = `${root}${this.dataset.folder || ""}`
            if (this._folder.endsWith('/')) this._folder = this._folder.slice(0, -1);
            const res = await fetch(`${this._folder}/snippet.html`)
            if (!res.ok) throw `${this._folder}/snippet.html not found.`;
            const text = await res.text();
            this._html = text
        } catch (error) {
            console.error(error)
            return
        }

        // check for before.js
        try {
            await import(`${this._folder}/before.js`)
        } catch (error) {
            console.error(error)
        }

        // load HTML
        this.outerHTML = this._html

        // check for after.js
        try {
            await import(`${this._folder}/after.js`)
        } catch (error) {
            console.error(error)
        }
    }
}

customElements.define('neodug-snippet', NeodugSnippet)