<script>
    import Code from "../../../components/Code.svelte";
    import FileTreeDiagram from "../../../components/FileTreeDiagram.svelte";
</script>
<div class="res">
    <h2>neodug-snippet</h2>
    <p>a beginner's tool for building web pages out of reusable components without the need for a javascript framework</p>

    <div class="steps">
        <div class="step">
            <h3>step 1</h3>
            <p class="subtitle">paste the script element inside your &lt;head&gt;</p>
            <div class="panel">
                <p>The URL must contain "www"</p>
            </div>
            <Code copyBtn={true} path="/code/snippet-script.html" />
        </div>

        <div class="step">
            <h3>step 2</h3>
            <p class="subtitle">create folders with "snippet.html" files</p>
            <div class="panel">
                <p>Here is an example of a folder called "header". You can call the folder whatever you want, but must contain at the very least, a file called "snippet.html".</p>
            </div>
            <FileTreeDiagram tree={[
                { 
                    name: 'header',
                    children: [
                        { name: 'snippet.html' },
                        { name: 'before.js', note: '<-- optional script that runs before the component loads' },
                        { name: 'after.js', note: '<-- optional script that runs after' },
                    ]
                }
            ]}/>
        </div>

        <div class="step">
            <h3>step 3</h3>
            <p class="subtitle">write some HTML in "snippet.html"</p>
        </div>

        <div class="step">
            <h3>step 4</h3>
            <p class="subtitle">use the custom HTML element</p>
            <div class="panel">
                <p>NOTE: This must be an absolute file path! That means it must start with a "/" representing the root folder of your website. It will NOT work with relative file-paths starting with ".".</p>
            </div>
            <Code copyBtn={true} path="/code/snippet-example.html" />
        </div>
    </div>

</div>

<style>
    .steps {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        margin-top: 1rem;
    }

    .subtitle {
        font-style: italic;
        margin-bottom: 1.5rem;
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
</style>