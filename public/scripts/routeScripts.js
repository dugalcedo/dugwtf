import { featuredDugs, shownDugs, secretDugs, allDugs } from './dugData.js'
import recs from './recs.js'

import openModal from "./modal.js"

let currentDugName
document.addEventListener('stopPlayer', ()=>{currentDugName = undefined})

const routeScripts = {}

// home
routeScripts.home = () => {
    const featuredEl = _('#featured-dugs')
    Object.values(featuredDugs).reverse().forEach(dug => {
        featuredEl.append(dugCard(dug, 'featured'))
    })
}

// bandcamp
routeScripts.listen = () => {

}

// contact
routeScripts.contact = () => {
    const rows = _('#dug-table_contact tr')
    rows.forEach(row => {
        let cellToCopy = row.querySelector(':scope > td:nth-child(2)')
        let textToCopy = cellToCopy.textContent
        let button = row.querySelector(':scope button')
        button.addEventListener('click', ()=>{
            navigator.clipboard.writeText(textToCopy)
            openModal({
                heading: 'text copied',
                content: `"${textToCopy}" was copied to your clipboard.`,
                hasCancel: false
            })
        })
    })
}

// dugscography
routeScripts.dugscography = () => {

    const dugscogEl = _('#dugscog')
    
    let shownDugsValues = Object.values(shownDugs).reverse()

    let years = new Set(shownDugsValues.map(dug => dug.released.year))

    years.forEach(year => {
        
        dugscogEl.append(createComponent({
            tag: 'h3',
            content: year,
            attr: {
                class: 'calendar-year_heading'
            }
        }))

        let calendarYear = createComponent({
            tag: 'section',
            attr: {
                class: 'calendar-year'
            }
        })

        let months = ['dec', 'nov', 'oct', 'sep', 'aug', 'jul', 'jun', 'may', 'apr', 'mar', 'feb', 'jan']
        months.forEach((month, i) => {
            let mo = 12-i
            let q =
                mo < 3 ? 1 :
                mo < 6 ? 2 :
                mo < 9 ? 3 : 4
            let h =
                mo < 6 ? 1 : 2
            let calendarMonth = createComponent({
                tag: 'section',
                attr: {
                    class: `calendar-month month-${mo} quarter-${q} half-${h}`
                }
            })

            createComponent({
                attr: {class: 'calendar-month_label'},
                content: months[i]
            }, calendarMonth)

            let relevantDugs = shownDugsValues.filter(dug => (
                year === dug.released.year &&
                mo === dug.released.month
            ))

            relevantDugs.forEach(dug => {
                calendarMonth.append(createComponent({
                    tag: 'a',
                    attr: {
                        href: `#dug/${dug.id.replace('DUG','')}`
                    },
                    events: {click: e=>{makeDugLink(e, dug)}},
                    style: {
                        width: 1/relevantDugs.length*100 + '%'
                    },
                    children: [
                        {
                            tag: 'img',
                            attr: {
                                src: `images/acxs/${dug.id}.jpg`
                            },
                        }
                    ]
                }))
            })

            calendarYear.append(calendarMonth)
        })

        dugscogEl.append(calendarYear)
    })
}

// follow
routeScripts.follow = () => {

}

// misc
routeScripts.misc = () => {

}

// dug
routeScripts.dug = (firstTime = true) => {

    // determine whether it should run
    if (!location.hash.startsWith('#dug/')) return
    if (firstTime) {
        window.addEventListener('hashchange', ()=>{routeScripts.dug(false)})
    }
    let incomingDugName = getCurrentDugName()
    if (incomingDugName === currentDugName) return
    currentDugName = incomingDugName

    let dug = allDugs[currentDugName]
    let currentEl = _('#current-dug')
    currentEl.innerHTML = ""
    currentEl.append(dugCard(dug, 'dug'))

    _('main').scrollTo(0, 0)

    //set active player
    let event = new CustomEvent('setActivePlayer', {
        detail: dug
    })
    document.dispatchEvent(event)
}

