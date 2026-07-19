export type DugTrack = {
  title: string
  minutes: number
  seconds: number
}

export type Dug = {
    artist: string
    // artist_gulb: string
    title: string
    // title_gulb: string
    id: string
    year: number
    type: string
    bc_id: string
    bc_link: string
    cover_s: string
    cover_l: string
    desc?: string,
    date?: string,
    songCanLoad?: boolean
    sample_bc_id?: string
    desc_long?: string
    label?: string,
    credits?: Record<string, string[]>
    hasIcon?: boolean
    wau?: string
    tracklist: DugTrack[]
}

export const dugs: Record<string, Dug> = {
  "NULL": {
    "artist": "NULL",
    "title": "NULL",
    "id": "NULL",
    "year": 0,
    "type": "NULL",
    "bc_id": "NULL",
    "bc_link": "NULL",
    "cover_l": "NULL",
    "cover_s": "NULL",
    "date": "NULL",
    "label": "NULL",
    "tracklist": []
  },
  "Crank Historic": {
    "artist": "Dew for Slug",
    "title": "Crank Historic",
    "id": "DUG044b",
    "year": 2025,
    "type": "EP",
    "bc_id": "1327450129",
    "bc_link": "https://pelagoramrecordings.bandcamp.com/album/crank-historic",
    "cover_l": "/images/acl/DUG044b.jpg",
    "cover_s": "/images/acs/DUG044b.jpg",
    "date": "2025-09-28",
    "label": "pelagoram recordings",
    "credits": {
      "songwriting": [
        "dug alcedo",
        "thos f"
      ],
      "electronics, mixing": [
        "dug alcedo"
      ],
      "lyrics, vocals, guitar": [
        "thos f"
      ],
      "artwork": [
        "stevie clue"
      ],
      "cover layout": [
        "thos f"
      ]
    },
    hasIcon: true,
    wau: "fIv soq$ I mAd wx mI frend tom. I rOt Dx soq$ and tom add£ stuf lIk vO'kxl$ and gi'tor tx Dem. kInd xv lIk Dx opxsit xv wxt wE did fxr \"I-15 drEm\".",
    "tracklist": [
      { "title": "Costco Queen", "minutes": 4, "seconds": 4 },
      { "title": "Mink Hat", "minutes": 4, "seconds": 37 },
      { "title": "Crank Historic", "minutes": 7, "seconds": 34 },
      { "title": "The Beam", "minutes": 3, "seconds": 35 },
      { "title": "Tipsy", "minutes": 4, "seconds": 34 }
    ]
  },
  "Humans": {
    "artist": "Dug Alcedo",
    "title": "Humans",
    "id": "DUG044",
    "year": 2024,
    "type": "album",
    "bc_id": "1827608274",
    "bc_link": "https://dugalcedo.bandcamp.com/album/humans",
    "cover_s": "/images/acxs/DUG044.jpg",
    "cover_l": "/images/acl/DUG044.jpg",
    "date": "2024-04-28",
    "credits": {
      "music": [
        "dug alcedo"
      ],
      "artwork": [
        "rural coyote (@suburbmagpie)"
      ]
    },
    "hasIcon": true,
    wau: `mAd in stokkhOlm dxrq x tIm wen I felt prxtE un'in'spIr£, myU'zik'lE. ol'sO fEl'q lots xv Aqgxr xnd frustrA'Sxn.`,
    "tracklist": [
      { "title": "hard rock", "minutes": 4, "seconds": 33 },
      { "title": "grimmer", "minutes": 4, "seconds": 5 },
      { "title": "Det som önskas", "minutes": 9, "seconds": 58 },
      { "title": "Military Helicopters over Golden, Colorado", "minutes": 7, "seconds": 19 },
      { "title": "Flashback 1", "minutes": 5, "seconds": 34 },
      { "title": "Flashback 2", "minutes": 5, "seconds": 30 },
      { "title": "nopilot", "minutes": 2, "seconds": 57 },
      { "title": "Dog the Bounty Hunter", "minutes": 4, "seconds": 52 },
      { "title": "xie", "minutes": 2, "seconds": 50 },
      { "title": "Voiceless Schwa", "minutes": 8, "seconds": 17 },
      { "title": "foreign storage", "minutes": 4, "seconds": 31 },
      { "title": "Demiurge", "minutes": 5, "seconds": 27 }
    ]
  },
  "A Piece Of Hell For Ourselves": {
    "artist": "Trees and Flowers",
    "title": "A Piece Of Hell For Ourselves",
    "id": "CL001",
    "year": 2023,
    "type": "album",
    "bc_id": "343067011",
    "bc_link": "https://pelagoramrecordings.bandcamp.com/album/a-piece-of-hell-for-ourselves",
    "cover_s": "/images/acxs/CL001.jpg",
    "cover_l": "/images/acl/CL001.jpg",
    "date": "2023-12-01",
    "label": "pelagoram recordings",
    "credits": {
      "written, recorded, performed": [
        "thos f"
      ],
      "production and additional arrangements": [
        "dug alcedo"
      ],
      "artwork": [
        "flapricot"
      ]
    },
    hasIcon: true,
    wau: "x sO'lO albxm bI mI frend tom Dat I prx'dUs£.",
    "tracklist": [
      { "title": "Priapus Auspice is Getting Back Together!", "minutes": 3, "seconds": 13 },
      { "title": "Like Lucy Says (The Story of Another Artist)", "minutes": 4, "seconds": 7 },
      { "title": "Night Ride to Lehi", "minutes": 2, "seconds": 56 },
      { "title": "Ballad of a Gay Republican", "minutes": 3, "seconds": 27 },
      { "title": "Let's Deflect!", "minutes": 2, "seconds": 45 },
      { "title": "You Don't Smoke Anymore", "minutes": 3, "seconds": 46 },
      { "title": "Set My Hair on Fire Again", "minutes": 3, "seconds": 18 },
      { "title": "Empty World", "minutes": 2, "seconds": 53 },
      { "title": "Sound Check", "minutes": 5, "seconds": 21 },
      { "title": "Priapus Auspice Takes the Stage!", "minutes": 2, "seconds": 38 }
    ]
  },
  "Goos Beyond": {
    "artist": "Dug Alcedo",
    "title": "Goos Beyond",
    "id": "DUG043",
    "year": 2022,
    "type": "album",
    "bc_id": "3909499862",
    "bc_link": "https://dugalcedo.bandcamp.com/album/goos-beyond",
    "cover_s": "/images/acxs/DUG043.jpg",
    "cover_l": "/images/acl/DUG043.jpg",
    "desc": "ambience and noise",
    "songCanLoad": true,
    hasIcon: true,
    "tracklist": [
      { "title": "veiled cataphract", "minutes": 6, "seconds": 9 },
      { "title": "veiled cataphract", "minutes": 4, "seconds": 34 },
      { "title": "amie eros aflame", "minutes": 3, "seconds": 34 },
      { "title": "amie eros aflame", "minutes": 2, "seconds": 8 },
      { "title": "reversi", "minutes": 3, "seconds": 18 },
      { "title": "reversi", "minutes": 1, "seconds": 48 },
      { "title": "läskig ny smak", "minutes": 3, "seconds": 9 },
      { "title": "läskig ny smak", "minutes": 3, "seconds": 1 },
      { "title": "session", "minutes": 4, "seconds": 16 },
      { "title": "session", "minutes": 2, "seconds": 34 },
      { "title": "nite fledge", "minutes": 2, "seconds": 44 },
      { "title": "nite fledge", "minutes": 3, "seconds": 29 },
      { "title": "boston rob", "minutes": 1, "seconds": 39 },
      { "title": "boston rob", "minutes": 2, "seconds": 19 },
      { "title": "penult quit", "minutes": 2, "seconds": 20 },
      { "title": "penult quit", "minutes": 1, "seconds": 47 },
      { "title": "santa sangre ii", "minutes": 4, "seconds": 24 },
      { "title": "santa sangre ii", "minutes": 1, "seconds": 34 },
      { "title": "map song", "minutes": 2, "seconds": 52 },
      { "title": "map song", "minutes": 2, "seconds": 48 },
      { "title": "humor, subduing", "minutes": 7, "seconds": 0 },
      { "title": "humor, subduing", "minutes": 2, "seconds": 29 },
      { "title": "på riktigt", "minutes": 1, "seconds": 19 },
      { "title": "på riktigt", "minutes": 3, "seconds": 36 }
    ]
  },
  "I-15 Dream": {
    "artist": "Dew for Slug",
    "title": "I-15 Dream",
    "id": "DUG042c",
    "year": 2021,
    "type": "album",
    "bc_id": "2686980342",
    "bc_link": "https://pelagoramrecordings.bandcamp.com/album/i-15-dream",
    "cover_s": "/images/acxs/DUG042c.jpg",
    "cover_l": "/images/acl/DUG042c.jpg",
    "desc": "queer, mormon folktronica album in collaboration with Trees & Flowers",
    "label": "pelagoram recordings",
    "credits": {
      "songwriting, guitar, vocals, lyrics": [
        "thos f"
      ],
      "production, percussion, synth, electronics": [
        "dug alcedo"
      ]
    },
    "tracklist": [
      { "title": "Opening Move", "minutes": 3, "seconds": 28 },
      { "title": "Night Ride to Lehi", "minutes": 2, "seconds": 46 },
      { "title": "Unpacking the Bags", "minutes": 2, "seconds": 14 },
      { "title": "Sleeping Soundly", "minutes": 2, "seconds": 42 },
      { "title": "You Don't Smoke Anymore", "minutes": 3, "seconds": 12 },
      { "title": "Chosen Children", "minutes": 4, "seconds": 39 },
      { "title": "Serving the Lord in a Maverik Shop", "minutes": 2, "seconds": 45 },
      { "title": "Spliff Refrain", "minutes": 3, "seconds": 36 },
      { "title": "High School Memory 1", "minutes": 5, "seconds": 0 },
      { "title": "People Like U and Me", "minutes": 2, "seconds": 13 }
    ]
  },
  // "Starship Comino (Cave version)": {
  //   "artist": "Dug Alcedo",
  //   "title": "Starship Comino (Cave version)",
  //   "id": "DUG042b",
  //   "year": 2021,
  //   "type": "single",
  //   "bc_id": "397204052",
  //   "bc_link": "https://dugalcedo.bandcamp.com/album/2021-06-18-thos-album-release-show",
  //   "cover_s": "/images/acxs/DUG042b.jpg",
  //   "cover_l": "/images/acl/DUG042b.jpg"
  // },
  "Big Fish eat Little Fish": {
    "artist": "Dug Alcedo",
    "title": "Big Fish eat Little Fish",
    "id": "DUG042",
    "year": 2021,
    "type": "album",
    "bc_id": "1528786253",
    "bc_link": "https://dugalcedo.bandcamp.com/album/big-fish-eat-little-fish",
    "cover_s": "/images/acxs/DUG042.jpg",
    "cover_l": "/images/acl/DUG042.jpg",
    "desc": "melodic, chaotic idm",
    "songCanLoad": true,
    hasIcon: true,
    "tracklist": [
      { "title": "Parameter", "minutes": 3, "seconds": 21 },
      { "title": "Bonito", "minutes": 5, "seconds": 4 },
      { "title": "Daikon Jelly", "minutes": 3, "seconds": 40 },
      { "title": "Casino", "minutes": 3, "seconds": 9 },
      { "title": "Oaxaca", "minutes": 5, "seconds": 33 },
      { "title": "Err Damage", "minutes": 4, "seconds": 25 },
      { "title": "Circa Choke", "minutes": 6, "seconds": 6 },
      { "title": "Extensive Tapes", "minutes": 6, "seconds": 29 },
      { "title": "Squarest Ache", "minutes": 3, "seconds": 35 },
      { "title": "Jut Strum Scampi", "minutes": 6, "seconds": 26 },
      { "title": "Raven Number", "minutes": 4, "seconds": 9 },
      { "title": "Super See", "minutes": 12, "seconds": 40 }
    ]
  },
  "Bonito": {
    "artist": "Dug Alcedo",
    "title": "Bonito",
    "id": "DUG041b",
    "year": 2021,
    "type": "single",
    "bc_id": "1724980487",
    "bc_link": "https://dugalcedo.bandcamp.com/album/bonito-single",
    "cover_s": "/images/acxs/DUG041b.jpg",
    "cover_l": "/images/acl/DUG041b.jpg",
    "tracklist": [
      { "title": "Bonito", "minutes": 5, "seconds": 4 },
      { "title": "Bonito (early version 1)", "minutes": 3, "seconds": 36 },
      { "title": "Aw Cute (2021)", "minutes": 5, "seconds": 46 },
      { "title": "Bonito (early version 2)", "minutes": 1, "seconds": 51 }
    ]
  },
  "Comber": {
    "artist": "Dug Alcedo",
    "title": "Comber",
    "id": "DUG041",
    "year": 2020,
    "type": "album",
    "bc_id": "3522925184",
    "bc_link": "https://dugalcedo.bandcamp.com/album/comber",
    "cover_s": "/images/acxs/DUG041.jpg",
    "cover_l": "/images/acl/DUG041.jpg",
    "tracklist": [
      { "title": "Alcedo", "minutes": 4, "seconds": 53 },
      { "title": "The Horror", "minutes": 4, "seconds": 2 },
      { "title": "Support", "minutes": 4, "seconds": 49 },
      { "title": "Empty Energy", "minutes": 5, "seconds": 9 },
      { "title": "Nuggies & Ranch", "minutes": 5, "seconds": 37 },
      { "title": "New Bug", "minutes": 5, "seconds": 3 },
      { "title": "Ouauaaeo", "minutes": 5, "seconds": 13 },
      { "title": "Comber", "minutes": 3, "seconds": 49 }
    ]
  },
  "Pinya": {
    "artist": "Dug Alcedo",
    "title": "Pinya",
    "id": "DUG040b",
    "year": 2020,
    "type": "single",
    "bc_id": "685242952",
    "bc_link": "https://dugalcedo.bandcamp.com/album/pinya-borealis-go-fast",
    "cover_s": "/images/acxs/DUG040b.jpg",
    "cover_l": "/images/acl/DUG040b.jpg",
    "tracklist": [
      { "title": "pinya", "minutes": 2, "seconds": 44 },
      { "title": "borealis", "minutes": 2, "seconds": 44 },
      { "title": "go fast", "minutes": 2, "seconds": 55 }
    ]
  },
  "XL": {
    "artist": "Dug Alcedo",
    "title": "XL",
    "id": "DUG040",
    "year": 2020,
    "type": "album",
    "bc_id": "3245678441",
    "bc_link": "https://dugalcedo.bandcamp.com/album/xl",
    "cover_s": "/images/acxs/DUG040.jpg",
    "cover_l": "/images/acl/DUG040.jpg",
    hasIcon: true,
    "tracklist": [
      { "title": "moline", "minutes": 3, "seconds": 14 },
      { "title": "prune", "minutes": 3, "seconds": 38 },
      { "title": "quit", "minutes": 4, "seconds": 2 },
      { "title": "club", "minutes": 2, "seconds": 24 },
      { "title": "chromwrm", "minutes": 2, "seconds": 59 },
      { "title": "roasting veg", "minutes": 2, "seconds": 44 },
      { "title": "ivvi iv", "minutes": 3, "seconds": 52 },
      { "title": "pot pie", "minutes": 1, "seconds": 45 },
      { "title": "brackish", "minutes": 2, "seconds": 13 },
      { "title": "new finches", "minutes": 3, "seconds": 36 },
      { "title": "kitty", "minutes": 4, "seconds": 36 }
    ]
  },
  "Hell Scenery": {
    "artist": "Dug Alcedo",
    "title": "Hell Scenery",
    "id": "DUG039",
    "year": 2020,
    "type": "album",
    "bc_id": "3813412774",
    "bc_link": "https://dugalcedo.bandcamp.com/album/hell-scenery",
    "cover_s": "/images/acxs/DUG039.jpg",
    "cover_l": "/images/acl/DUG039.jpg",
    hasIcon: true,
    "tracklist": [
      { "title": "□|", "minutes": 2, "seconds": 20 },
      { "title": "Steel Belongings", "minutes": 6, "seconds": 40 },
      { "title": "Accipiter Nod", "minutes": 5, "seconds": 19 },
      { "title": "Weakling", "minutes": 3, "seconds": 6 },
      { "title": "Taiga Curio", "minutes": 3, "seconds": 23 },
      { "title": "□||", "minutes": 2, "seconds": 38 },
      { "title": "\\/\\/ig Advert", "minutes": 6, "seconds": 54 },
      { "title": "(oast2(oast", "minutes": 3, "seconds": 41 },
      { "title": "<ın<ınattı <hılı", "minutes": 6, "seconds": 7 },
      { "title": "Type Beat", "minutes": 2, "seconds": 4 },
      { "title": "□|||", "minutes": 1, "seconds": 12 },
      { "title": "Aaek Oorruz", "minutes": 3, "seconds": 9 },
      { "title": "Chomp Chomp", "minutes": 2, "seconds": 50 },
      { "title": "Tru U", "minutes": 5, "seconds": 8 },
      { "title": "□||||", "minutes": 2, "seconds": 48 },
      { "title": "Nu Hardware", "minutes": 3, "seconds": 0 },
      { "title": "Ode to Ibices", "minutes": 2, "seconds": 59 },
      { "title": "Blight-o-rama", "minutes": 6, "seconds": 39 },
      { "title": "□||||-", "minutes": 2, "seconds": 30 }
    ]
  },
  "Casked Acid in Black Sheep Canyon": {
    "artist": "Dug Alcedo",
    "title": "Casked Acid in Black Sheep Canyon",
    "id": "DUG038",
    "year": 2019,
    "type": "album",
    "bc_id": "117522757",
    "bc_link": "https://dugalcedo.bandcamp.com/album/casked-acid-in-black-sheep-canyon",
    "cover_s": "/images/acxs/DUG038.jpg",
    "cover_l": "/images/acl/DUG038.jpg",
    "tracklist": [
      { "title": "so what if this song untitled", "minutes": 3, "seconds": 30 },
      { "title": "restless gel", "minutes": 2, "seconds": 15 },
      { "title": "bond stint tumult", "minutes": 6, "seconds": 58 },
      { "title": "mellow corn", "minutes": 3, "seconds": 47 },
      { "title": "drab ebb run", "minutes": 5, "seconds": 11 },
      { "title": "panicced naan", "minutes": 3, "seconds": 4 },
      { "title": "tamal skit", "minutes": 4, "seconds": 5 },
      { "title": "clammable omen", "minutes": 3, "seconds": 39 },
      { "title": "fog fresco", "minutes": 3, "seconds": 4 },
      { "title": "acre crumb", "minutes": 2, "seconds": 40 },
      { "title": "lobe-synch pancake", "minutes": 5, "seconds": 27 }
    ]
  },
  "Possum with Apple": {
    "artist": "Dug Alcedo",
    "title": "Possum with Apple",
    "id": "DUG037",
    "year": 2019,
    "type": "album",
    "bc_id": "3517251765",
    "bc_link": "https://dugalcedo.bandcamp.com/album/possum-with-apple",
    "cover_s": "/images/acxs/DUG037.jpg",
    "cover_l": "/images/acl/DUG037.jpg",
    "tracklist": [
      { "title": "Starship Comino", "minutes": 6, "seconds": 0 },
      { "title": "Cosmic Boredom", "minutes": 2, "seconds": 53 },
      { "title": "Possum with Apple", "minutes": 7, "seconds": 33 },
      { "title": "Laramide Anticline", "minutes": 7, "seconds": 16 },
      { "title": "Aureolin Anticlimax", "minutes": 5, "seconds": 9 },
      { "title": "Highspeed Breakfast", "minutes": 2, "seconds": 1 },
      { "title": "Phrenetic Trout Fry", "minutes": 5, "seconds": 52 },
      { "title": "Why Music", "minutes": 3, "seconds": 8 },
      { "title": "Agave Snowbelt", "minutes": 4, "seconds": 38 },
      { "title": "Galactic Federation of Freaky Soulless Husks", "minutes": 5, "seconds": 12 }
    ]
  },
  "Soundcloud 2018": {
    "artist": "First Dog",
    "title": "Soundcloud 2018",
    "id": "DUG036b",
    "year": 2019,
    "type": "ep",
    "bc_id": "1323647648",
    "bc_link": "https://firstdog.bandcamp.com/album/soundcloud-2018",
    "cover_s": "/images/acxs/DUG036b.jpg",
    "cover_l": "/images/acl/DUG036b.jpg",
    "tracklist": [
      { "title": "gem 1", "minutes": 3, "seconds": 47 },
      { "title": "on the road", "minutes": 5, "seconds": 30 },
      { "title": "ybvriqck", "minutes": 6, "seconds": 46 },
      { "title": "modne venicg", "minutes": 7, "seconds": 48 },
      { "title": "yodel", "minutes": 6, "seconds": 0 },
      { "title": "I.D.W.T.M.M.A.", "minutes": 3, "seconds": 57 }
    ]
  },
  "Guard Goose": {
    "artist": "Dug Alcedo",
    "title": "Guard Goose",
    "id": "DUG036",
    "year": 2019,
    "type": "mini-album",
    "bc_id": "4110385408",
    "bc_link": "https://dugalcedo.bandcamp.com/album/guard-goose",
    "cover_s": "/images/acxs/DUG036.jpg",
    "cover_l": "/images/acl/DUG036.jpg",
    "tracklist": [
      { "title": "gricwa", "minutes": 3, "seconds": 7 },
      { "title": "xgjfhgklj;kll", "minutes": 2, "seconds": 9 },
      { "title": "wd nin wehi", "minutes": 2, "seconds": 16 },
      { "title": "lkzxuc", "minutes": 5, "seconds": 17 },
      { "title": "reprise", "minutes": 2, "seconds": 10 }
    ]
  },
  "Fish Antlers": {
    "artist": "Dug Alcedo",
    "title": "Fish Antlers",
    "id": "DUG035",
    "year": 2019,
    "type": "album",
    "bc_id": "2585332977",
    "bc_link": "https://dugalcedo.bandcamp.com/album/fish-antlers",
    "cover_s": "/images/acxs/DUG035.jpg",
    "cover_l": "/images/acl/DUG035.jpg",
    hasIcon: true,
    "tracklist": [
      { "title": "track 1", "minutes": 2, "seconds": 57 },
      { "title": "angelo", "minutes": 7, "seconds": 8 },
      { "title": "light in darkness", "minutes": 9, "seconds": 29 },
      { "title": "bullion", "minutes": 5, "seconds": 42 },
      { "title": "michigan", "minutes": 2, "seconds": 19 },
      { "title": "fish finesse", "minutes": 3, "seconds": 47 },
      { "title": "wet feta", "minutes": 6, "seconds": 42 }
    ]
  },
  "Money Snakes": {
    "artist": "Dug Alcedo",
    "title": "Money Snakes",
    "id": "DUG034",
    "year": 2019,
    "type": "album",
    "bc_id": "3239889775",
    "bc_link": "https://dugalcedo.bandcamp.com/album/money-snakes",
    "cover_s": "/images/acxs/DUG034.jpg",
    "cover_l": "/images/acl/DUG034.jpg",
    "songCanLoad": true,
    hasIcon: true,
    "tracklist": [
      { "title": "ACID", "minutes": 8, "seconds": 15 },
      { "title": "HOLY", "minutes": 13, "seconds": 59 },
      { "title": "OOIL", "minutes": 12, "seconds": 59 },
      { "title": "YODL", "minutes": 12, "seconds": 6 },
      { "title": "SWCH", "minutes": 9, "seconds": 39 },
      { "title": "SEAL", "minutes": 3, "seconds": 26 },
      { "title": "WARS", "minutes": 11, "seconds": 30 },
      { "title": "QRYP", "minutes": 9, "seconds": 21 },
      { "title": "LOEV", "minutes": 5, "seconds": 34 },
      { "title": "YELO", "minutes": 12, "seconds": 0 }
    ]
  },
  "Isyiau": {
    "artist": "First Dog",
    "title": "Isyiau",
    "id": "DUG033",
    "year": 2018,
    "type": "album",
    "bc_id": "2439411014",
    "bc_link": "https://firstdog.bandcamp.com/album/isyiau",
    "cover_s": "/images/acxs/DUG033.jpg",
    "cover_l": "/images/acl/DUG033.jpg",
    hasIcon: true,
    "tracklist": [
      { "title": "၂┌ᴜᔭ┘ᴜ", "minutes": 1, "seconds": 30 },
      { "title": "ᔮ╔c", "minutes": 6, "seconds": 49 },
      { "title": "ᔪ└ᴜᔭ┘၂╓", "minutes": 4, "seconds": 44 },
      { "title": "ᔮ┐ᔮu┌┘ᔪ└", "minutes": 7, "seconds": 55 },
      { "title": "ᔭ၂┌ᔭxᔪ", "minutes": 6, "seconds": 14 },
      { "title": "╚╓uᴜՇ၂┌ᔫ", "minutes": 4, "seconds": 20 },
      { "title": "ꞷ", "minutes": 4, "seconds": 31 },
      { "title": "ᔮ└ᔪꞷ˧╓ᔫ", "minutes": 6, "seconds": 37 },
      { "title": "uՇ╜ᔮ ၂Շ╜ᔮ", "minutes": 3, "seconds": 42 },
      { "title": "┌Շ၂┌ᔭ", "minutes": 5, "seconds": 12 },
      { "title": "ᴜ၂┘└cu ꞷ┘כ", "minutes": 2, "seconds": 26 },
      { "title": "└၂ᔭ┘ꞷ ꞷ╓╓uꞷᔪ╚u Շᴜ┘ᔫ", "minutes": 9, "seconds": 34 },
      { "title": "c┘ᔫᴜ╓ Є╓ᴜ┌ᔮ", "minutes": 7, "seconds": 36 },
      { "title": "└ᴜ +x ၂┘ᔫ", "minutes": 5, "seconds": 43 },
      { "title": "┌ꞷ˧└┐", "minutes": 4, "seconds": 0 }
    ]
  },
  "Separation Newdrum": {
    "artist": "First Dog",
    "title": "Separation Newdrum",
    "id": "DUG032b",
    "year": 2018,
    "type": "ep",
    "bc_id": "3996183796",
    "bc_link": "https://firstdog.bandcamp.com/album/separation-newdrum",
    "cover_s": "/images/acxs/DUG032b.jpg",
    "cover_l": "/images/acl/DUG032b.jpg",
    "tracklist": [
      { "title": "Separation Newdrum (single version)", "minutes": 5, "seconds": 16 },
      { "title": "untitled", "minutes": 0, "seconds": 51 },
      { "title": "Death by Silence (evil version)", "minutes": 2, "seconds": 45 },
      { "title": "untitled", "minutes": 3, "seconds": 18 },
      { "title": "dead dog", "minutes": 2, "seconds": 1 },
      { "title": "malt liquor", "minutes": 1, "seconds": 53 },
      { "title": "ruins (Henry Cow)", "minutes": 5, "seconds": 12 },
      { "title": "untitled", "minutes": 0, "seconds": 51 },
      { "title": "Cabinet Man", "minutes": 7, "seconds": 13 }
    ]
  },
  "Moosic": {
    "artist": "First Dog",
    "title": "Moosic",
    "id": "DUG032",
    "year": 2018,
    "type": "album",
    "bc_id": "3233370815",
    "bc_link": "https://firstdog.bandcamp.com/album/moosic",
    "cover_s": "/images/acxs/DUG032.jpg",
    "cover_l": "/images/acl/DUG032.jpg",
    "tracklist": [
      { "title": "carnation", "minutes": 6, "seconds": 2 },
      { "title": "ice day", "minutes": 7, "seconds": 10 },
      { "title": "noon", "minutes": 2, "seconds": 1 },
      { "title": "tacos", "minutes": 5, "seconds": 28 },
      { "title": "x factor 2", "minutes": 5, "seconds": 12 },
      { "title": "broke", "minutes": 7, "seconds": 16 },
      { "title": "jordan", "minutes": 6, "seconds": 49 }
    ]
  },
  "Bird in a Cave (echo)": {
    "artist": "First Dog",
    "title": "Bird in a Cave (echo)",
    "id": "DUG031",
    "year": 2017,
    "type": "album",
    "bc_id": "4071937567",
    "bc_link": "https://firstdog.bandcamp.com/album/bird-in-a-cave-(echo)",
    "cover_s": "/images/acxs/DUG031.jpg",
    "cover_l": "/images/acl/DUG031.jpg",
    "tracklist": [
      { "title": "Battle", "minutes": 4, "seconds": 28 },
      { "title": "bayou/sau", "minutes": 7, "seconds": 41 },
      { "title": "Potion+", "minutes": 1, "seconds": 56 },
      { "title": "Savecrystal", "minutes": 7, "seconds": 40 },
      { "title": ")Lou(Kas", "minutes": 3, "seconds": 50 },
      { "title": "Zzoolloo", "minutes": 3, "seconds": 47 },
      { "title": "(passage 1)", "minutes": 0, "seconds": 23 },
      { "title": "Blind", "minutes": 2, "seconds": 56 },
      { "title": "Glowworm", "minutes": 4, "seconds": 1 },
      { "title": "60 miles", "minutes": 2, "seconds": 32 },
      { "title": "(passage 2)", "minutes": 0, "seconds": 38 },
      { "title": "There is no Light", "minutes": 3, "seconds": 55 }
    ]
  },
  "Friends Fever": {
    "artist": "First Dog",
    "title": "Friends Fever",
    "id": "DUG030",
    "year": 2017,
    "type": "album",
    "bc_id": "3613936290",
    "bc_link": "https://firstdog.bandcamp.com/album/friends-fever",
    "cover_s": "/images/acxs/DUG030.jpg",
    "cover_l": "/images/acl/DUG030.jpg",
    wau: "I wxz olre'dE wel xwer Dt I hxd tru'bxl mAk'q and kEp'q frend$, and hxv'q bxn dI'xg'nOs£ wx O'ti'zxm TrE yEr$ prI'xr, I had a ge'nx'rxl sens az tx wI. I mAd DEz soq$ in 2017 wx x lot xv Doz fElq$ in mInd.",
    "tracklist": [
      { "title": "The Snail", "minutes": 3, "seconds": 28 },
      { "title": "Crustacean (Grow Up)", "minutes": 4, "seconds": 49 },
      { "title": "Santa Sangre", "minutes": 4, "seconds": 54 },
      { "title": "Death by Silence", "minutes": 2, "seconds": 34 },
      { "title": "Newage Scum", "minutes": 4, "seconds": 19 },
      { "title": "Ruining Everything", "minutes": 3, "seconds": 43 },
      { "title": "Separation Newdrum (Transcribing the Echo)", "minutes": 7, "seconds": 15 },
      { "title": "i love you", "minutes": 2, "seconds": 54 },
      { "title": "Friends Forever", "minutes": 6, "seconds": 18 },
      { "title": "La Diluvo", "minutes": 1, "seconds": 37 },
      { "title": "Beehive", "minutes": 3, "seconds": 43 }
    ]
  },
  "Loukas 1": {
    "artist": "Loukas",
    "title": "Loukas 1",
    "id": "DUG029",
    "year": 2016,
    "type": "mini-album",
    "bc_id": "2499258239",
    "bc_link": "https://firstdog.bandcamp.com/album/loukas-1",
    "cover_s": "/images/acxs/DUG029.jpg",
    "cover_l": "/images/acl/DUG029.jpg",
    "tracklist": [
      { "title": "dead dog", "minutes": 5, "seconds": 27 },
      { "title": "elephant", "minutes": 4, "seconds": 55 },
      { "title": "waterfall", "minutes": 4, "seconds": 10 },
      { "title": "malt liquor", "minutes": 7, "seconds": 59 },
      { "title": "tree", "minutes": 2, "seconds": 10 },
      { "title": "weapon", "minutes": 6, "seconds": 15 },
      { "title": "hcruins9m", "minutes": 1, "seconds": 41 }
    ]
  },
  "Bird in a Cave": {
    "artist": "First Dog",
    "title": "Bird in a Cave",
    "id": "DUG028",
    "year": 2016,
    "type": "album",
    "bc_id": "3660544442",
    "bc_link": "https://firstdog.bandcamp.com/album/bird-in-a-cave",
    "cover_s": "/images/acxs/DUG028.jpg",
    "cover_l": "/images/acl/DUG028.jpg",
    wau: "mAd dxr'q x tIm wen Txq$ felt rE'lE unsxrtxn, fI'nanSx'lE, and I felt rE'lE sker£ and lost, lIk x bxr£ in x kAv, hens Dx nAm. I wxz just mUv'q ät xv Dx häs xv mI fo'Dr--hU z x lI'q lUz'xr hU I dE'spIz. I wxz mUv'q tx Dx kO'ce'lx va'lE in x kor wx x brO'kxn enjin fan. I had x Sit'E bö'frend in ri'vxr'sID hU I wxd fInd ät wxz cEt'q on x'nu'Dr gI wx mE. lIf felt espe'Sx'lE bad dx'rxq Dis tIm.",
    "tracklist": [
      { "title": "Battle", "minutes": 3, "seconds": 52 },
      { "title": "Save Crystal", "minutes": 4, "seconds": 34 },
      { "title": "Sightless Flight", "minutes": 4, "seconds": 28 },
      { "title": "Bird in a Cave", "minutes": 1, "seconds": 54 },
      { "title": "Gloworm", "minutes": 4, "seconds": 26 },
      { "title": "Sixty Miles", "minutes": 4, "seconds": 2 },
      { "title": "Theme of Cave", "minutes": 6, "seconds": 56 },
      { "title": "Chewed Leg", "minutes": 2, "seconds": 20 },
      { "title": "Potion", "minutes": 2, "seconds": 48 },
      { "title": "Zolo", "minutes": 4, "seconds": 38 },
      { "title": "Remember the Light", "minutes": 3, "seconds": 21 },
      { "title": "Kas", "minutes": 7, "seconds": 51 }
    ]
  },
  "Ow Cute": {
    "artist": "First Dog",
    "title": "Ow Cute",
    "id": "DUG027b",
    "year": 2016,
    "type": "ep",
    "bc_id": "3093688189",
    "bc_link": "https://firstdog.bandcamp.com/album/ow-cute",
    "cover_s": "/images/acxs/DUG027b.jpg",
    "cover_l": "/images/acl/DUG027b.jpg",
    "tracklist": [
      { "title": "aw cute demo", "minutes": 3, "seconds": 55 },
      { "title": "i know i am", "minutes": 5, "seconds": 23 },
      { "title": "aw cute demo", "minutes": 2, "seconds": 33 },
      { "title": "warren wilson college", "minutes": 14, "seconds": 30 },
      { "title": "glass heart", "minutes": 3, "seconds": 23 },
      { "title": "aw cute demo", "minutes": 3, "seconds": 57 }
    ]
  },
  "Aw Cute": {
    "artist": "First Dog",
    "title": "Aw Cute",
    "id": "DUG027",
    "year": 2015,
    "type": "album",
    "bc_id": "2561784264",
    "bc_link": "https://firstdog.bandcamp.com/album/aw-cute",
    "cover_s": "/images/acxs/DUG027.jpg",
    "cover_l": "/images/acl/DUG027.jpg",
    "label": "ingrown records",
    "tracklist": [
      { "title": "Aww", "minutes": 0, "seconds": 39 },
      { "title": "aw cute", "minutes": 4, "seconds": 57 },
      { "title": "explore with me", "minutes": 3, "seconds": 34 },
      { "title": "when youre sad", "minutes": 2, "seconds": 38 },
      { "title": "grief", "minutes": 2, "seconds": 53 },
      { "title": "together", "minutes": 4, "seconds": 14 },
      { "title": "dont need them", "minutes": 4, "seconds": 20 },
      { "title": "not friends", "minutes": 7, "seconds": 25 },
      { "title": "(untrue bayou)", "minutes": 3, "seconds": 6 },
      { "title": "loon", "minutes": 4, "seconds": 31 },
      { "title": "birds", "minutes": 3, "seconds": 16 },
      { "title": "ishikawa", "minutes": 3, "seconds": 20 },
      { "title": "youre like me", "minutes": 10, "seconds": 0 },
      { "title": "no homo", "minutes": 2, "seconds": 59 }
    ]
  },
  "Lucoizo": {
    "artist": "First Dog",
    "title": "Lucoizo",
    "id": "DUG026",
    "year": 2014,
    "type": "album",
    "bc_id": "1203318470",
    "bc_link": "https://firstdog.bandcamp.com/album/lucoizo",
    "cover_s": "/images/acxs/DUG026.jpg",
    "cover_l": "/images/acl/DUG026.jpg",
    "tracklist": [
      { "title": "Steppes", "minutes": 8, "seconds": 5 },
      { "title": "Meridion", "minutes": 9, "seconds": 36 },
      { "title": "No Time for Lovin'", "minutes": 1, "seconds": 16 },
      { "title": "Nulb", "minutes": 5, "seconds": 2 },
      { "title": "Oscar", "minutes": 3, "seconds": 30 },
      { "title": "Parliament", "minutes": 8, "seconds": 0 },
      { "title": "Left Trout", "minutes": 6, "seconds": 52 },
      { "title": "BHA", "minutes": 4, "seconds": 12 },
      { "title": "Ab Explorer", "minutes": 7, "seconds": 0 },
      { "title": "Pan San Juan", "minutes": 3, "seconds": 8 },
      { "title": "To Visit", "minutes": 8, "seconds": 59 },
      { "title": "Castelan", "minutes": 8, "seconds": 46 }
    ]
  },
  "Gabaraptor": {
    "artist": "First Dog",
    "title": "Gabaraptor",
    "id": "DUG025",
    "year": 2014,
    "type": "album",
    "bc_id": "2972472047",
    "bc_link": "https://firstdog.bandcamp.com/album/gabaraptor",
    "cover_s": "/images/acxs/DUG025.jpg",
    "cover_l": "/images/acl/DUG025.jpg",
    "tracklist": [
      { "title": "Edge of Dishonesty", "minutes": 2, "seconds": 31 },
      { "title": "Typal", "minutes": 4, "seconds": 19 },
      { "title": "Mana", "minutes": 2, "seconds": 14 },
      { "title": "My Angel", "minutes": 6, "seconds": 58 },
      { "title": "Laundry Day", "minutes": 1, "seconds": 36 },
      { "title": "Seventynine", "minutes": 2, "seconds": 51 },
      { "title": "Feelsame", "minutes": 2, "seconds": 53 },
      { "title": "Oolong Boogie", "minutes": 4, "seconds": 32 },
      { "title": "Dictator", "minutes": 3, "seconds": 1 },
      { "title": "Bablon", "minutes": 3, "seconds": 56 },
      { "title": "Karob", "minutes": 6, "seconds": 28 },
      { "title": "Mayaug", "minutes": 1, "seconds": 49 }
    ]
  },
  "Paranoid Cartoons": {
    "artist": "First Dog",
    "title": "Paranoid Cartoons",
    "id": "DUG024",
    "year": 2014,
    "type": "album",
    "bc_id": "1920506124",
    "bc_link": "https://firstdog.bandcamp.com/album/paranoid-cartoons",
    "cover_s": "/images/acxs/DUG024.jpg",
    "cover_l": "/images/acl/DUG024.jpg",
    "tracklist": [
      { "title": "Lorilore", "minutes": 5, "seconds": 43 },
      { "title": "Ararauna", "minutes": 2, "seconds": 10 },
      { "title": "Beak", "minutes": 5, "seconds": 35 },
      { "title": "Birdcalls", "minutes": 3, "seconds": 40 },
      { "title": "Of Prey", "minutes": 4, "seconds": 45 },
      { "title": "Post Migraine", "minutes": 5, "seconds": 56 },
      { "title": "Schedule", "minutes": 3, "seconds": 9 },
      { "title": "Echogore", "minutes": 3, "seconds": 57 },
      { "title": "Gauze", "minutes": 3, "seconds": 5 }
    ]
  },
  "Feeder": {
    "artist": "First Dog",
    "title": "Feeder",
    "id": "DUG023",
    "year": 2013,
    "type": "album",
    "bc_id": "1015688186",
    "bc_link": "https://firstdog.bandcamp.com/album/feeder",
    "cover_s": "/images/acxs/DUG023.jpg",
    "cover_l": "/images/acl/DUG023.jpg",
    "tracklist": [
      { "title": "Embarrassed", "minutes": 9, "seconds": 19 },
      { "title": "The Purple Pipe", "minutes": 3, "seconds": 30 },
      { "title": "Solaris Savings Time", "minutes": 2, "seconds": 21 },
      { "title": "Ocean", "minutes": 2, "seconds": 14 },
      { "title": "Mortal", "minutes": 2, "seconds": 50 },
      { "title": "Snow+Lightning=Fridge", "minutes": 3, "seconds": 5 },
      { "title": "Autumn", "minutes": 2, "seconds": 21 },
      { "title": "Spoke", "minutes": 2, "seconds": 53 },
      { "title": "Knew", "minutes": 2, "seconds": 22 },
      { "title": "Door", "minutes": 3, "seconds": 20 },
      { "title": "Dr. Dogma", "minutes": 3, "seconds": 53 },
      { "title": "Trolley Acid", "minutes": 4, "seconds": 6 },
      { "title": "Infra", "minutes": 2, "seconds": 21 },
      { "title": "CA94", "minutes": 5, "seconds": 15 },
      { "title": "Feeble in the Biome", "minutes": 1, "seconds": 18 },
      { "title": "Happybird", "minutes": 3, "seconds": 18 },
      { "title": "Bug [Live]", "minutes": 4, "seconds": 28 },
      { "title": "Bablon [Live]", "minutes": 5, "seconds": 36 },
      { "title": "Nulb [Live]", "minutes": 3, "seconds": 21 },
      { "title": "Breathing Bad for the Lungs [Live]", "minutes": 4, "seconds": 18 },
      { "title": "No Car [Live]", "minutes": 6, "seconds": 2 },
      { "title": "Bug [Live]", "minutes": 5, "seconds": 37 },
      { "title": "Q/Infra [Live]", "minutes": 5, "seconds": 51 },
      { "title": "Karob [Live]", "minutes": 3, "seconds": 39 }
    ]
  },
  "Volt Welve": {
    "artist": "First Dog",
    "title": "Volt Welve",
    "id": "DUG022",
    "year": 2013,
    "type": "album",
    "bc_id": "706814123",
    "bc_link": "https://firstdog.bandcamp.com/album/volt-welve",
    "cover_s": "/images/acxs/DUG022.jpg",
    "cover_l": "/images/acl/DUG022.jpg",
    "tracklist": [
      { "title": "realm1.3", "minutes": 1, "seconds": 37 },
      { "title": "Lovesong", "minutes": 4, "seconds": 28 },
      { "title": "percjam", "minutes": 1, "seconds": 0 },
      { "title": "Karob", "minutes": 3, "seconds": 32 },
      { "title": "Bablon", "minutes": 6, "seconds": 48 },
      { "title": "shortsong(nerve)", "minutes": 0, "seconds": 58 },
      { "title": "seventynine", "minutes": 2, "seconds": 7 },
      { "title": "Weathervein", "minutes": 6, "seconds": 50 },
      { "title": "echogore", "minutes": 1, "seconds": 54 },
      { "title": "Nohom", "minutes": 3, "seconds": 51 },
      { "title": "scord", "minutes": 0, "seconds": 35 },
      { "title": "porch2", "minutes": 2, "seconds": 43 },
      { "title": "ambi", "minutes": 0, "seconds": 48 },
      { "title": "soul.harm", "minutes": 2, "seconds": 47 },
      { "title": "Nikrosis", "minutes": 3, "seconds": 49 },
      { "title": "Tapyoka", "minutes": 5, "seconds": 18 },
      { "title": "_typal", "minutes": 1, "seconds": 13 },
      { "title": "on Mountain", "minutes": 4, "seconds": 51 },
      { "title": "Bossnova", "minutes": 4, "seconds": 50 },
      { "title": "Epilog(mlear)", "minutes": 2, "seconds": 50 }
    ]
  },
  "Feeble": {
    "artist": "First Dog",
    "title": "Feeble",
    "id": "DUG021",
    "year": 2012,
    "type": "album",
    "bc_id": "3858484618",
    "bc_link": "https://firstdog.bandcamp.com/album/feeble",
    "cover_s": "/images/acxs/DUG021.jpg",
    "cover_l": "/images/acl/DUG021.jpg",
    hasIcon: true,
    "tracklist": [
      { "title": "Intro (No Car)", "minutes": 2, "seconds": 11 },
      { "title": "Bug", "minutes": 3, "seconds": 33 },
      { "title": "Worshipers", "minutes": 1, "seconds": 56 },
      { "title": "Carbon", "minutes": 1, "seconds": 17 },
      { "title": "Sucralose", "minutes": 2, "seconds": 15 },
      { "title": "Door", "minutes": 3, "seconds": 21 },
      { "title": "Dying by Day", "minutes": 1, "seconds": 54 },
      { "title": "Surviving by Night", "minutes": 1, "seconds": 33 },
      { "title": "Flat Tire", "minutes": 2, "seconds": 23 },
      { "title": "A Different Country on Another Planet", "minutes": 2, "seconds": 16 },
      { "title": "Away Out", "minutes": 1, "seconds": 50 },
      { "title": "So Tired", "minutes": 3, "seconds": 44 },
      { "title": "Resonator / Steinway", "minutes": 6, "seconds": 28 },
      { "title": "Tuna", "minutes": 2, "seconds": 55 },
      { "title": "Chordata", "minutes": 2, "seconds": 11 },
      { "title": "Takers", "minutes": 2, "seconds": 33 },
      { "title": "Limit", "minutes": 2, "seconds": 54 },
      { "title": "Angry Lives", "minutes": 4, "seconds": 0 },
      { "title": "Breathing Bad for the Lungs", "minutes": 3, "seconds": 45 },
      { "title": "Feeble in the Biome", "minutes": 3, "seconds": 26 },
      { "title": "R.I.P.", "minutes": 3, "seconds": 6 },
      { "title": "Common DNA", "minutes": 3, "seconds": 50 },
      { "title": "Gold Dirge", "minutes": 3, "seconds": 23 },
      { "title": "Birdlime", "minutes": 3, "seconds": 23 }
    ]
  },
  "Language from the Grip": {
    "artist": "First Dog",
    "title": "Language from the Grip",
    "id": "DUG020",
    "year": 2012,
    "type": "album",
    "bc_id": "3385909548",
    "bc_link": "https://firstdog.bandcamp.com/album/language-from-the-grip",
    "cover_s": "/images/acxs/DUG020.jpg",
    "cover_l": "/images/acl/DUG020.jpg",
    "tracklist": [
      { "title": "Sampled Pavo Intro", "minutes": 1, "seconds": 28 },
      { "title": "Shame On", "minutes": 3, "seconds": 28 },
      { "title": "Marijuana", "minutes": 5, "seconds": 8 },
      { "title": "Memorygone", "minutes": 5, "seconds": 28 },
      { "title": "Bogged", "minutes": 3, "seconds": 53 },
      { "title": "Ingrown", "minutes": 1, "seconds": 12 },
      { "title": "Exmachine", "minutes": 4, "seconds": 17 },
      { "title": "OK Coffee", "minutes": 2, "seconds": 56 },
      { "title": "Conureheadgod", "minutes": 7, "seconds": 0 }
    ]
  },
  "Camel 2": {
    "artist": "First Dog",
    "title": "Camel 2",
    "id": "DUG019",
    "year": 2012,
    "type": "mini-album",
    "bc_id": "3116491278",
    "bc_link": "https://firstdog.bandcamp.com/album/camel-2",
    "cover_s": "/images/acxs/DUG019.jpg",
    "cover_l": "/images/acl/DUG019.jpg",
    "tracklist": [
      { "title": "camel", "minutes": 32, "seconds": 8 }
    ]
  },
  "Videogame Soundtrack": {
    "artist": "First Dog",
    "title": "Videogame Soundtrack",
    "id": "DUG018",
    "year": 2012,
    "type": "album",
    "bc_id": "2695211125",
    "bc_link": "https://firstdog.bandcamp.com/album/videogame-soundtrack",
    "cover_s": "/images/acxs/DUG018.jpg",
    "cover_l": "/images/acl/DUG018.jpg",
    "tracklist": [
      { "title": "Memory #1", "minutes": 3, "seconds": 40 },
      { "title": "Memory #2", "minutes": 2, "seconds": 21 },
      { "title": "Memory #3", "minutes": 1, "seconds": 53 },
      { "title": "Memory #4", "minutes": 1, "seconds": 26 },
      { "title": "Memory #5", "minutes": 2, "seconds": 46 },
      { "title": "Memory #6", "minutes": 1, "seconds": 29 },
      { "title": "Memory #7", "minutes": 2, "seconds": 18 },
      { "title": "Memory #8", "minutes": 2, "seconds": 39 },
      { "title": "Memory #9", "minutes": 4, "seconds": 42 },
      { "title": "Memory #10", "minutes": 3, "seconds": 39 },
      { "title": "Memory #11", "minutes": 1, "seconds": 40 },
      { "title": "Memory #12", "minutes": 2, "seconds": 1 },
      { "title": "Memory #13", "minutes": 2, "seconds": 27 },
      { "title": "Memory #14", "minutes": 5, "seconds": 53 },
      { "title": "Memory #15", "minutes": 1, "seconds": 32 },
      { "title": "Memory #16", "minutes": 3, "seconds": 14 },
      { "title": "Memory #17", "minutes": 1, "seconds": 44 },
      { "title": "Memory #18", "minutes": 1, "seconds": 54 },
      { "title": "Memory #19", "minutes": 1, "seconds": 49 },
      { "title": "Memory #20", "minutes": 5, "seconds": 45 },
      { "title": "Memory #21", "minutes": 2, "seconds": 23 },
      { "title": "Memory #22", "minutes": 6, "seconds": 34 },
      { "title": "Memory #23", "minutes": 2, "seconds": 26 },
      { "title": "Memory #24", "minutes": 7, "seconds": 54 },
      { "title": "Memory #25", "minutes": 3, "seconds": 1 },
      { "title": "FAILURE!", "minutes": 6, "seconds": 14 }
    ]
  },
  "Untrue/Parrot": {
    "artist": "First Dog",
    "title": "Untrue/Parrot",
    "id": "DUG017",
    "year": 2012,
    "type": "album",
    "bc_id": "2361478125",
    "bc_link": "https://firstdog.bandcamp.com/album/parrot",
    "cover_s": "/images/acxs/DUG017.jpg",
    "cover_l": "/images/acl/DUG017.jpg",
    "tracklist": [
      { "title": "Parrot 1", "minutes": 4, "seconds": 51 },
      { "title": "Parrot 2", "minutes": 4, "seconds": 41 },
      { "title": "Parrot 3", "minutes": 4, "seconds": 36 },
      { "title": "Parrot 4", "minutes": 4, "seconds": 23 },
      { "title": "Parrot 5", "minutes": 4, "seconds": 52 },
      { "title": "Parrot 6", "minutes": 6, "seconds": 50 },
      { "title": "Parrot 7", "minutes": 6, "seconds": 37 },
      { "title": "Parrot 8", "minutes": 5, "seconds": 27 },
      { "title": "Parrot 9", "minutes": 4, "seconds": 32 },
      { "title": "Living On Land", "minutes": 5, "seconds": 0 },
      { "title": "parrot 10", "minutes": 4, "seconds": 47 },
      { "title": "Desert Bird", "minutes": 7, "seconds": 19 },
      { "title": "parrot 11", "minutes": 5, "seconds": 55 }
    ]
  },
  "Landing": {
    "artist": "First Dog",
    "title": "Landing",
    "id": "DUG016",
    "year": 2011,
    "type": "mini-album",
    "bc_id": "2607287906",
    "bc_link": "https://firstdog.bandcamp.com/album/landing",
    "cover_s": "/images/acxs/DUG016.jpg",
    "cover_l": "/images/acl/DUG016.jpg",
    "tracklist": [
      { "title": "AtollIII", "minutes": 3, "seconds": 18 },
      { "title": "Pterodactyl", "minutes": 5, "seconds": 52 },
      { "title": "Ig Neous", "minutes": 3, "seconds": 57 },
      { "title": "Earthlectro", "minutes": 4, "seconds": 23 },
      { "title": "Two Bandits", "minutes": 6, "seconds": 4 }
    ]
  },
  "Corecore": {
    "artist": "First Dog",
    "title": "Corecore",
    "id": "DUG015",
    "year": 2011,
    "type": "album",
    "bc_id": "3776743387",
    "bc_link": "https://firstdog.bandcamp.com/album/corecore",
    "cover_s": "/images/acxs/DUG015.jpg",
    "cover_l": "/images/acl/DUG015.jpg",
    "tracklist": [
      { "title": "ig ne ous", "minutes": 3, "seconds": 44 },
      { "title": "final future", "minutes": 4, "seconds": 16 },
      { "title": "earthlectro", "minutes": 6, "seconds": 42 },
      { "title": "prehistoric", "minutes": 5, "seconds": 0 },
      { "title": "the long job", "minutes": 4, "seconds": 12 },
      { "title": "mega fossil", "minutes": 5, "seconds": 54 },
      { "title": "arkosaur", "minutes": 3, "seconds": 6 },
      { "title": "gator", "minutes": 3, "seconds": 18 },
      { "title": "sleep parade 1", "minutes": 7, "seconds": 48 },
      { "title": "sleep parade 2", "minutes": 7, "seconds": 45 },
      { "title": "also i feel like", "minutes": 5, "seconds": 39 }
    ]
  },
  "Kondo Split": {
    "artist": "FDVCE & Dylan Jones",
    "title": "Kondo Split",
    "id": "DUG013b",
    "year": 2010,
    "type": "split",
    "bc_id": "1365005315",
    "bc_link": "https://firstdog.bandcamp.com/album/kond-split",
    "cover_s": "/images/acxs/DUG013b.jpg",
    "cover_l": "/images/acl/DUG013b.jpg",
    "tracklist": [
      { "title": "The Color of the Bone Marrow in the Sunlight", "minutes": 1, "seconds": 44 },
      { "title": "Wind's Gods", "minutes": 2, "seconds": 42 },
      { "title": "Staff Jam", "minutes": 1, "seconds": 51 },
      { "title": "Gila Monster", "minutes": 3, "seconds": 23 },
      { "title": "Go Into the Light Until We Meet Again", "minutes": 3, "seconds": 17 },
      { "title": "Dissolving", "minutes": 9, "seconds": 6 },
      { "title": "Grab Push Climb Stop", "minutes": 8, "seconds": 57 },
      { "title": "Clocks", "minutes": 6, "seconds": 6 },
      { "title": "On the Waves", "minutes": 7, "seconds": 39 }
    ]
  },
  "Every Machine On": {
    "artist": "FDVCE",
    "title": "Every Machine On",
    "id": "DUG013",
    "year": 2010,
    "type": "album",
    "bc_id": "3787772774",
    "bc_link": "https://firstdog.bandcamp.com/album/every-machine-on",
    "cover_s": "/images/acxs/DUG013.jpg",
    "cover_l": "/images/acl/DUG013.jpg",
    "tracklist": [
      { "title": "machine 01", "minutes": 4, "seconds": 8 },
      { "title": "machine 02", "minutes": 3, "seconds": 18 },
      { "title": "machine 03", "minutes": 3, "seconds": 19 },
      { "title": "machine 04", "minutes": 2, "seconds": 48 },
      { "title": "machine 05", "minutes": 2, "seconds": 0 },
      { "title": "machine 06", "minutes": 3, "seconds": 43 },
      { "title": "machine 07", "minutes": 3, "seconds": 20 },
      { "title": "machine 08", "minutes": 4, "seconds": 7 },
      { "title": "machine 09", "minutes": 1, "seconds": 8 },
      { "title": "machine 10", "minutes": 2, "seconds": 6 },
      { "title": "machine 11", "minutes": 3, "seconds": 15 },
      { "title": "machine 12", "minutes": 0, "seconds": 45 },
      { "title": "machine 13", "minutes": 3, "seconds": 13 },
      { "title": "machine 14", "minutes": 1, "seconds": 9 },
      { "title": "machine 15", "minutes": 7, "seconds": 0 }
    ]
  },
  "Stoner": {
    "artist": "FDVCE",
    "title": "Stoner",
    "id": "DUG012",
    "year": 2010,
    "type": "album",
    "bc_id": "709445185",
    "bc_link": "https://firstdog.bandcamp.com/album/stoner",
    "cover_s": "/images/acxs/DUG012.jpg",
    "cover_l": "/images/acl/DUG012.jpg",
    "tracklist": [
      { "title": "Telekinesis-Bear", "minutes": 1, "seconds": 31 },
      { "title": "Whale", "minutes": 5, "seconds": 35 },
      { "title": "Raimbow Paw", "minutes": 4, "seconds": 43 },
      { "title": "Dangerous Wobblers Approaching", "minutes": 8, "seconds": 19 },
      { "title": "Gone / Forever", "minutes": 7, "seconds": 8 },
      { "title": "Raimbow Maw", "minutes": 7, "seconds": 19 },
      { "title": "The Punisher", "minutes": 0, "seconds": 34 },
      { "title": "Bo Mamah", "minutes": 8, "seconds": 42 },
      { "title": "Bamana Pheel Vorquest", "minutes": 5, "seconds": 0 },
      { "title": "Doggies / Flippi", "minutes": 4, "seconds": 24 }
    ]
  },
  "Colossus Archosaur": {
    "artist": "FDVCE",
    "title": "Colossus Archosaur",
    "id": "DUG011",
    "year": 2010,
    "type": "album",
    "bc_id": "3450513756",
    "bc_link": "https://firstdog.bandcamp.com/album/colossus-archosaur",
    "cover_s": "/images/acxs/DUG011.jpg",
    "cover_l": "/images/acl/DUG011.jpg",
    "tracklist": [
      { "title": "011-01", "minutes": 2, "seconds": 47 },
      { "title": "011-02", "minutes": 3, "seconds": 10 },
      { "title": "011-03", "minutes": 3, "seconds": 28 },
      { "title": "011-04", "minutes": 0, "seconds": 43 },
      { "title": "011-05", "minutes": 4, "seconds": 4 },
      { "title": "011-06", "minutes": 3, "seconds": 43 },
      { "title": "011-07", "minutes": 4, "seconds": 20 },
      { "title": "011-08", "minutes": 4, "seconds": 31 },
      { "title": "011-09", "minutes": 2, "seconds": 0 },
      { "title": "011-10", "minutes": 0, "seconds": 43 },
      { "title": "011-11", "minutes": 4, "seconds": 20 },
      { "title": "011-12", "minutes": 1, "seconds": 49 },
      { "title": "011-13", "minutes": 3, "seconds": 22 },
      { "title": "011-14", "minutes": 5, "seconds": 28 },
      { "title": "011-15", "minutes": 4, "seconds": 3 },
      { "title": "011-16", "minutes": 4, "seconds": 22 },
      { "title": "011-17", "minutes": 1, "seconds": 20 },
      { "title": "011-18", "minutes": 4, "seconds": 53 },
      { "title": "011-19", "minutes": 2, "seconds": 49 },
      { "title": "011-20", "minutes": 2, "seconds": 30 },
      { "title": "011-21", "minutes": 3, "seconds": 14 },
      { "title": "011-22", "minutes": 5, "seconds": 34 }
    ]
  },
  "Provenance Fen": {
    "artist": "FDVCE",
    "title": "Provenance Fen",
    "id": "DUG000b",
    "year": 2009,
    "type": "compilation",
    "bc_id": "3261715349",
    "bc_link": "https://firstdog.bandcamp.com/album/provenance-fen",
    "cover_s": "/images/acxs/DUG000b.jpg",
    "cover_l": "/images/acl/DUG000b.jpg",
    "tracklist": [
      { "title": "009-01", "minutes": 2, "seconds": 28 },
      { "title": "009-02", "minutes": 5, "seconds": 45 },
      { "title": "009-03", "minutes": 4, "seconds": 36 },
      { "title": "009-04", "minutes": 2, "seconds": 9 },
      { "title": "009-05", "minutes": 1, "seconds": 50 },
      { "title": "009-06", "minutes": 3, "seconds": 20 },
      { "title": "009-07", "minutes": 0, "seconds": 50 },
      { "title": "009-08", "minutes": 2, "seconds": 23 },
      { "title": "009-09", "minutes": 1, "seconds": 36 },
      { "title": "009-10", "minutes": 1, "seconds": 25 },
      { "title": "009-11", "minutes": 2, "seconds": 6 },
      { "title": "009-12", "minutes": 3, "seconds": 40 },
      { "title": "009-13", "minutes": 2, "seconds": 59 },
      { "title": "009-14", "minutes": 2, "seconds": 35 },
      { "title": "009-15", "minutes": 2, "seconds": 53 },
      { "title": "009-16", "minutes": 1, "seconds": 58 },
      { "title": "009-17", "minutes": 3, "seconds": 5 },
      { "title": "009-18", "minutes": 3, "seconds": 42 },
      { "title": "009-19", "minutes": 3, "seconds": 0 },
      { "title": "009-20", "minutes": 0, "seconds": 27 },
      { "title": "009-21", "minutes": 3, "seconds": 23 },
      { "title": "009-22", "minutes": 6, "seconds": 12 },
      { "title": "010-02", "minutes": 5, "seconds": 0 },
      { "title": "010-03", "minutes": 6, "seconds": 26 },
      { "title": "010-04", "minutes": 5, "seconds": 16 },
      { "title": "010-05", "minutes": 5, "seconds": 58 },
      { "title": "010-06", "minutes": 7, "seconds": 38 },
      { "title": "010-07", "minutes": 4, "seconds": 9 },
      { "title": "010-08", "minutes": 1, "seconds": 5 },
      { "title": "010-09", "minutes": 2, "seconds": 43 },
      { "title": "010-10", "minutes": 4, "seconds": 2 },
      { "title": "010-11", "minutes": 1, "seconds": 36 },
      { "title": "010-12", "minutes": 2, "seconds": 11 },
      { "title": "010-13", "minutes": 4, "seconds": 39 },
      { "title": "010-14", "minutes": 4, "seconds": 2 },
      { "title": "010-15", "minutes": 6, "seconds": 31 },
      { "title": "010-16", "minutes": 6, "seconds": 50 }
    ]
  },
  "Primeval Dross": {
    "artist": "FDVCE",
    "title": "Primeval Dross",
    "id": "DUG000a",
    "year": 2008,
    "type": "compilation",
    "bc_id": "3292042228",
    "bc_link": "https://firstdog.bandcamp.com/album/primeval-dross",
    "cover_s": "/images/acxs/DUG000a.jpg",
    "cover_l": "/images/acl/DUG000a.jpg",
    "tracklist": [
      { "title": "003-01", "minutes": 2, "seconds": 5 },
      { "title": "003-02", "minutes": 6, "seconds": 17 },
      { "title": "003-03", "minutes": 2, "seconds": 1 },
      { "title": "003-04", "minutes": 3, "seconds": 29 },
      { "title": "003-05", "minutes": 0, "seconds": 30 },
      { "title": "003-06", "minutes": 2, "seconds": 12 },
      { "title": "003-07", "minutes": 0, "seconds": 58 },
      { "title": "003-08", "minutes": 3, "seconds": 0 },
      { "title": "003-09", "minutes": 0, "seconds": 41 },
      { "title": "003-10", "minutes": 4, "seconds": 43 },
      { "title": "003-11", "minutes": 6, "seconds": 17 },
      { "title": "003-12", "minutes": 0, "seconds": 39 },
      { "title": "006-01", "minutes": 2, "seconds": 41 },
      { "title": "006-02", "minutes": 2, "seconds": 3 },
      { "title": "006-03", "minutes": 2, "seconds": 50 },
      { "title": "006-04", "minutes": 4, "seconds": 35 },
      { "title": "006-05", "minutes": 8, "seconds": 5 },
      { "title": "006-06", "minutes": 6, "seconds": 24 },
      { "title": "006-07", "minutes": 2, "seconds": 45 },
      { "title": "006-08", "minutes": 1, "seconds": 8 }
    ]
  }
}

