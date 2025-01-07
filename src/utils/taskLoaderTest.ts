import {loadTasks, saveTasks, Task} from './taskLoader';

beforeAll(() => {
    const localStorageMock = (() => {
        let store: Record<string, string> = {};
        return {
            getItem: (key: string) => store[key] || null,
            setItem: (key: string, value: string) => {
                store[key] = value;
            },
            clear: () => {
                store = {};
            },
        };
    })();
    Object.defineProperty(global, 'localStorage', {
        value: localStorageMock,
    });
});

test('tasks should be loaded and sorted by startDay', () => {
    const taskData: Task[] = [
        {id: 1, type: 'todo', startDay: 10, endDay: 20, text: 'Test Task 1'},
        {id: 2, type: 'in_progress', startDay: 5, endDay: 15, text: 'Test Task 2'},
    ];

    saveTasks(taskData);

    const tasks = loadTasks();

    expect(tasks[0].startDay).toBeLessThanOrEqual(tasks[1].startDay);
});
