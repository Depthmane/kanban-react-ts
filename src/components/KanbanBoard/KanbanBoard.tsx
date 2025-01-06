import React, { useEffect, useState } from 'react';
import { loadTasks, saveTasks, Task } from '../../utils/taskLoader';
import Column from '../Column/Column';
import styles from './KanbanBoard.module.css';

type ColumnType = 'todo' | 'in_progress' | 'review' | 'done';

const KanbanBoard: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        const loadedTasks = loadTasks().map((task) => ({
            ...task,
            type: task.type as ColumnType,
        }));
        setTasks(loadedTasks);
    }, []);

    const handleTaskUpdate = (updatedTask: Task) => {
        const updatedTasks = tasks.map((task) =>
            task.id === updatedTask.id ? updatedTask : task
        );
        setTasks(updatedTasks);
        saveTasks(updatedTasks);
    };

    const moveTask = (taskId: number, targetColumnId: ColumnType) => {
        const updatedTasks = tasks.map((task) =>
            task.id === taskId ? { ...task, type: targetColumnId } : task
        );
        setTasks(updatedTasks);
        saveTasks(updatedTasks);
    };

    const handleClearDoneTasks = () => {
        const remainingTasks = tasks.filter((task) => task.type !== 'done');
        setTasks(remainingTasks);
        saveTasks(remainingTasks);
    };

    const handleAddTask = (task: Task) => {
        const updatedTasks = [...tasks, task];
        setTasks(updatedTasks);
        saveTasks(updatedTasks);
    };

    const columns = [
        { id: 'todo', title: 'To Do' },
        { id: 'in_progress', title: 'In Progress' },
        { id: 'review', title: 'Review' },
        { id: 'done', title: 'Done' },
    ] as { id: ColumnType; title: string }[];

    return (
        <div className={styles.taskboard}>
            {columns.map((column) => {
                const sortedTasks = tasks
                    .filter((task) => task.type === column.id)
                    .sort((a, b) => (Number(a.startDay) || 0) - (Number(b.startDay) || 0));

                return (
                    <Column
                        key={column.id}
                        id={column.id}
                        title={column.title}
                        tasks={sortedTasks}
                        onUpdateTask={handleTaskUpdate}
                        moveTask={moveTask}
                        onClearTasks={column.id === 'done' ? handleClearDoneTasks : undefined}
                        onAddTask={column.id === 'todo' ? handleAddTask : undefined}
                    />
                );
            })}
        </div>
    );
};

export default KanbanBoard;