type WhatIveMade = {
  heading: string,
  items: {
    dug: Dug,
    filter?: string,
    blend?: string
  }[]
}

export const whatIveMade: WhatIveMade[] = [
    {
      heading: "noisy stuff",
      items: [
          {
              dug: dugs["Humans"],
              filter: 'invert(1)',
          },
          {
              dug: dugs["Goos Beyond"],
              filter: 'brightness(0.7) contrast(5)',
          },
          {
              dug: dugs["XL"],
              filter: 'invert(1)',
          },
          {
              dug: dugs["Fish Antlers"],
              filter: 'grayscale(1) contrast(2)',
          },
          {
              dug: dugs["Money Snakes"],
          },
      ]
    },

    {
      heading: "melodic stuff",
      items: [
        {
          dug: dugs["Big Fish eat Little Fish"],
          filter: 'grayscale(1) contrast(3)'
        },
        {
          dug: dugs["Hell Scenery"],
          filter: 'grayscale(1) contrast(3)'
        },
        {
          dug: dugs["Possum with Apple"],
          filter: 'grayscale(1) contrast(3)'
        },
        {
          dug: dugs["Isyiau"],
          filter: 'grayscale(1) contrast(2)'
        },
        {
          dug: dugs["Bird in a Cave"],
          filter: 'grayscale(1) contrast(3)'
        },
        {
          dug: dugs["Aw Cute"],
          filter: 'invert(1) brightness(0.6) grayscale(1) contrast(7)'
        },
        {
          dug: dugs["Feeble"],
          filter: 'grayscale(1) invert(1) contrast(3)'
        },
      ]
    },
        {
      heading: "collabs with thos flowers",
      items: [
          {
              dug: dugs["Crank Historic"],
              filter: 'invert(1) grayscale(1) contrast(2)',
          },
          {
              dug: dugs["A Piece Of Hell For Ourselves"],
              filter: 'grayscale(1) invert(1) brightness(1) contrast(3)',
          },
          {
              dug: dugs["I-15 Dream"],
              filter: 'grayscale(2) contrast(2)',
          }
      ]
    },
]