<script lang="ts">
  import { tasks } from '$lib/stores/tasks';
  import TaskForm from '$lib/components/TaskForm.svelte';
  import TaskItem from '$lib/components/TaskItem.svelte';
  import type { Task } from '$lib/stores/tasks';

  function addTask(event: CustomEvent<{ title: string }>) {
    const title = event.detail.title;
    tasks.update((t: Task[]) => [...t, { id: Date.now(), title, done: false }]);
  }

  function toggleTask(id: number) {
    tasks.update((t: Task[]) =>
      t.map(task => task.id === id ? { ...task, done: !task.done } : task)
    );
  }

  function deleteTask(id: number) {
    tasks.update((t: Task[]) => t.filter(task => task.id !== id));
  }
</script>

<h1>Task Tracker</h1>

<TaskForm on:addtask={addTask} />

{#each $tasks as task (task.id)}
  <TaskItem {task} onToggle={toggleTask} onDelete={deleteTask} />
{/each}
