<script lang="ts">
    import { type CityInGame } from "./cgTypes";
    import { v7 } from "uuid";

    const {
        city,
        userAnswer
    }: {
        city: CityInGame
        userAnswer: string
    } = $props()

    const id = v7()
    let submitting = $state(false)
    let dialog = $state<HTMLDialogElement>()
    let reason = $state("")

    function handleSubmit() {
        submitting = true
        setTimeout(() => {
            dialog!.close()
        }, 2000);
        fetch("/api/stuff/cityguessr/report", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                city,
                userAnswer,
                reason
            })
        })
    }
</script>

<button class="report-btn no-flicker" commandfor={id} command="show-modal">
    <img src="/icons/flag.svg" alt="flag">
</button>

<dialog bind:this={dialog} closedby="any" id={id}>
    {#if submitting}
    <p>your report will be submitted</p>
    {:else}
    <form onsubmit={e => {
        e.preventDefault()
        handleSubmit()
    }}>
        <div class="head">
            <h2>report cityGuessr answer</h2>
        </div>
        <div class="body">
            <div class="field">
                for the city: <strong>{city.name}</strong>, <small>{city.admin1}, {city.country}</small>
                <br><br>
                you guessed: <strong>{userAnswer}</strong>
            </div>
            <label class="field" style="display: grid; grid-template-columns: 80px 1fr !important;">
                <span >it should have been correct because:</span>
                <textarea name="reason" bind:value={reason} placeholder="enter your reason here"></textarea>
            </label>
        </div>
        <div class="foot">
            <button>send report</button>
        </div>
    </form>
    {/if}
</dialog>

<style>
    .report-btn {
        border: 0;
        background-color: yellow;
        padding: 0;
        font-weight: bold;
        width: 18px;
        height: 18px;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;

        & img {
            width: 12px;
            filter: invert(1);
        }
    }

    dialog {
        background-color: var(--bg);
        color: var(--fg);
    }

    form {
        background-color: var(--bg);
        color: var(--fg);
    }

    form button {
        background-color: var(--hl);
        color: var(--bg) !important;
    }
</style>