import React, { useEffect, useState } from 'react';
import { loadTasks, saveTasks, Task } from '../../utils/taskLoader';
import Column from '../Column/Column';
import styles from './KanbanBoard.module.css';

const KanbanBoard: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        const loadedTasks = loadTasks();
        setTasks(loadedTasks);
    }, []);

    const columns = [
        { id: 'todo', title: 'To Do' },
        { id: 'in_progress', title: 'In Progress' },
        { id: 'review', title: 'Review' },
        { id: 'done', title: 'Done' },
    ];

    const handleTaskUpdate = (updatedTask: Task) => {
        const updatedTasks = tasks.map((task) =>
            task.id === updatedTask.id ? updatedTask : task
        );
        setTasks(updatedTasks);
        saveTasks(updatedTasks);
    };

    return (
        <div className={styles.taskboard}>
            {columns.map((column) => (
                <Column
                    key={column.id}
                    id={column.id}
                    title={column.title}
                    tasks={tasks.filter((task) => task.type === column.id)}
                    onUpdateTask={handleTaskUpdate}  // передаем onUpdateTask
                />
            ))}
        </div>
    );
};

export default KanbanBoard;
