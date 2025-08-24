<script lang="ts">
  import { tasks, addTask, toggleTask, removeTask } from '$lib/stores/tasks';
  import type { Task } from '$lib/stores/tasks';

  let newTask: string = '';
</script>

<main class="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg font-sans">
  <h1 class="text-center text-2xl font-bold mb-6 text-gray-800">✅ Task Tracker</h1>

  <!-- Add Task Form -->
  <form class="flex gap-2 mb-6" on:submit|preventDefault={() => {
    if (newTask.trim()) addTask(newTask);
    newTask = '';
  }}>
    <input
      type="text"
      bind:value={newTask}
      placeholder="Enter a new task..."
      class="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
    />
    <button
      type="submit"
      class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
    >
      Add
    </button>
  </form>

  <!-- Task List -->
  <ul class="space-y-2">
    {#each $tasks as task (task.id)}
      <li class="flex items-center justify-between p-2 border border-gray-200 rounded-md hover:bg-gray-50">
        <div class="flex items-center gap-2">
          <input
            type="checkbox"
            checked={task.done}
            on:change={() => toggleTask(task.id)}
            class="w-4 h-4"
          />
          <span class={task.done ? 'line-through text-gray-400' : ''}>{task.title}</span>
        </div>
        <button
          class="text-red-500 hover:text-red-700 text-lg font-bold"
          on:click={() => removeTask(task.id)}
        >
          ✕
        </button>
      </li>
    {/each}
  </ul>
</main>
