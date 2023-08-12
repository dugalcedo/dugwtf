let recs = [
    {
        artist: "Sundraz",
        album: "ab initio",
        bc: 88911155,
    },
    {
        artist: "Trees & Flowers",
        album: 'End Time Tapes',
        bc: 53738986
    },
    {
        artist: "Versioning",
        album: 'Untitled LP',
        bc: 1148210618
    },
    {
        artist: "The Rosy Cross",
        album: `Death Angel's Life Song`,
        bc: 3050451037
    },
    {
        artist: 'trashcanid',
        album: 'Trust Fights the Magnet Homecoming',
        bc: 3220324982
    },
    {
        artist: 'WRS',
        album: 'Zone 2',
        bc: 1145834380
    },
    {
        artist: 'Jetski',
        album: 'Reflex Engine',
        bc: 3399969977
    },
    {
        artist: 'This Man and Trees and The Dream Surfers and Flowers',
        album: 'Glossolalia',
        bc: 390051686
    },
    {
        artist: 'Chris Weisman',
        album: `I Hope You're Enjoying Scotland`,
        bc: 503323526
    },
    {
        artist: 'Night Mayor',
        album: 'The World Reacts',
        bc: 1854242179
    },
    {
        artist: 'pilotredsky',
        album: 'Doggone Systems EP',
        bc: 4156175925
    }
]

let shuffled = []

shuffle()
function shuffle(arr = recs) {
    if (!arr.length) return
    let randomNumber = Math.floor(Math.random()*arr.length)
    shuffled.push(arr[randomNumber])
    arr.splice(randomNumber, 1)
    shuffle(arr)
}

export default shuffled