import dugscog, {filterObject, forEachDug} from "./d.js";

let d = await dugscog()

// lftg and after
let shownDugs = filterObject(d, (dug) => {
    if (dug.released.year > 2012) return true
    if (dug.released.year > 2011
        &&
        dug.released.month > 7) return true
})

// before lftg
let secretDugs = filterObject(d, (dug) => {
    if (dug.released.year > 2012) return
    if (dug.released.year > 2011
        &&
        dug.released.month > 7) return
    return true
})

// featured
let featuredDugs = filterObject(d, (dug) => {
    return dug.featured
})

export {
    shownDugs,
    secretDugs,
    featuredDugs,
    d
}