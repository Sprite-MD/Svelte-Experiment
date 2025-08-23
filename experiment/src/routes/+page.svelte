<script lang="ts">
  import { tasks, addTask, toggleTask, removeTask } from '$lib/stores/tasks';
  import type { Task } from '$lib/stores/tasks';

  let newTask: string = '';
</script>

<main style="max-width: 500px; margin: 2rem auto; font-family: sans-serif;">
  <h1 style="text-align:center;">✅ Task Tracker</h1>

  <!-- Add Task Form -->
  <form on:submit|preventDefault={() => { 
      if (newTask.trim()) addTask(newTask); 
      newTask = '';
    }}
    style="display:flex; gap:0.5rem; margin-bottom:1rem;"
  >
    <input 
      type="text"
      bind:value={newTask} 
      placeholder="Enter a new task..." 
      style="flex:1; padding:0.5rem; border:1px solid #ccc; border-radius:4px;"
    />
    <button 
      type="submit" 
      style="padding:0.5rem 1rem; border:none; border-radius:4px; background:#4cafef; color:white;"
    >
      Add
    </button>
  </form>

  <!-- Task List -->
  <ul style="list-style:none; padding:0;">
    {#each $tasks as task (task.id)}
      <li style="display:flex; align-items:center; justify-content:space-between; padding:0.5rem; border-bottom:1px solid #eee;">
        <div style="display:flex; align-items:center; gap:0.5rem;">
          <input type="checkbox" checked={task.done} on:change={() => toggleTask(task.id)} />
          <span style="text-decoration: {task.done ? 'line-through' : 'none'};">
            {task.title}
          </span>
        </div>
        <button on:click={() => removeTask(task.id)} style="background:none; border:none; color:red; cursor:pointer;">✕</button>
      </li>
    {/each}
  </ul>
</main>
