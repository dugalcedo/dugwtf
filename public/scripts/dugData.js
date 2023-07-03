import {ReleaseDate} from './dugdate.js'
let allDugs = await fetch('/d')
allDugs = await allDugs.json()

const objectForEach = (arr, cb) => { Object.entries(arr).forEach(([key, value], i) => { cb(key, value, i) }) }
objectForEach(allDugs, (key, value) => {allDugs[key].released = new ReleaseDate(allDugs[key].released)})

// lftg and after
let shownDugs = filterObject(allDugs, (dug) => {
    if (dug.released.year > 2012) return true
    if (dug.released.year > 2011
        &&
        dug.released.month > 7) return true
})

// before lftg
let secretDugs = filterObject(allDugs, (dug) => {
    if (dug.released.year > 2012) return
    if (dug.released.year > 2011
        &&
        dug.released.month > 7) return
        return true
})

// featured
let featuredDugs = filterObject(allDugs, (dug) => {
    return dug.featured
})

export {allDugs, featuredDugs, shownDugs, secretDugs}

function filterObject(obj, callback = filter, reversed = true) {
    let entries = Object.entries(obj)
    return entries.reduce((acc, cv) => {
        if (callback(cv[1])) {
            acc[cv[0]] = cv[1]
        }
        return acc
    }, {})
}