import tasks from '../assets/tasks.json';

export const loadTasks = (): Task[] => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
        const tasks: Task[] = JSON.parse(savedTasks);
        //console.log('Loaded tasks from localStorage:', tasks);
        return tasks.sort((a, b) => a.startDay - b.startDay);
    }
    return tasks.sort((a, b) => a.startDay - b.startDay) as Task[];
};

export const saveTasks = (tasks: Task[]) => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
};

export type Task = {
    id: number;
    type: 'todo' | 'in_progress' | 'review' | 'done';
    startDay: number;
    endDay: number;
    text: string;
}