const fs = require('fs')

const allDugs = require('./lib/d.js')

const express = require('express')

const app = express()

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html')
})

app.get('/d', queryParser, (req, res) => {
    if (!req.searching) res.json(allDugs)
    let dugs = Object.values(allDugs)
    
    let errors = []

    let {
        yearRange,
        lengthRange,
        type
    } = req.query

    if (yearRange) {
        let range = yearRange.split('-')
        if (range.length !== 2) errors.push('invalid yearRange')
        else {
            dugs = dugs.filter(dug => {
                let released = new Date(dug.released)
                let year = released.getFullYear()
                return year >= Number(range[0]) && year <= Number(range[1])
            })
        }
    }

    if (lengthRange) {
        let range = lengthRange.split('-')
        if (range.length !== 2) errors.push('invalid lengthRange')
        else {
            dugs = dugs.filter(dug => {
                let len = Number(dug.length.replace('~','').replaceAll('?',''))
                return len >= Number(range[0]) && len <= Number(range[1])
            })
        }
    }

    if (errors.length) {
        res.jsonError(errors.join(', '))
    }

    res.json(dugs)
})

app.get('/map', (req, res) => {
    res.redirect('https://dugalcedo.neocities.org/map.jpg')
})


const PORT = process.env.PORT || 4321
app.listen(PORT, () => { console.log(`PORT: ${PORT}`) })

function queryParser(req, res, next) {
    let { url } = req
    if (!url.includes('?')) {next(); return}
    req.searching = true
    let query = url.slice(url.indexOf('?')+1)
    query = query.split('&').map(pair => {
        let [key, value] = decodeURI(pair).split('=')
        return [key, value]
    })
    req.query = Object.fromEntries(query)

    res.jsonError = message => {res.status(400).json({message})}

    next()
}

function caseMatch(str1, str2) {
    return str1.toLowerCase() === str2.toLowerCase()
}