<script lang="ts">
    const contacts = [
        { name: "discord", value: "dugnoise" },
        { name: "email", value: "dougalcedo@gmail.com", href: "mailto:dougalcedo@gmail.com" },
        { name: "github", value: "dugalcedo", href: "https://github.com/dugalcedo" }
    ]
</script>

<div class="res">
    <h2>contact dug</h2>
    <br>
    <div class="contacts">
        {#each contacts as contact}
            <div class="contact">
                <img class="icon" src="/icons/{contact.name}.svg" alt="{contact.name} icon">
                <div class="name">{contact.name}</div>
                <div class="value">
                    {#if contact.href}
                        <a href="{contact.href}" target="_blank">{contact.value}</a>
                    {:else}
                        {contact.value}
                    {/if}
                </div>
            </div>
        {/each}
    </div>
</div>

<style>
    .contact {
        display: grid;
        grid-template-columns: 1fr 3fr 3fr;
    }

    .icon {
        width: 35px;
    }
</style>