<script lang="ts">
    import type { FormEventHandler } from "svelte/elements";
    import { collageStore, addCollage } from "../collage.svelte.js";

    let error = $state("")

    const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault()
        error = ""
        let name = (new FormData(e.currentTarget).get('name') || "") as string;
        name = name.trim().toLowerCase()

        if (collageStore.data.collages.some(list => list.name == name)) {
            error = `Name taken`
            return
        }

        addCollage(name)
    }
</script>

<form onsubmit={handleSubmit}>
    <div class="head">Create new collage</div>
    <div class="body">
        <div class="field">
            <label for="createCollage_name">Collage name</label>
            <input type="text" id="createCollage_name" name="name">
        </div>
    </div>
    <div class="foot">
        <button>
            Create
        </button>
        <span class="error">{error}</span>
    </div>
</form>

<style>
    form {
        margin: 1rem 0;
    }
</style>