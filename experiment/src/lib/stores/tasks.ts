import { writable } from 'svelte/store';

export interface Task {
  id: number;
  title: string;
  done: boolean;
}

const initialTasks: Task[] = [
  { id: 1, title: 'Learn Svelte', done: false }
];

export const tasks = writable<Task[]>(initialTasks);