// about
routeScripts.about = () => {
    let ageSpan = _('#age')
    ageSpan.innerText = calculateTheCurrentAgeOfDugAlcedo()
}

//
routeScripts.recs = () => {
    const recsEl = _('#recs-inner')
    recs.forEach(rec => {
        recsEl.append(createComponent({
            attr: {
                class: 'rec-card'
            },
            content: createBandcampPlayer(rec, false)
        }))
    })
}

export default routeScripts

function getCurrentDugName () {
    return 'ug' + location.hash.replace('#dug/', '')
}

function dugCard(dug, type) {
    switch(type) {
        case "featured":
            return createComponent({
                tag: 'a',
                attr: {
                    class: 'dug featured',
                    href: `#dug/${dug.id.replace('DUG','')}`,
                    tabindex: 0,
                },
                events: {click: e=>{makeDugLink(e, dug)}},
                children: [
                    {
                        tag: 'section',
                        children: [
                            {
                                tag: 'img',
                                attr: {
                                    src: `images/acs/${dug.id}.jpg`
                                }
                            }
                        ]
                    },
                    {
                        tag: 'section',
                        children: [
                            {
                                tag: 'h3',
                                content: dug.title
                            },
                            {
                                tag: 'p',
                                if: dug.artist !== 'dug alcedo',
                                content: 'by ' + dug.artist
                            },
                            {
                                tag: 'time',
                                content: dug.released.simple
                            }
                        ]
                    },
                    {
                        attr: {
                            class: 'top-right'
                        },
                        content: dug.id
                    }
                ]
            })
        case "dug":
            let [prev, next] = getPrevNext()
            return createComponent({
                tag: 'section',
                attr: {
                    class: 'dug current'
                },
                children: [
                    { // ALBUM COVER
                        tag: 'img',
                        attr: {
                            src: `images/acl/${dug.id}.jpg`,
                            id: 'current-dug_img',
                            class: 'collapsed'
                        },
                        events: {
                            load: e => {
                                e.target.originalHeight = e.target.offsetHeight + 'px'
                                e.target.thirdHeight = (e.target.offsetHeight/2) + 'px'
                                e.target.style.height = e.target.thirdHeight
                            },
                            click: e => {
                                e.target.style.height =
                                    e.target.classList.contains('collapsed') ?
                                    e.target.originalHeight : 
                                    e.target.thirdHeight
                                e.target.classList.toggle('collapsed')
                            }
                        }
                    }, // END ALBUM COVER
                    { // BASIC INFO
                        tag: 'section',
                        attr: {
                            id: 'current-dug_basic-info'
                        },
                        children: [
                            { // BASIC INFO, LEFT SIDE
                                tag: 'section',
                                children: [
                                    {
                                        tag: 'h3',
                                        attr: {class: 'i'},
                                        content: dug.title
                                    },
                                    {
                                        tag: 'p',
                                        if: dug.artist !== 'dug alcedo',
                                        content: `by ${dug.artist}`
                                    },
                                    {
                                        tag: 'p',
                                        attr: {class: 'smaller dim'},
                                        content: `${dug.not} tracks, ${dug.length} minutes`
                                    },
                                    {
                                        attr: {class: 'smaller prevnext'},
                                        children: [
                                            {
                                                if: prev,
                                                tag: 'a',
                                                attr: {href: prev},
                                                content: '&#8666; prev'
                                            },
                                            {
                                                if: prev && next,
                                                content: '|'
                                            },
                                            {
                                                if: next,
                                                tag: 'a',
                                                attr: {href: next},
                                                content: 'next &#8667;'
                                            }
                                        ]
                                    },
                                    
                                ]
                            },
                            { // BASIC INFO, RIGHT SIDE
                                tag: 'section',
                                children: [
                                    createSimpleRow('id', dug.id),
                                    createSimpleRow('released', dug.released.simple),
                                    createSimpleRow('recorded', dug.recorded),
                                    {
                                        attr: {class: 'row'},
                                        children: [
                                            {
                                                content: 'location'
                                            },
                                            {
                                                tag: 'span',
                                                attr: {id: 'dug-lctn', title: dug.location},
                                                content: dug.lctn,
                                            },
                                        ]
                                    }
                                ]
                            }
                        ]
                    }, // END BASIC INFO
                    {
                        content: 'loading bandcamp player...',
                        style: {
                            position: 'absolute',
                            zIndex: -1
                        }
                    },
                    {  // PLAYER
                        if: dug.bc,
                        tag: 'section',
                        attr: {id: 'current-dug_player'},
                        content: createBandcampPlayer(dug),
                    },
                    { // EXTRA INFO
                        tag: 'section',
                        attr: {id: 'current-dug_extra-info'},
                        children: [
                            {
                                attr: {id: 'dug-credits'},
                                children: [
                                    {
                                        tag: 'h4',
                                        content: 'credits'
                                    },
                                    ...createCreditsTable(dug)
                                ]
                            }
                        ],
                        
                    }
                ]
            })
        case "dugscography":
            return createComponent({
                content: dug.title
            })
    }
}

