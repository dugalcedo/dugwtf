const seasons = [
    'winter',
    'spring',
    'summer',
    'fall',
    'end of'
]

function generateBandcampCode(dug) {
    let not = dug.NOT || dug.NOT_EST_HIGH
    return `<iframe style="border: 0; width: 100%; height: ${130+35*Number(not)}px;" src="https://bandcamp.com/EmbeddedPlayer/album=${dug["BANDCAMP ID"]}/size=large/bgcol=333333/linkcol=ffffff/artwork=none/transparent=true/" seamless></iframe>`
}

function padStart(str, length=2, char='0') {
    if (str.length < length) {
        for (let i = 0; i < length-str.length; i++) {
            str = char + str
        }
    }
    return str
}

class Dug {
    constructor(album) {
        Object.entries(album).forEach(([k,v]) => {
            this[k] = v
        })
    }

    get cover() {
        return {
            xs: `/images/acxs/${this.ID}.jpg`,
            s: `/images/acs/${this.ID}.jpg`,
            l: `/images/acl/${this.ID}.jpg`,
            alt: `album cover for ${this.TITLE} by ${this.ARTIST || 'dug alcedo'}`
        }
    }

    get date() {
        let releasedDisplay = this.YEAR
        if (this.MONTH) {
            releasedDisplay += '.' + padStart(this.MONTH)
            if (this.DAY) {
                releasedDisplay += '.' + padStart(this.DAY)
            }
        } else if (this.SEASON) {
            releasedDisplay = `${seasons[this.SEASON]} ${releasedDisplay}`
        }
        let releaseDate = new Date(releasedDisplay)
        
        // rs = recording start
        let rsDisplay = this.RS_YEAR || this.YEAR
        if (this.RS_MONTH) {
            rsDisplay += '.' + padStart(this.RS_MONTH)
        } else if (this.RS_SEASON) {
            rsDisplay = `${seasons[this.RS_SEASON]} ${rsDisplay}`
        }

        // re = recording end
        let reDisplay = this.RE_YEAR || this.YEAR
        if (this.RE_MONTH) {
            reDisplay += '.' + padStart(this.RE_MONTH)
        } else if (this.RE_SEASON) {
            reDisplay = `${seasons[this.RE_SEASON]} ${reDisplay}`
        } else reDisplay = null

        let recordedDisplay = `${rsDisplay}${reDisplay ? ` to ${reDisplay}`:``} in <span class="av_loc" title="SHM=Stockholm\nTAC=Tacoma,WA\nGOL=Golden,CO\nLAK=Lakewood,CO\nCAT=CathedralCity,CA\nBGO=BorregoSprings,CA\nASH=Asheville,NC\nWFN=Woodfin,NC\nSDG=SanDiego,CA\nMUR=Murrieta,CA\nTEM=Temecula,CA\nCDY=Cody,WY">${this.LOCATION}</span>`

        return {
            released: {
                display: releasedDisplay,
                date: releaseDate
            },
            recorded: {
                display: recordedDisplay
            }
        }
    }

    get len() {
        return (this.LEN || `~${this.LEN_EST_LOW}-${this.LEN_EST_HIGH}`) + ' minutes'
    }

    get not() {
        return (this.NOT || `~${this.NOT_EST_LOW}-${this.NOT_EST_HIGH}`) + ' tracks'
    }

    get bc() {
        return generateBandcampCode(this)
    }
}

export default async function d() {
    let csv = await fetch('/scripts/d.tsv')
    csv = await csv.text()
    let rows = csv.split('\n').map(r => r.split('\t').map(x => x.replace('\r','')))
    let headings = rows[0]
    rows = rows.slice(1)

    // convert rows to albums
    let albums = rows.map(r => {
        let album = {}
        headings.forEach((h, i) => {
            album[h] = r[i]
        })
        return new Dug(album)
    }).reverse()

    // filter albums
    albums = albums.filter(album => {
        return album.H != 'TRUE'
    })

    return {
        all: albums,
        featured: albums.filter(x => x.F == 'TRUE'),
        listed: albums.filter(x => x.ERA != 'child')
    }
}

//test
// d().then(x => {console.log(x)})