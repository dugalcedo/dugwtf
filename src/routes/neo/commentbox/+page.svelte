<script lang="ts">
    import Code from "../../../lib/components/Code.svelte";
    import LogInForm from "./LogInForm.svelte";
    import RegisterCommentBoxForm from "./RegisterCommentBoxForm.svelte";
    import RegisterForm from "./RegisterForm.svelte";
    import Unverified from "./Unverified.svelte";

    const { data }: { data: NeodugData_FE } = $props()

    let user = $state(data.user)

    const logOut = () => {
        document.cookie = "neodugtoken=;path=/;"
        window.location.reload()
    }

</script>

<div class="res">
    <h2>neodug-commentbox</h2>
    <p><i>A super-easy to set-up-and-style comment box/guestbook for your website</i></p>

    <div class="steps">

        <!-- STEP 1 -->
        <div class="step">
            <h3>Step 1</h3>
            <p class="subtitle">Register/log in to your neodug account</p>

            {#if user}
                <div class="panel">
                    <p>You're already logged in as {user.username}! So you're done with this step.</p>
                    <button style="margin-top: 1rem;" onclick={logOut}>Log out</button>
                </div>
            {:else}
                <div class="auth">
                    <RegisterForm />
                    <LogInForm />
                </div>
            {/if}
        </div>

        <!-- STEP 2 -->
        <div class="step">
            <h3>Step 2</h3>
            <p class="subtitle">Verify your email address</p>
            {#if !user}
                <div class="panel">
                    <p>You haven't completed step 1 yet.</p>
                </div>
            {:else if !user.verified}
                <Unverified {user} ev={data.emailVerification} />
                <div class="panel">
                    <p>Already verified? Try refreshing the page.</p>
                </div>
            {:else}
                <div class="panel">
                    <p>You're done with this step.</p>
                </div>
            {/if}
        </div>

        <!-- STEP 3 -->
        <div class="step">
            <h3>Step 3</h3>
            <p class="subtitle">Register your comment box</p>
            {#if !user || !user.verified}
                <div class="panel">
                    <p>Complete previous steps first.</p>
                </div>
            {:else if !user.commentboxes || !user.commentboxes.length}
                <div class="panel">
                    <RegisterCommentBoxForm {user} />
                </div>
            {:else}
                <div class="panel">
                    <p>You're done with this step. Your commentbox's name is <big>{user.commentboxes[0]?.name}</big></p>
                </div>
            {/if}
        </div>

        <!-- STEP 4 -->
        <div class="step">
            <h3>Step 4</h3>
            <p>Put the commentbox on your page</p>

            <div class="panel">
                <p>Below is some code to get you started, but your comment box code doesn't even have to look exactly like this.</p>
            </div>

            <Code path="/code/commentbox-example1.html" />

            <div class="panel">
                <p class="m">The code can be heavily altered and it will still work. The requirements are...</p>
                <ul style="list-style-type: square; padding-left: 2rem;">
                    <li>The script element must come first</li>
                    <li>Everything else must be inside of a &lt;neodug-commentbox&gt; element</li>
                    <li>The &lt;neodug-commentbox&gt; element must have a name="" attribute which contains the name you picked when you registered your commentbox</li>
                    <li>A &lt;cb-comments&gt; element for the comments to be loaded into</li>
                    <li>&lbrace;&lbrace;author&rbrace;&rbrace;, &lbrace;&lbrace;body&rbrace;&rbrace;, and &lbrace;&lbrace;date&rbrace;&rbrace; inside of &lt;cb-comments&gt;</li>
                    <li>A form element with a data-cb-form attribute, containing inputs with the names "author" and "body"</li>
                </ul>
                <p class="m">Optionally, you can also...</p>
                <ul style="list-style-type: square; padding-left: 2rem;">
                    <li>Add pagination buttons and display the current page number and total pages (see example)</li>
                    <li>Display error messages if an error occurs when, a) fetching the comments, and/or b) when submitting the add-comment form</li>
                    <li>Add a perpage="" attribute to the &lt;neodug-commentbox&gt; element to change how many comments are shown on each page (e.g. perpage="25"). The default is 10.</li>
                </ul>
            </div>
        </div>

        <!-- STEP 5 -->
        <div class="step step5">
            <h3>Step 5</h3>
            <p class="subtitle">Customize to your heart's content</p>
            <p>Style it however you'd like with CSS. Alter the structure with HTML. Note that during various loading and error states, the class list on the &lt;neodug-commentbox&gt; element will change. Take advantage of these to show/hide various parts of your comment box while the comments are loading, for example.</p>
            <br><br>
            <table>
                <thead>
                    <tr>
                        <th>class</th>
                        <th>when it's active</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>ndcb_fetching</td>
                        <td>While the comment are being fetched for the first time</td>
                    </tr>
                    <tr>
                        <td>ndcb_addingComment</td>
                        <td>While the add-comment form is being submitted</td>
                    </tr>
                    <tr>
                        <td>ndcb_fetchError</td>
                        <td>When there was an error when trying to fetch the comments</td>
                    </tr>
                    <tr>
                        <td>ndcb_addCommentError</td>
                        <td>When there was an error when trying to submit the add-comment form</td>
                    </tr>
                </tbody>
            </table>
        </div>

    </div> <!-- end steps-->

    <div class="coming-soon" style="margin-top: 1rem;">
        <h3>Things I wanna say</h3>
        <h4 class="m">Bugs/troubleshooting</h4>
        <p class="m">
            I threw this together in about two days, so there are bound to be some bugs I haven't noticed. If you want to report them, message me on discord @dugnoise or email me: dougalcedo@gmail.com
        </p>
        <p class="m">
            I plan on uploading a video tutorial to YouTube soon.
        </p>
        <p class="m">
            I plan on making it so that you'll be able to manage your comments. i.e. delete ones you don't like, make it so they must be approved first, etc...
        </p>
        <p class="m">
            I think I can implement IP bans and spam protection too. Just be patient with me.
        </p>
        <p class="m">
            For those who don't want to style it themselves, there will be templates available in the future to choose from. If you want your template to be featured on my website, just send me a message.
        </p>
        <p class="m">
            If a lot of people end up using this, I may need to start paying for database hosting. If you want to help me with that, and support me in my webdev journey, <a href="https://ko-fi.com/dugalcedo" target="_blank">you can donate to me</a>.
        </p>
    </div>

</div>

<style>
    .steps {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        margin-top: 1rem;
    }

    .step {
        background-color: rgba(255, 255, 255, 0.05);
        padding: .5rem;

        & .panel {
            background-color: rgba(255, 255, 255, 0.05);
            margin: .5rem;
            padding: .5rem;
        }
    }

    .subtitle {
        font-style: italic;
        margin-bottom: 1.5rem;
    }

    .auth {
        display: grid;
        gap: 1rem;

        @media (min-width: 650px) {
            grid-template-columns: 1fr 1fr;
        }
    }

    big {
        background-color: black;
        font-size: 3rem;
        color: lime;
    }
</style>