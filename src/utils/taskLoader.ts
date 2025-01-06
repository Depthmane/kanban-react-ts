import tasks from '../assets/tasks.json';

export const loadTasks = (): Task[] => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
        return JSON.parse(savedTasks);
    }
    return tasks as Task[];
};

export const saveTasks = (tasks: Task[]): void => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

export type Task = {
    id: number;
    type: 'todo' | 'in_progress' | 'review' | 'done';
    startDay: number;
    endDay: number;
    text: string;
}