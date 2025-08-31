<script lang="ts">
    import Form from "../../lib/components/Form.svelte";
    const { user }: { user: NeodugUser_FE } = $props()
</script>

<Form
    buttonText="Register comment box"
    url="/api/neodug/commentbox"
    method="POST"
>
    <div class="field">
        <label for="register-comment-box_name">Name</label>
        <input type="text" id="register-comment-box_name" name="name" required>
    </div>
</Form>