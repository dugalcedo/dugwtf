<script lang="ts">
    const getRandomFilms = async () => {
        const res = await fetch("https://api.letterboxd.com/api/v0/films")
        const data = await res.json()
        console.log(data)
    }

    getRandomFilms()
</script>

movie guessr