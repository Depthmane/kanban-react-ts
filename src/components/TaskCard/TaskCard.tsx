import React from 'react';
import styles from './TaskCard.module.css'
import {Task} from "../../utils/taskLoader";

type TaskCardProps ={
    task: Task;
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
    const isOverdue = task.endDay < Date.now() && task.type !== 'done';


    return (
        <div className={`${styles.card} ${isOverdue ? styles.overdue : ''}`}>
            <p className={styles.text}> Описание: {task.text}</p>
            <p className={styles.text}> Начало: {new Date(task.startDay).toLocaleDateString()}</p>
            <p className={styles.text}> Конец: {new Date(task.endDay).toLocaleDateString()}</p>
        </div>
    );
};

export default TaskCard;