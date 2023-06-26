const months = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december']

const toMonth = n => months[parseInt(n)-1]

const isSeason = s => s == 'winter' || s == 'spring' || s == 'summer' || s == 'fall' || s == 'autumn'

const isVagueTime = s => s == 'early' || s == 'mid' || s == 'late'

function setReleaseYear(instance, year) {
    year = parseInt(year)

    if (isNaN(year)) {
        console.error('ReleaseDate error: attempted to parse year and it became NaN.')
        return
    }

    instance.year = year
    instance.y = year
}

function setRelaseMonth(instance, month) {
    instance.month = month
    let m = parseInt(month)
    
    if (isNaN(m)) {
        setVagueMonth(instance, month)
    } 
    
    else {
        instance.m = m
    }
}

function setRelaseDay(instance, day) {
    instance.day = day
    let d = parseInt(day)
    if (isNaN(d)) {
        setVagueDay(instance, day)
    }

    else {
        instance.d = d
    }
}

function setVagueMonth(instance, month) {
    switch(month) {
        case "":
        case null:
        case undefined:
        case '?':
        case '??':
        case '???':
        case 'early':
            instance.m = 3
            break
        case 'winter':
            instance.m = 2
            break
        case 'spring':
            instance.m = 5
            break
        case "mid":
            instance.m = 7
            break
        case 'summer':
            instance.m = 8
            break
        case 'late':
            instance.m = 11
            break
        case 'fall':
        case 'autumn':
            instance.m = 11
        default:
            instance.m = 1
            console.error('ReleaseDate error: invalid month given')
            break
    }
}

function setVagueDay(instance, day) {
    switch(day) {
        case "":
        case null:
        case undefined:
        case '?':
        case '??':
        case '???':
        case 'early':
            instance.d = 1
            break
        case 'early':
            instance.d = 7
            break
        case 'mid':
            instance.d = 14
            break
        case 'late':
            instance.d = 21
            break
        default:
            instance.d = 1
            console.error('ReleaseDate error: invalid day given')
            break
    }
}

class ReleaseDate {
    constructor(year, month, day) {
        if (year && month && day) {
            setReleaseYear(this, year)
            setRelaseMonth(this, month)
            setRelaseDay(this, day)
        } else {
            let released = new Date(year)
            setReleaseYear(this, released.getFullYear())
            setRelaseMonth(this, released.getMonth()+1)
            setRelaseDay(this, released.getDate())
        }
    }

    get simple() {
        return `${this.y}/${ReleaseDate.pad(this.m)}/${ReleaseDate.pad(this.d)}`
    }

    get date() {
        return new Date(this.simple)
    }

    static pad(n) {
        return n < 10 ? '0'+n : n
    }
}

module.exports = ReleaseDate