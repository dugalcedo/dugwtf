<script lang="ts">
    import type { Snippet } from "svelte";

    type FormState = {
        errors: { [key: string]: string }
        formError: string
    }

    type SubmitContext = {
        e: SubmitEvent
        data: { [key: string]: any }
    }

    const {
        children,
        title,
        submitBtnText = "SUBMIT",
        formState = $bindable(),
        handler
    }: {
        children: Snippet
        title: string
        submitBtnText?: string
        formState: FormState
        handler: (ctx: SubmitContext) => void | Promise<void>
    } = $props()

    // ----- STATE -----
    let submitting = $state(false)

    const handleSubmit = async (e: SubmitEvent) => {
        e.preventDefault()

        // check lock
        if (submitting) return;

        // reset & lock
        formState.formError = "";
        submitting = true;

        // get data
        const data = Object.fromEntries(new FormData(e.currentTarget as HTMLFormElement)) as any;
        await handler({
            e,
            data
        })

        // unlock
        submitting = false;
    }

    // ----- HELPERS -----

</script>

<form onsubmit={handleSubmit}>
    <div class="head">
        <h3>{title}</h3>
    </div>
    <div class="body">
        {@render children()}
    </div>
    <div class="foot">
        <button>
            {submitBtnText}
        </button>
    </div>
</form>