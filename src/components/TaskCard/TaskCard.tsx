import React, { useState } from 'react';
import { Task } from '../../utils/taskLoader';
import EditIcon from '../../assets/icons/edit.svg';
import SaveIcon from '../../assets/icons/check.svg';
import CancelIcon from '../../assets/icons/cross.svg';
import styles from './TaskCard.module.css';

type TaskCardProps = {
    task: Task;
    onUpdateTask: (task: Task) => void;
};

const TaskCard: React.FC<TaskCardProps> = ({ task, onUpdateTask }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedText, setEditedText] = useState(task.text);
    const [editedStartDay, setEditedStartDay] = useState(task.startDay ? new Date(task.startDay).toLocaleDateString('en-CA') : '');
    const [editedEndDay, setEditedEndDay] = useState(task.endDay ? new Date(task.endDay).toLocaleDateString('en-CA') : '');

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

    return (
        <div className={styles.card}>
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
                        <span>{new Date(task.endDay).toLocaleDateString()}</span>
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
                            <button onClick={handleSave} className={styles.saveButton}>
                                <img src={SaveIcon} alt="Save" />
                            </button>
                            <button onClick={handleCancel} className={styles.cancelButton}>
                                <img src={CancelIcon} alt="Cancel" />
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={() => setIsEditing(true)}
                            className={styles.editButton}
                        >
                            <img src={EditIcon} alt="Edit" />
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

export default TaskCard;