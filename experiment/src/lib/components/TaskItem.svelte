<script>
    export let task;
    export let onToggle;
    export let onDelete;
</script>

<div>
    <input type="checkbox" checked={task.done} on:change={() => onToggle(task.id)} />
    <span style:text-decoration={task.done ? 'line-through' : 'none'}>{task.title}</span>
    <button on:click={() => onDelete(task.id)}>"delete"</button>
</div>
