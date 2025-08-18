import {writeable} from 'svelte/store';

export const tasks = writeable = {[
    { id: 1, title: 'Learn Svelte', done: false}
]};
