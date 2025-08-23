<script lang="ts">
  import type { Task } from '$lib/stores/tasks.ts';

  export let task: Task;
  export let onToggle: (id: number) => void;
  export let onDelete: (id: number) => void;
</script>

<div>
  <input type="checkbox" checked={task.done} on:change={() => onToggle(task.id)} />
  <span style:text-decoration={task.done ? 'line-through' : 'none'}>
    {task.title}
  </span>
  <button on:click={() => onDelete(task.id)}>🗑</button>
</div>
