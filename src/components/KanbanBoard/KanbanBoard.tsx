import React, {useEffect, useState} from 'react';
import {loadTasks, saveTasks, Task} from '../../utils/taskLoader';
import Column from '../Column/Column';
import styles from './KanbanBoard.module.css';

type ColumnType = 'todo' | 'in_progress' | 'review' | 'done';

const KanbanBoard: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');

    useEffect(() => {
        const loadedTasks = loadTasks().map((task) => ({
            ...task,
            type: task.type as ColumnType,
        }));
        setTasks(loadedTasks);
    }, []);


    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearchQuery(searchQuery);
        }, 500);

        return () => clearTimeout(timer);
    }, [searchQuery]);

    const handleTaskUpdate = (updatedTask: Task) => {
        const updatedTasks = tasks.map((task) =>
            task.id === updatedTask.id ? updatedTask : task
        );
        setTasks(updatedTasks);
        saveTasks(updatedTasks);
    };

    const moveTask = (taskId: number, targetColumnId: ColumnType, isDeletion: boolean = false) => {
        if (isDeletion) {
            const updatedTasks = tasks.filter(task => task.id !== taskId);
            setTasks(updatedTasks);
            saveTasks(updatedTasks);
        } else {
            const updatedTasks = tasks.map((task) =>
                task.id === taskId ? {...task, type: targetColumnId} : task
            );
            setTasks(updatedTasks);
            saveTasks(updatedTasks);
        }
    };

    const handleAddTask = (task: Task) => {
        const updatedTasks = [...tasks, task];
        setTasks(updatedTasks);
        saveTasks(updatedTasks);
    };

    const handleClearDoneTasks = () => {
        const remainingTasks = tasks.filter((task) => task.type !== 'done');
        setTasks(remainingTasks);
        saveTasks(remainingTasks);
    };

    const filteredTasks = tasks.filter((task) => {
        const descriptionMatch = task.text.toLowerCase().includes(debouncedSearchQuery.toLowerCase());

        const dateMatch = (date: number) => {
            if (!date) return false;
            const normalizedDate = new Date(date).toLocaleDateString('ru-RU');
            return normalizedDate === debouncedSearchQuery;
        };

        return descriptionMatch || dateMatch(task.startDay) || dateMatch(task.endDay);
    });

    //   const handleMove = (taskId: number, targetColumnId: ColumnType) => {
    //    const taskExists = tasks.some(task => task.id === taskId);

    //   console.log("task exists", taskExists);

    //    if (!taskExists) {
    //      console.log(" deleted, skipping");
    //      return; //
    //  }

    //  moveTask(taskId, targetColumnId);
    //  };

    const handleTaskDelete = (taskId: number) => {
        const updatedTasks = tasks.filter((task) => task.id !== taskId);
        setTasks(updatedTasks);
        moveTask(taskId, 'done', true);

        saveTasks(updatedTasks);
    };

    const columns = [
        {id: 'todo', title: 'To Do'},
        {id: 'in_progress', title: 'In Progress'},
        {id: 'review', title: 'Review'},
        {id: 'done', title: 'Done'},
    ] as { id: ColumnType; title: string }[];

    return (
        <div className={styles.kanbanContent}>
            <div className={styles.searchWrapper}>
                <h1>Your Tasks</h1>
                <input
                    type="text"
                    placeholder="поиск..."
                    className={styles.searchInput}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            <div className={styles.taskboard}>
                {columns.map((column) => {
                    const sortedTasks = filteredTasks
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
                            onDeleteTask={handleTaskDelete}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default KanbanBoard;