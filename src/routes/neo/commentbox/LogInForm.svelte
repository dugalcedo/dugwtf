<script lang="ts">
    import Form from "../../../lib/components/Form.svelte";
</script>

<Form
    buttonText="Log in"
    url="/api/neodug/user"
    method="PUT"
>
    <div class="head">
        <h4>Log in</h4>
    </div>
    <div class="field">
        <label for="neodug-register_username">Username</label>
        <input type="text" id="neodug-register_username" name="username" required>
    </div>
    <div class="field">
        <label for="neodug-register_password">Password</label>
        <input type="password" id="neodug-register_password" name="password" required>
    </div>
</Form>