// @ts-check

/**
 * @typedef NeodugCommentboxComment
 * @property {string} _id
 * @property {string} author
 * @property {string} body
 * @property {string} date
 */

/**
 * @typedef NeodugCommentboxState
 * @property {NeodugCommentboxComment[]} comments
 * @property {number} pageIndex
 * @property {number} perPage
 * @property {boolean} ascending
 * @property {string} fetchError
 * @property {string} addCommentError
 * @property {boolean} fetchLoading
 * @property {boolean} addCommentLoading
 */

 /**
  * @typedef NeodugCommentboxFormData
  * @property {string} author
  * @property {string} body
  * @property {string} commentboxName
  */

class NeodugCommentbox extends HTMLElement {
    originalHTML = ""
    cbCommentsTemplate = ""
    name = ""
    url = "https://dug.wtf"

    /** @type {string | null | undefined} */
    simulateLongLoad = ""

    // STATE
    /** @type {NeodugCommentboxState} */
    state = {
        comments: [],
        pageIndex: 0,
        perPage: 10,
        ascending: false,

        // errors
        fetchError: "",
        addCommentError: "",

        // loading
        fetchLoading: false,
        addCommentLoading: false
    }

    constructor() {
        super()
    }

    // AFTER DOM LOAD
    connectedCallback() {requestAnimationFrame(async () => {
        this.originalHTML = this.innerHTML

        const cbComments = this.qs("cb-comments")
        this.cbCommentsTemplate = cbComments?.innerHTML || ""

        this.state.perPage = Number(this.getAttribute('perpage'))||10

        const ascendingAttr = this.getAttribute('ascending')
        this.state.ascending = ascendingAttr !== null && ascendingAttr !== undefined;

        this.name = this.getAttribute('name') || ""
        if (!this.name) NeodugCommentbox.error("Missing attribute: name")

        this.simulateLongLoad = this.getAttribute('simulatelongload')

        const urlOverride = this.getAttribute('url')
        if (urlOverride) this.url = urlOverride

        await this.fetchComments()
        this.render()
    })}

    // ASYNC 
    async fetchComments() {try{
        this.setLoadingState('fetch', true)
        this.setErrorState('fetch', false)

        if (this.simulateLongLoad) {
            const ms = (Number(this.simulateLongLoad)||0)*1000
            await new Promise(resolve => setTimeout(resolve, ms))
        }

        const url = `${this.url}/api/neodug/commentbox?name=${this.name}`
        const res = await fetch(url)

        if (!res.ok) {
            this.setErrorState('fetch', await NeodugCommentbox.getErrorMessage(res))
            return
        }

        const data = await res.json()

        NeodugCommentbox.log("fetched data:", data)
        const commentbox = data.data
        if (!commentbox) throw { message: "Response data is missing commentbox" }
        const comments = commentbox.comments
        if (!comments) throw { message: "Commentbox in response data is missing a comments array"}
        if (!comments.length) {
            this.state.comments = []
            throw { message: "No comments yet" }
        }

        this.state.comments = comments

    } catch (error) {
        NeodugCommentbox.error(error)
        this.setErrorState('fetch', error?.message || "Something went wrong")
    } finally {
        this.setLoadingState('fetch', false)
        this.render()
    }}

    /**
     * @param {Event & { currentTarget: HTMLFormElement }} e 
     * @returns 
     */
    async handleAddComment(e) {try{
        e.preventDefault()
        this.setLoadingState('addComment', true)
        this.setErrorState('addComment', false)

        const formData = this.getAndValidateFormData(e.currentTarget)

        const url = `${this.url}/api/neodug/comment`
        const options = { method: "POST", body: JSON.stringify(formData) }
        const res = await fetch(url, options)

        if (!res.ok) {
            this.setErrorState('addComment', await NeodugCommentbox.getErrorMessage(res))
            return
        }

        const data = await res.json()
        if (!data.data) throw { message: "Something went wrong" }
        this.state.comments.push(data.data)

    } catch (error) {
        NeodugCommentbox.error(error)
        this.setErrorState('addComment', error.message || "Something went wrong")
    } finally {
        this.setLoadingState('addComment', false)
        this.render()
    }}

    ////// VALIDATION
    /**
     * @param {HTMLFormElement} form 
     * @returns {NeodugCommentboxFormData}
     */
    getAndValidateFormData(form) {
        if (!this.name) throw { message: "Form is missing a name attribute. Register your form at dug.wtf/neo" }

        const fd = new FormData(form)

        const author = fd.get('author')
        const body = fd.get('body')

        if (typeof author !== 'string') throw { message: "Missing input with name='author'" }
        if (typeof body !== 'string') throw { message: "Missing textarea with name='body'" }

        if (author.length < 3 || author.length > 32) throw { message: "Your name must be 3-32 characters" }
        if (body.length < 1 || body.length > 300) throw { message: "Your comment must be 1-300 characters" }

        return { 
            commentboxName: this.name,
            author,
            body
        }
    }

    // DERIVED
    get displayedComments() {
        const displayed = [...this.state.comments]
        displayed.sort((a, b) => {
            const c1 = this.state.ascending ? a : b
            const c2 = this.state.ascending ? b : a
            return new Date(c1.date).getTime() - new Date(c2.date).getTime()
        })
        const start = (this.state.perPage) * (this.state.pageIndex)
        const end = (this.state.perPage) * (this.state.pageIndex+1)
        return displayed
            .slice(start, end)
    }

    get page() {
        return (this.state.pageIndex||0) + 1
    }

    get totalPages() {
        const commentCount = this.state.comments.length;
        return Math.ceil(commentCount/this.state.perPage)
    }

