<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher<{ addtask: { title: string } }>();

  let title: string = '';

  function addTask() {
    if (title.trim()) {
      dispatch('addtask', { title });
      title = '';
    }
  }
</script>

<form on:submit|preventDefault={addTask}>
  <input bind:value={title} placeholder="New task..." />
  <button type="submit">Add</button>
</form>
