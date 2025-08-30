<script lang="ts">
    import type { Snippet } from "svelte";
    import type { FormEventHandler } from "svelte/elements";
    import { getErrorMessage } from "../index.js";

    type E = Event & {
        currentTarget: EventTarget & HTMLFormElement;
    }

    type FormApi = {
        err: (msg: string) => void
    }

    const {
        id,
        class: className,
        style,
        children,
        buttonText,
        url,
        method = "GET",
        body = {},
        beforeSubmit = (e, fd, api) => fd,
        onSuccess = (result) => {window.location.reload()}
    } : {
        id?: string,
        class?: string,
        style?: string,
        children: Snippet,
        buttonText: string,
        url: string,
        method?: string,
        body?: Record<string, any>,
        beforeSubmit?: (e: E, fd: any, api: FormApi) => any,
        onSuccess?: string | ((result: any) => void)
    } = $props()

    let error = $state("")
    let loading = $state(false)

    const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault()
        error = ""
        loading = true

        const api: FormApi = {
            err(msg) {error = msg}
        }

        const fd = beforeSubmit(e, Object.fromEntries(new FormData(e.currentTarget)), api)

        if (error) {
            loading = false
            return
        };

        const options = {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                ...fd,
                ...body
            })
        }

        const res = await fetch(url, options)

        if (!res.ok) {
            error = await getErrorMessage(res)
            loading = false
            return
        }

        if (typeof onSuccess === 'string') {
            window.location.href = onSuccess
            loading = false
        } else {
            onSuccess(await res.json())
            loading = false
        }
    }

</script>

<form id={id} class={className} style={style} onsubmit={handleSubmit}>
    {@render children()}
    <div class="foot">
        <button disabled={loading}>
            {loading ? "..." : buttonText}
        </button>
        <span class="error">
            {error}
        </span>
    </div>
</form>