import React, { useState, useRef } from 'react';
import { Task } from '../../utils/taskLoader';
import { useDrag } from 'react-dnd';
import { ItemTypes } from '../../utils/ItemTypes';
import SaveIcon from '../../assets/icons/check.svg';
import CancelIcon from '../../assets/icons/cross.svg';
import styles from './TaskCard.module.css';

type TaskCardProps = {
    task: Task;
    onUpdateTask: (updatedTask: Task) => void;
    moveTask: (taskId: number, targetColumnId: 'todo' | 'in_progress' | 'review' | 'done') => void;
};

const TaskCard: React.FC<TaskCardProps> = ({ task, onUpdateTask, moveTask }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedText, setEditedText] = useState(task.text);
    const [editedStartDay, setEditedStartDay] = useState(task.startDay ? new Date(task.startDay).toLocaleDateString('en-CA') : '');
    const [editedEndDay, setEditedEndDay] = useState(task.endDay ? new Date(task.endDay).toLocaleDateString('en-CA') : '');

    const [{ isDragging }, drag] = useDrag({
        type: ItemTypes.TASK,
        item: { id: task.id },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const dragRef = useRef(null);

    drag(dragRef);

    const handleSave = () => {
        if (editedStartDay && editedEndDay && editedText) {
            const updatedTask = {
                ...task,
                text: editedText,
                startDay: Date.parse(editedStartDay),
                endDay: Date.parse(editedEndDay),
            };
            onUpdateTask(updatedTask);
            setIsEditing(false);
        }
    };

    const handleCancel = () => {
        setEditedText(task.text);
        setEditedStartDay(task.startDay ? new Date(task.startDay).toLocaleDateString('en-CA') : '');
        setEditedEndDay(task.endDay ? new Date(task.endDay).toLocaleDateString('en-CA') : '');
        setIsEditing(false);
    };

    const isOverdue = task.endDay && task.endDay < Date.now();

    return (
        <div
            ref={dragRef}
            className={`${styles.card} ${isOverdue ? styles.overdueCard : ''} ${isDragging ? styles.draggingCard : ''}`}
        >
            <div className={styles.body}>
                <div className={styles.field}>
                    <label>Начало:  </label>
                    {isEditing ? (
                        <input
                            type="date"
                            value={editedStartDay || ''}
                            onChange={(e) => setEditedStartDay(e.target.value)}
                            className={styles.input}
                        />
                    ) : (
                        <span>{new Date(task.startDay).toLocaleDateString()}</span>
                    )}
                </div>

                <div className={styles.field}>
                    <label>Окончание:   </label>
                    {isEditing ? (
                        <input
                            type="date"
                            value={editedEndDay || ''}
                            onChange={(e) => setEditedEndDay(e.target.value)}
                            className={styles.input}
                        />
                    ) : (
                        <span className={isOverdue ? styles.overdue : ''}>
                            {new Date(task.endDay).toLocaleDateString()}
                        </span>
                    )}
                </div>
                <div className={styles.field}>
                    <label>Описание:    </label>
                    {isEditing ? (
                        <input
                            type="text"
                            value={editedText}
                            onChange={(e) => setEditedText(e.target.value)}
                            className={styles.input}
                        />
                    ) : (
                        <span>{task.text}</span>
                    )}
                </div>
            </div>

            {task.type === 'todo' && (
                <div className={styles.actions}>
                    {isEditing ? (
                        <>
                            <button onClick={handleCancel} className={styles.cancelButton}>
                                <div className={styles.circle}>
                                    <img src={CancelIcon} alt="Cancel" />
                                </div>
                            </button>
                            <button onClick={handleSave} className={styles.saveButton}>
                                <div className={styles.circle}>
                                    <img src={SaveIcon} alt="Save" />
                                </div>
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={() => setIsEditing(true)}
                            className={styles.editButton}
                        >
                            <div className={styles.circle}>
                                <svg width="24"
                                     height="24"
                                     viewBox="0 0 24 24"
                                     fill="none"
                                     className={styles.editIcon}
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path d="M18.5793 2.94495C18.2042 2.57001 17.6956 2.35938
                                    17.1653 2.35938C16.6349 2.35938 16.1263 2.57001 15.7512
                                    2.94495L14.1063 4.59095L19.4093 9.89395L21.0543 8.24995C21.2401
                                    8.06422 21.3874 7.84371 21.488 7.601C21.5886 7.3583 21.6403
                                    7.09816 21.6403 6.83545C21.6403 6.57274 21.5886 6.3126 21.488
                                    6.06989C21.3874 5.82719 21.2401 5.60668 21.0543 5.42095L18.5793
                                    2.94495ZM17.9953 11.3079L12.6922 6.00495L3.85725 14.8399L2.78125
                                    21.2199L9.16125 20.1429L17.9953 11.3079Z" fill="white" />
                                </svg>
                            </div>
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

export default TaskCard;
