<script lang="ts">
    type Love = {
        artist: string
        title: string
        url: string
    };

    const loves: Love[] = [
        {
            artist: 'Chris Weisman',
            title: 'Transparency',
            url: 'https://chrisweisman.bandcamp.com/album/transparency'
        },
        {
            artist: 'Modest Mouse',
            title: 'Lonesome Crowded West',
            url: 'https://www.youtube.com/watch?v=Io3T8MglU1o'
        },
        {
            artist: 'Autechre',
            title: 'Chiastic Slide',
            url: 'https://www.youtube.com/watch?v=hqsLKOZ6xN8'
        },
        {
            artist: 'Ann Steel',
            title: 'Ann Steel',
            url: 'https://www.youtube.com/watch?v=vHCvfkvxg8c'
        },
        {
            artist: 'Avey Tare and Panda Bear',
            title: 'Spirit They\'re Gone, Spirit They\'ve Vanished',
            url: 'https://www.youtube.com/watch?v=9QRpk1I34YI'
        },
        {
            artist: 'Battles',
            title: 'EP C / B EP',
            url: 'https://www.youtube.com/watch?v=5rCp-ZZjMCE'
        },
        {
            artist: 'Black Dice',
            title: 'Load Blown',
            url: 'https://www.youtube.com/watch?v=L9w9lxFCeAE'
        },
        {
            artist: 'Blink-182',
            title: 'Blink-182',
            url: 'https://www.youtube.com/watch?v=pat2-f0BXCg'
        },
        {
            artist: 'Boredoms',
            title: 'Super æ',
            url: 'https://www.youtube.com/watch?v=_21tq1aJNAA'
        },
        {
            artist: 'Bygones',
            title: 'by-',
            url: 'https://www.youtube.com/watch?v=25ftyIncgIk'
        },
        {
            artist: 'Cheer-Accident',
            title: 'The Why Album',
            url: 'https://www.youtube.com/watch?v=n8fx_cif6Ls'
        },
        {
            artist: 'Cocteau Twins',
            title: 'Treasure',
            url: 'https://www.youtube.com/watch?v=o7tcFKakZTA'
        },
        {
            artist: 'Ornette Coleman',
            title: 'Dancing in Your Head',
            url: 'https://www.youtube.com/watch?v=23QVY94tAj0'
        },
        {
            artist: "D'Angelo and The Vanguard",
            title: 'Black Messiah',
            url: 'https://www.youtube.com/watch?v=T3CunfPYkME'
        },
        {
            artist: "Miles Davis",
            title: "Get Up With It",
            url: "https://www.youtube.com/watch?v=3Fc_-VZlkcM"
        },
        {
            artist: "Death Grips",
            title: "Exmilitary",
            url: "https://www.youtube.com/watch?v=HtbAgynP8iY"
        },
        {
            artist: "Deerhoof",
            title: "Miracle-Level",
            url: 'https://www.youtube.com/watch?v=DF1oQ2d_qlo'   
        },
        {
            artist: "Djeli Moussa Diawara",
            title: "Yasimika",
            url: 'https://www.youtube.com/watch?v=n9TcqhwIPB8'
        },
        {
            artist: "Dirty Projectors",
            title: "Rise Above",
            url: "https://www.youtube.com/watch?v=7tfQzTxCdms"
        },
        {
            artist: "Todd Edwards",
            title: "Odyssey",
            url: "https://www.youtube.com/watch?v=LyYpAgwG36A"
        },
        {
            artist: "Philip Glass",
            title: "Einstein on the Beach",
            url: "https://www.youtube.com/watch?v=doLaSVWABrw"
        },
        {
            artist: "El Guincho",
            title: "Alegranza",
            url: "https://www.youtube.com/watch?v=0SgsWTWqDxQ"
        },
        {
            artist: "Zach Hill",
            title: "Astrological Straits",
            url: "https://www.youtube.com/watch?v=M4kVOJfZg_E"
        },
        {
            artist: "Ice Cube",
            title: "Death Certificate",
            url: "https://www.youtube.com/watch?v=bszVvEnkUrI"
        },
        {
            artist: "Public Enemy",
            title: "Fear of a Black Planet",
            url: "https://www.youtube.com/watch?v=vfowA1lg2G8"
        },
        {
            artist: "Inu",
            title: "Meshi Kuuna",
            url: "https://www.youtube.com/watch?v=nNP3wasIV8A"
        },
        {
            artist: "The Ladies",
            title: "They Mean Us",
            url: "https://www.youtube.com/watch?v=UILqqsEAkzg"
        },
        {
            artist: "Lellek Jazz",
            title: "Bye-bye",
            url: "https://lellekjazz.bandcamp.com/album/bye-bye"
        },
        {
            artist: "Little Teeth",
            title: "Child Bearing Man",
            url: "https://www.youtube.com/watch?v=Hcl4AX4krb0"
        },
        {
            artist: "Muslimgauze",
            title: "Jaal ab Dullah",
            url: "https://www.youtube.com/watch?v=jhgGnEGq2Uw"
        },
        {
            artist: "My Bloody Valentine",
            title: "EPs 1988-1991",
            url: "https://www.youtube.com/watch?v=xotaOLuJZnc"
        },
        {
            artist: "Milton Nascimento & Lô Borges",
            title: "Clube da esquina",
            url: "https://www.youtube.com/watch?v=Lexd2xvMpxY"
        },
        {
            artist: "Michael Nyman",
            title: "The Kiss and other movements",
            url: "https://www.youtube.com/watch?v=BXp8QFVObhk"
        },
        {
            artist: "Panda Bear",
            title: "Person Pitch",
            url: "https://www.youtube.com/watch?v=iRk1DM04GfA"
        },
        {
            artist: "P-Model",
            title: "In a model room",
            url: "https://www.youtube.com/watch?v=0BXyH4f-Z80"
        },
        {
            artist: "Polvo",
            title: "Exploded Drawing",
            url: "https://www.youtube.com/watch?v=hTCv1DT5vl8"
        },
        {
            artist: "Ramones",
            title: "Ramones",
            url: "https://www.youtube.com/watch?v=aka98A0Ekrw"
        },
        {
            artist: "R.E.M.",
            title: "Murmur",
            url: "https://www.youtube.com/watch?v=NB6vO7OPFgY"
        },
        {
            artist: "The Rosy Cross",
            title: "Death Angel's Life Song",
            url: "https://bongrodent.bandcamp.com/track/newborn-baby"
        },
        {
            artist: "Sonic Youth",
            title: "Daydream Nation",
            url: "https://www.youtube.com/watch?v=10rLJjBLQZ8"
        },
        {
            artist: "SOPHIE",
            title: "Oil of Every Pearl's Un-Insides",
            url: "https://www.youtube.com/watch?v=_LFxr2bUEUY"
        },
        {
            artist: "Sparks",
            title: "Angst in my Pants",
            url: "https://www.youtube.com/watch?v=1r9lSa_9TKg"
        },
        {
            artist: "Stereolab",
            title: "Switched On",
            url: "https://www.youtube.com/watch?v=JpHiIk4-1j8"
        },
        {
            artist: "Teenage Fanclub",
            title: "Grand Prix",
            url: "https://www.youtube.com/watch?v=amTkk5-AwHA"
        },
        {
            artist: "Thinking Fellers Union Local 282",
            title: "Strangers from the Universe",
            url: "https://www.youtube.com/watch?v=3pCSZOOy5z4"
        },
        {
            artist: "Trees and Flowers",
            title: "The End Time Tapes",
            url: "https://pelagoramrecordings.bandcamp.com/track/tipping-snout"
        },
        {
            artist: "U.S. Maple",
            title: "Purple On Time",
            url: "https://www.youtube.com/watch?v=dR8d6YBAM64"
        },
        {
            artist: "The Velvet Underground",
            title: "White Light/White Heat",
            url: "https://www.youtube.com/watch?v=RotlKj4S_Bk"
        },
        {
            artist: "Weezer",
            title: "The Blue Album", 
            url: "https://www.youtube.com/watch?v=scrrqizJmlg"
        },
        {
            artist: "Kurt Weisman",
            title: "Spiritual Sci-Fi",
            url: "https://www.youtube.com/watch?v=lX8ni30k0n4"
        },
        {
            artist: "Wipers",
            title: "Youth of America",
            url: "https://www.youtube.com/watch?v=tUm_FeB0KlQ"
        },
        {
            artist: "Wippy Bonstack",
            title: "22",
            url: "https://www.youtube.com/watch?v=OYersylttPU"
        },
        {
            artist: "Xiu Xiu",
            title: "Knife Play",
            url: "https://www.youtube.com/watch?v=CbebGx9tHQs"
        },
        {
            artist: "Yes",
            title: "Fragile",
            url: "https://www.youtube.com/watch?v=hBAauFYod80"
        },
        {
            artist: "YMO",
            title: "Technodelic",
            url: "https://www.youtube.com/watch?v=4-XUTTqMs48"
        },
        {
            artist: "WRS",
            title: "Zone",
            url: "https://wrswrswrswrs.bandcamp.com/album/zone"
        }
    ]

    function shuffle(array: any[]) {
        let currentIndex = array.length;
        while (currentIndex != 0) {
            let randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
    }

    shuffle(loves)
</script>

<div class="res">
    <h2>music i love</h2>
    <ul class="loves">
        {#each loves as love}
            <li>
                <a href={love.url} target="_blank">
                    <b><em>{love.title}</em></b>
                    <span>by {love.artist}</span>
                </a>
            </li>
        {/each}
    </ul>
</div>

<style>
    ul {
        list-style-type: none;
    }

    a {
        display: grid;
        grid-template-columns: 1fr 1fr;
        padding: 7px 0;

        &:hover {
            outline: 1px dashed aquamarine;
        }
    }
</style>