    // RENDERERS
    render() {
        // reset innerHTML to template
        this.innerHTML = this.originalHTML

        // must happen before all other rendering
        this.renderComments()

        // Non cb-comments handlebars
        const handlebars = NeodugCommentbox.getHandlebars(this.innerHTML, this.state)
        for (const { handlebar, value } of handlebars) {
            // @ts-ignore
            this.innerHTML = this.innerHTML.replaceAll(handlebar, value)
        }

        // Pagination buttons
        const prevBtns = this.qsa('*[data-cb-previous]')
        const nextBtns = this.qsa('*[data-cb-next]')
        prevBtns.forEach(btn => {
            if (this.page <= 1) btn.remove()
            else btn.addEventListener('click', () => {
                this.state.pageIndex--
                this.render()
            })
        })
        nextBtns.forEach(btn => {
            if (this.page >= this.totalPages) btn.remove()
            else btn.addEventListener('click', () => {
                this.state.pageIndex++
                this.render()
            })
        })

        // form
        const form = this.qs('form[data-cb-form]')
        if (!form) NeodugCommentbox.error(`No form found with data-cb-form attribute.`)
        form?.addEventListener('submit', this.handleAddComment.bind(this))
    }

    renderComments() {
        const parent = this.qs('cb-comments')
        if (!parent) {
            NeodugCommentbox.error("Missing element: <cb-comments>")
            return
        }
        const html = this.cbCommentsTemplate
        parent.innerHTML = ""
        for (const comment of this.displayedComments) {
            let commentHTML = html
            const handlebars = NeodugCommentbox.getHandlebars(commentHTML, comment)
            for (const { handlebar, value } of handlebars) {
                commentHTML = commentHTML.replace(handlebar, value)
            }
            parent.insertAdjacentHTML('beforeend', commentHTML)
        }
    }

    // SELECTORS
    qs(sel) {return this.querySelector(`:scope ${sel}`)}
    qsa(sel) {return this.querySelectorAll(`:scope ${sel}`)}

    ///// LOADING STATE
    /**
     * toggles classLists for different loading states
     * @param {"fetch" | "addComment"} type 
     * @param {boolean} on 
     */
    setLoadingState(type, on) {
        switch (type) {
            case "fetch":
                this.state.fetchLoading = on
                this.classList[on ? 'add' : 'remove']('ndcb_fetching')
                break
            case "addComment":
                this.state.addCommentLoading = on
                this.classList[on ? 'add' : 'remove']('ndcb_addingComment')
                break
        }
    }

    /**
     * toggles classLists and state for different errors
     * @param {"fetch" | "addComment"} type 
     * @param {string | false} message false disables the error
     */
    setErrorState(type, message) {
        switch (type) {
            case "fetch":
                this.state.fetchError = message || "";
                this.classList[message ? 'add' : 'remove']('ndcb_fetchError')
                break
            case "addComment":
                this.state.addCommentError = message || "";
                this.classList[message ? 'add' : 'remove']('ndcb_addCommentError')
                break
        }
    }


    ////////// STATIC HELPERS

    /**
     * Safely get an error message from an HTTP response
     * @param {Response} res 
     * @returns {Promise<string>}
     */
    static async getErrorMessage(res) {
        let text = ""
        try {
            text = await res.text()
            const data = JSON.parse(text)
            if (typeof data == 'string') return data
            return data.message || "Something went wrong"
        } catch (error) {
            NeodugCommentbox.error(error)
            NeodugCommentbox.error(text)
            return error?.message || error?.statusText || "Something went wrong"
        }
    }

    /**
     * Log
     * @param {string} label 
     * @param {any} data 
     */
    static log(label, data) {
        console.log(
            `%cNEODUG | ${label}`, 
            `
                background-color: aquamarine;
                color: black;
                font-weight: bold;
                font-size: 14px;
                padding: 3px;
            `, 
            data
        )
    }

    /**
     * Log an error
     * @param {any} error 
     */
    static error(error) {
        try {    
            console.error(
                "%cNeodugCommentbox error:", 
                `
                    background-color: maroon;
                    color: white;
                    font-weight: bold;
                    font-size: 14px;
                    padding: 3px;
                `,
                error
            )
            throw new Error(error)
        } catch {}
    }

    /**
     * Display a date in human-friendly format
     * @param {string} dateStr 
     */
    static displayDate(dateStr) {
        const date = new Date(dateStr)
        const pad0 = n => n < 10 ? "0"+n : n;
        const y = date.getFullYear()
        const m = date.getMonth()+1
        const d = date.getDate()
        const h = pad0(date.getHours())
        const min = pad0(date.getMinutes())
        return `${y}/${m}/${d} @ ${h}:${min}`
    }

    /**
     * 
     * @param {string} str 
     * @param {Record<string, any>} obj
     * @returns {{ handlebar: string, key: string, value: any }[]}
     */
    static getHandlebars(str, obj) {
        const handlebars = [...str.matchAll(/\{\{[^{}]+\}\}/gm)].map(m => m[0])
        return handlebars.map(hb => {
            const key = hb.replace('{{','').replace('}}','').trim()
            let value
            switch (key) {
                case 'date':
                    value = NeodugCommentbox.displayDate(obj.date)
                    break
                case 'page':
                    value = (obj.pageIndex||0) + 1
                    break
                case 'totalPages':
                    const commentCount = (obj.comments?.length||0);
                    value = Math.ceil(commentCount/(obj.perPage||0))
                    break
                default:
                    value = obj[key]
                    break
            }
            return { handlebar: hb, key, value }
        })
    }

} // End of class

customElements.define('neodug-commentbox', NeodugCommentbox)

