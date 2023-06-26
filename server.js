const fs = require('fs')

const allDugs = require('./lib/d.js')

const express = require('express')

const app = express()

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html')
})

app.get('/d', (req, res) => {
    res.json(allDugs)
})

app.get('/map', (req, res) => {
    res.redirect('https://dugalcedo.neocities.org/map.jpg')
}) 

const PORT = process.env.PORT || 4321
app.listen(PORT, () => { console.log(`PORT: ${PORT}`) })
