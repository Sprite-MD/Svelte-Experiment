<script>
    import {createEventDispatcher} from 'svelte';
    let title = '';
    const dispatch = createEventDispatcher();

    function addTask() {
        if (title.trim()) {
            dispatch('addtask', {title});
            title = '';
        }
    }
</script>

<form on:submit|preventDefault={addTask}>
    <input bind:value={title} placeholder="New Task..." />
    <button type="submit">Add</button>
</form>