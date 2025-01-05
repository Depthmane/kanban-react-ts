import React from 'react';
import TaskCard from "../TaskCard/TaskCard";
import styles from './Column.module.css'
import {Task} from "../../utils/taskLoader";

type ColumnProps = {
    id: string;
    title: string;
    tasks: Task[];
};

const Column: React.FC<ColumnProps> = ({id,title,tasks}) => {
    return (
        <div className={styles.column}>
            <h2 className={styles.title}>{title}</h2>
            <div className={styles.tasks}>
                {tasks.map((task) => (
                    <TaskCard key={task.id} task={task} />
                ))}
            </div>
        </div>
    );
};

export default Column;