<script>
    import {tasks} from '$lib/stores/tasks.js'
    import TaskForm from '$lib/components/TaskForm.svelte'
    import TaskItem from '$lib/components/TaskItem.svelte';
</script>

function addTask(event) {
    const title = event.detail.title;

}
<h1>Task Tracker</h1>