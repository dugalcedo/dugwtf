<script lang="ts">
    import RegisterForm from "./RegisterForm.svelte";
    import LogInForm from "./LogInForm.svelte";
    import RegisterCommentBoxForm from "./RegisterCommentBoxForm.svelte";
    import Unverified from "./Unverified.svelte";
    import CommentBoxManager from "./CommentBoxManager.svelte";
    const { data } = $props()

    console.log("Neodug data:", data)

</script>

<div class="res">
    {#if !data.user}
        <RegisterForm />
        <LogInForm />
    {:else}
        <h2>Welcome back, {data.user.username}</h2>
        {#if data.user.commentboxes.length}
            <CommentBoxManager commentbox={data.user.commentboxes[0]} />
        {:else}
            <RegisterCommentBoxForm user={data.user} />
        {/if}
        {#if !data.user.verified}
            <Unverified user={data.user} ev={data.emailVerification} />
        {/if}
    {/if}
</div>