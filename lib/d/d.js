import { ReleaseDate } from './dugdate.js';

const getDugscog = async () => {
    let dugscog = await fetch('scripts/d/d.json')
    dugscog = await dugscog.json()
    return dugscog
}

const forEachDug = (arr, cb) => { Object.entries(arr).forEach(([key, value], i) => { cb(key, value, i) }) }



function stringifyD() {
    let result = {...d}
    forEachDug(result, (key, value) => {
        result[key].released = result[key].released.date
    })
    return JSON.stringify(result)
}

function filter(dug) {
    return !dug.hidden
}

function filterObject(obj, callback, reversed = true) {
    let entries = Object.entries(obj)
    return entries.reduce((acc, cv) => {
        if (callback(cv[1])) {
            acc[cv[0]] = cv[1]
        }
        return acc
    }, {})
}


const d = async () => {
    let result = await getDugscog()
    forEachDug(result, (key, value) => {
        result[key].released = new ReleaseDate(result[key].released)
    })
    result = filterObject(result, filter)
    return result
}

export default d
export { filterObject, forEachDug }