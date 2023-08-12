const { readFileSync } = require('fs')
let allDugs = JSON.parse(readFileSync(__dirname+'/d.json', 'utf-8'))
allDugs = filterObject(allDugs)
module.exports = allDugs

function filter(dug) {
    return !dug.hidden
}

function filterObject(obj, callback = filter, reversed = true) {
    let entries = Object.entries(obj)
    return entries.reduce((acc, cv) => {
        if (callback(cv[1])) {
            acc[cv[0]] = cv[1]
        }
        return acc
    }, {})
}


