<script lang="ts">
    import Field from "./Field.svelte";
    import { nextId } from "$lib/util/generateId";

    const {
        config
    }: {
        config: DugFormConfig
    } = $props()

    // ===== STATE =====
    let submitting = $state(false)
    let errors: any = $state({})
    let formError = $state("")
    const setFormError = (msg: string) => formError = msg;

    const handleSubmit = async (e: SubmitEvent) => {
        e.preventDefault()

        // check lock
        if (submitting) return;

        // reset & lock
        errors = {}
        formError = ""
        submitting = true

        // get data
        const data = Object.fromEntries(new FormData(e.currentTarget as HTMLFormElement)) as any;        

        // validate
        await validate(data)

        // check errors
        const valid = Object.keys(errors).length === 0;
        if (!valid) {
            formError = "form is not properly filled out"
            submitting = false
            return
        }

        // run handler
        await config.handler({
            e,
            data,
            setFormError
        })

        // unlock
        submitting = false
    }

    // ===== HELPERS =====
    const validate = async (data: any) => {
        for (const field of config.fields) {
            // get value
            let value = data[field.name]
            if (typeof value === "string") value = value.trim();

            // check required
            if (field.required && !value) {
                errors[field.name] = "requried"
                continue
            }

            // check min/max for strings
            if (['text', 'email', 'password'].includes(field.type)) {
                if (
                    (field.min !== undefined && value.length < field.min)
                    || (field.max !== undefined && value.length > field.max)
                ) {
                    if (field.min === undefined) errors[field.name] = `must be less than ${field.max} characters`
                    if (field.max === undefined) errors[field.name] = `must be less than ${field.min} characters`
                    errors[field.name] = `must be ${field.min}-${field.max} characters`
                    continue
                }
            }

            // check custom validator
            if (field.validate) {
                const msg = field.validate(value, data)
                if (msg) {
                    errors[field.name] = msg
                    continue
                }
            }
        }
    }
</script>

<form onsubmit={handleSubmit}>
    <div class="head">
        <h3>{config.title}</h3>
    </div>
    <div class="body">
        {#each config.fields as field}
        {@const id = `field-${nextId()}`}
            <Field 
                id={id}
                label={field.label}
                name={field.name}
                _class={field._class}
                style={field.style}
                error={errors[field.name]}
            >
                {#if ['text', 'email', 'password'].includes(field.type)}
                    <input id={id} name={field.name} type={field.type} required={field.required===true}>
                {/if}
            </Field>
        {/each}
    </div>
    <div class="foot">
        <button type="submit" disabled={submitting}>
            {submitting ? "..." : config.submitBtnText}
        </button>
        {#if formError.trim()}
            <span class="error">{formError}</span>
        {/if}
    </div>
</form>

<style>
    form {
        width: 600px;
        max-width: 100%;
    }
</style>