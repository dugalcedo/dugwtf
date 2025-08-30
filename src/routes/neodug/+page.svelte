<script lang="ts">
    import RegisterForm from "./RegisterForm.svelte";
    import LogInForm from "./LogInForm.svelte";
    const { data } = $props()

</script>

<div class="res">
    {#if !data.user}
        <RegisterForm />
        <LogInForm />
    {:else}
        <h2>Welcome back, {data.user.username}</h2>
    {/if}
</div>