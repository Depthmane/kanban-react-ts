import React, { useRef } from 'react';
import TaskCard from "../TaskCard/TaskCard";
import styles from './Column.module.css';
import { Task } from "../../utils/taskLoader";

import { ReactComponent as TodoIcon } from '../../assets/icons/todo.svg';
import { ReactComponent as InProgressIcon } from '../../assets/icons/inProgress.svg';
import { ReactComponent as ReviewIcon } from '../../assets/icons/review.svg';
import { ReactComponent as DoneIcon } from '../../assets/icons/done.svg';
import { ReactComponent as TrashIcon } from '../../assets/icons/trash.svg';
import { ItemTypes } from '../../utils/ItemTypes';
import { useDrop } from 'react-dnd';

type ColumnProps = {
    id: 'todo' | 'in_progress' | 'review' | 'done';
    title: string;
    tasks: Task[];
    onUpdateTask: (updatedTask: Task) => void;
    onClearTasks?: () => void;
    moveTask: (taskId: number, targetColumnId: 'todo' | 'in_progress' | 'review' | 'done') => void;
};

const Column: React.FC<ColumnProps> = ({ id, title, tasks, onUpdateTask, onClearTasks, moveTask }) => {
    const dropRef = useRef(null);

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

    const handleMoveTask = (taskId: number, targetColumnId: 'todo' | 'in_progress' | 'review' | 'done') => {
        moveTask(taskId, targetColumnId);
    };

    const [{ isOver }, drop] = useDrop({
        accept: ItemTypes.TASK,
        drop: (item: { id: string }) => {
            moveTask(Number(item.id), id);
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    });

    drop(dropRef);

    return (
        <div ref={dropRef} className={styles.column}>
            <div className={styles.header}>
                <h2 className={styles.title}>
                    {getIcon()}
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
                        moveTask={handleMoveTask}
                    />
                ))}
            </div>
        </div>
    );
};

export default Column;