function createSimpleRow(title, text) {
    return {
        attr: {
            class: 'row'
        },
        children: [
            {
                content: title
            },
            {
                content: text
            }
        ]
    }
}

function createCreditsTable(dug) {
    let creditsTable = 
        !dug.credits ?
        [createSimpleRow('music & artwork', 'dug alcedo')] :
        dug.credits.map(credit => {
            return createSimpleRow(...credit)
        })
    return creditsTable
}

function createBandcampPlayer(dug, large = true) {
    return  large ? `<iframe style="border: 0; width: 100%; height: ${dug.not*36+150}px;" src="https://bandcamp.com/EmbeddedPlayer/album=${dug.bc}/size=large/bgcol=333333/linkcol=ffffff/artwork=none/transparent=true/" seamless>` :
    `<iframe style="border: 0; width: 100%; height: 120px;" src="https://bandcamp.com/EmbeddedPlayer/album=${dug.bc}/size=large/bgcol=333333/linkcol=ffffff/tracklist=false/artwork=small/transparent=true/" seamless>`
}

function makeDugLink(e, dug) {
    e.preventDefault()
    let anchor = e.currentTarget
    const go = () => {location.hash = `#dug/${dug.id.replace('DUG','')}`}
    let match = currentDugName === dug.id.replace('D','').toLowerCase()

    if (!currentDugName || match) {go(); return}
    
    openModal({
        heading: `are you sure?`,
        content: `this will close the currently active player: ${allDugs[currentDugName].title}.`,
        onConfirm: go
    })
}

function getPrevNext() {
    if (!currentDugName) return [null, null]
    let dugs = Object.entries(allDugs)
    let currentIndex = dugs.findIndex(dug => dug[0] === currentDugName)
    let [prevIndex, nextIndex] = [currentIndex-1, currentIndex+1]
    let prev = prevIndex < 1 ? null : `#dug/${dugs[prevIndex][1].id.replace('DUG','')}`
    let next = nextIndex > dugs.length-1 ? null : `#dug/${dugs[nextIndex][1].id.replace('DUG','')}`
    return [prev, next]
}

checkAnni()
function checkAnni() {
    let today = new Date()
    let thisYear = today.getFullYear()
    let thisMonth = today.getMonth()
    let thisDay = today.getDate()
    let birthdays = []
    Object.values(shownDugs).forEach(dug => {
        let birthday = `${thisYear}/${dug.released.month}/${dug.released.day}`
        let dayDiff = Math.abs(today - new Date(birthday)) / 1000 / 60 / 60 / 24
        let anni = dayDiff < 3.51
        if (anni) birthdays.push(dug)
    })
    
    if (birthdays.length) {
        let content = `the following album(s) have an anniversary:<br><br>`
        birthdays.forEach(dug => {
            content += `
                <div class="birthday">
                    <div>
                        ${dug.title} 
                    </div>
                    <div>
                        ${thisYear - dug.released.year} years old
                    </div>
                </div>
            `
        })
        openModal({
            heading: birthdays.length > 1 ? 'anniversaries' : 'anniversary',
            content,
            hasCancel: false
        })
    }
}
