<script lang="ts">
    import Form from "./Form.svelte";
    import { store } from "../_old-lib/store.svelte.js";
</script>

<div>
    <p>You are not logged in</p>

    <div class="col-2">
        <Form
            buttonText="Log in"
            url="/api/neodug/user"
            method="PUT"
            onSuccess={result => {
                store.user = result.user
                store.userLoadingState = 'logged in'
            }}
        >
            <h3 class="head">Log in</h3>
            <div class="body">
                <div class="field">
                    <label for="login_u">username</label>
                    <input type="text" id="login_u" name="username">
                </div>
                <div class="field">
                    <label for="login_p">password</label>
                    <input type="password" id="login_p" name="password">
                </div>
            </div>
        </Form>

        <Form
            buttonText="Sign up"
            url="/api/neodug/user"
            method="POST"
            onSuccess={() => {
                store.userLoadingState = "unverified"
            }}
        >
            <h3 class="head">Sign up</h3>
            <div class="body">
                <div class="field">
                    <label for="su_e">email</label>
                    <input type="email" id="su_e" name="email">
                </div>
                <div class="field">
                    <label for="su_u">username</label>
                    <input type="text" id="su_u" name="username">
                </div>
                <div class="field">
                    <label for="su_p">password</label>
                    <input type="password" id="su_p" name="password">
                </div>
                <div class="field">
                    <label for="su_p2">repeat password</label>
                    <input type="password" id="su_p2" name="password2">
                </div>
            </div>
        </Form>
    </div>
</div>

<style>
    .col-2 {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1rem;
    }
</style>