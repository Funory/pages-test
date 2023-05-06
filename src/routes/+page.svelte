<script lang="ts">
    import { enhance } from '$app/forms';

    export let data;
</script>

<h1>{data.status}</h1>
<ul>
    {#each data.comments as comment}
        <li>
            <b>{comment.name}</b>
            <p>{comment.content}</p>
        </li>
    {/each}
</ul>
<pre><code>{data.env}</code></pre>

<form method="POST" action="/" use:enhance>
    <input type="text" name="name" placeholder="Max Mustermann" /> <br />
    <textarea name="content" cols="30" rows="10" /> <br />
    <button type="submit">Send comment</button>
</form>
