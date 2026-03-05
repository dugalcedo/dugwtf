<script lang="ts">
    import DugForm from "../../components/forms/DugForm.svelte";
    import { getErrorMessage } from "$lib/clientUtils/getErrorMessage";
</script>

<!-- SIGN UP FORM -->
<DugForm 
    config={{
        title: "SIGN UP",
        submitBtnText: "SIGN UP",
        fields: [
            // DISPLAY NAME
            {
                type: "text",
                label: "DISPLAY NAME",
                name: "displayName",
                required: true,
                min: 3,
                max: 31
            },
            // EMAIL
            {
                type: "email",
                label: "EMAIL",
                name: "email",
                required: true,
                min: 6,
                max: 255
            },
            // PASSWORD
            {
                type: "password",
                label: "PASSWORD",
                name: "password",
                required: true,
                min: 6,
                max: 63
            },
            // REPEAT PASSWORD
            {
                type: "password",
                label: "REPEAT PASSWORD",
                name: "password2",
                required: true,
                validate(value, data) {
                    if (value !== data.password) return "passwords must match"
                }
            },
        ],
        handler: async ({ data, setFormError }) => {
            const res = await fetch("/api/db/user/signup", {
                method: "POST",
                body: JSON.stringify(data)
            })

            if (!res.ok) {
                setFormError(await getErrorMessage(res))
                return
            }

            window.location.href = "/"
        },
    }}
/>

<!-- LOG IN FORM -->
 <DugForm 
    config={{
        title: "LOG IN",
        submitBtnText: "LOG IN",
        fields: [
            {
                type: "text",
                label: "DISPLAY NAME",
                name: "displayName",
            },
            {
                type: "password",
                label: "PASSWORD",
                name: "password"
            }
        ],
        handler: async ({ data, setFormError }) => {
            const res = await fetch("/api/db/user/login", {
                method: "POST",
                body: JSON.stringify(data)
            })

            if (!res.ok) {
                setFormError(await getErrorMessage(res))
                return
            }

            window.location.href = "/"
        }
    }}
 />