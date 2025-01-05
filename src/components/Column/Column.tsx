import React from 'react';
import TaskCard from "../TaskCard/TaskCard";
import styles from './Column.module.css';
import { Task } from "../../utils/taskLoader";

import { ReactComponent as TodoIcon } from '../../assets/icons/todo.svg';
import { ReactComponent as InProgressIcon } from '../../assets/icons/inProgress.svg';
import { ReactComponent as ReviewIcon } from '../../assets/icons/review.svg';
import { ReactComponent as DoneIcon } from '../../assets/icons/done.svg';
import { ReactComponent as TrashIcon } from '../../assets/icons/trash.svg';

type ColumnProps = {
    id: string;
    title: string;
    tasks: Task[];
    onUpdateTask: (updatedTask: Task) => void;
    onClearTasks?: () => void;
};

const Column: React.FC<ColumnProps> = ({ id, title, tasks, onUpdateTask, onClearTasks }) => {
    const getIcon = () => {
        switch (id) {
            case 'todo':
                return <TodoIcon className={styles.icon} />;
            case 'in_progress':
                return <InProgressIcon className={styles.icon} />;
            case 'review':
                return <ReviewIcon className={styles.icon} />;
            case 'done':
                return <DoneIcon className={styles.icon} />;
            default:
                return null;
        }
    };

    return (
        <div className={styles.column}>
            <div className={styles.header}>
                <h2 className={styles.title}>
                    {getIcon()} {}
                    {title}
                    {id === 'done' && onClearTasks && (
                        <button
                            onClick={onClearTasks}
                            className={styles.clearButton}
                            title="Удалить все задачи"
                        >
                            <TrashIcon />
                        </button>
                    )}
                </h2>
            </div>
            <div className={styles.tasks}>
                {tasks.map((task) => (
                    <TaskCard
                        key={task.id}
                        task={task}
                        onUpdateTask={onUpdateTask}
                    />
                ))}
            </div>
        </div>
    );
};

export default Column;
