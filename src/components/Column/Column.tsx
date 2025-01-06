import React, {useRef, useState} from 'react';
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
import CancelIcon from "../../assets/icons/cross.svg";
import SaveIcon from "../../assets/icons/check.svg";

type ColumnProps = {
    id: 'todo' | 'in_progress' | 'review' | 'done';
    title: string;
    tasks: Task[];
    onUpdateTask: (updatedTask: Task) => void;
    onClearTasks?: () => void;
    moveTask: (taskId: number, targetColumnId: 'todo' | 'in_progress' | 'review' | 'done') => void;
    onAddTask?: (task: Task) => void;
};

const Column: React.FC<ColumnProps> = ({ id, title, tasks, onUpdateTask, onClearTasks, moveTask, onAddTask }) => {
    const [isAdding, setIsAdding] = useState(false);
    const [newTaskText, setNewTaskText] = useState('');
    const [newTaskStartDay, setNewTaskStartDay] = useState('');
    const [newTaskEndDay, setNewTaskEndDay] = useState('');
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

    const handleAddTask = () => {
        const newTask: Task = {
            id: Date.now(),
            text: newTaskText,
            startDay: new Date(newTaskStartDay).getTime(),
            endDay: new Date(newTaskEndDay).getTime(),
            type: 'todo',
        };
        if (onAddTask) {
        onAddTask(newTask);
        setIsAdding(false);
        setNewTaskText('');
        setNewTaskStartDay('');
        setNewTaskEndDay('');
    }}

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
                    {id === 'todo' && (
                        <span className={styles.addTask} onClick={() => setIsAdding(!isAdding)}>
                            + Добавить
                        </span>
                    )}
                    {id === 'done' && onClearTasks && (
                        <button onClick={onClearTasks} className={styles.clearButton} title="Удалить все задачи">
                            <TrashIcon />
                        </button>
                    )}
                </h2>
            </div>
            {isAdding && (
                <div className={styles.newTaskForm}>
                    <div className={styles.field}>
                        <label>Начало:</label>
                        <input
                            type="date"
                            value={newTaskStartDay}
                            onChange={(e) => setNewTaskStartDay(e.target.value)}
                            className={styles.input}
                        />
                    </div>
                    <div className={styles.field}>
                        <label>Окончание:</label>
                        <input
                            type="date"
                            value={newTaskEndDay}
                            onChange={(e) => setNewTaskEndDay(e.target.value)}
                            className={styles.input}
                        />
                    </div>
                    <div className={styles.field}>
                        <label>Описание:</label>
                        <input
                            type="text"
                            value={newTaskText}
                            onChange={(e) => setNewTaskText(e.target.value)}
                            className={styles.input}
                        />
                    </div>

                    <div className={styles.actions}>
                        <button onClick={() => {
                            setIsAdding(false);
                            setNewTaskText('');
                            setNewTaskStartDay('');
                            setNewTaskEndDay('');
                        }} className={styles.cancelButton}>
                            <div className={styles.circle}>
                                <img src={CancelIcon} alt="Cancel" />
                           </div>
                        </button>
                        <button onClick={handleAddTask} className={styles.saveButton}>
                            <div className={styles.circle}>
                                <img src={SaveIcon} alt="Save" />
                            </div>
                        </button>
                    </div>
                </div>
            )}
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