import { writable } from 'svelte/store';

export interface Task {
  id: number;
  title: string;
  done: boolean;
}

// initial tasks
const initialTasks: Task[] = [
  { id: 1, title: 'Learn Svelte', done: false }
];

export const tasks = writable<Task[]>(initialTasks);

// store functions
export function addTask(title: string) {
  tasks.update(t => [...t, { id: Date.now(), title, done: false }]);
}

export function toggleTask(id: number) {
  tasks.update(t =>
    t.map(task => (task.id === id ? { ...task, done: !task.done } : task))
  );
}

export function removeTask(id: number) {
  tasks.update(t => t.filter(task => task.id !== id));
}
