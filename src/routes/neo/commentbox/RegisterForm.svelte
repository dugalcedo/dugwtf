<script lang="ts">
    import Form from "../../../components/Form.svelte";
</script>

<Form
    buttonText="Register"
    url="/api/neodug/user"
    method="POST"
>
    <div class="head">
        <h4>Register</h4>
    </div>
    <div class="field">
        <label for="neodug-register_username">Username</label>
        <input type="text" id="neodug-register_username" name="username" required>
    </div>
    <div class="field">
        <label for="neodug-register_email">Email</label>
        <input type="email" id="neodug-register_email" name="email" required>
    </div>
    <div class="field">
        <label for="neodug-register_password">Password</label>
        <input type="password" id="neodug-register_password" name="password" required>
    </div>
    <div class="field">
        <label for="neodug-register_password2">Repeat password</label>
        <input type="password" id="neodug-register_password2" name="password2" required>
    </div>
</Form>