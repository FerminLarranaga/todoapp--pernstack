import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../App';
import './TasksList.css';

const TasksList = () => {
    const [tasks, setTasks] = useState([]);
    const navigate = useNavigate();
    const auth = useAuth();

    const getAllTasks = async () => {
        const res = await fetch('/taskRoutes/tasks', {
            method: 'GET',
            headers: {token: localStorage.token }
        })
        
        const data = await res.json();
        console.log(data);
        setTasks(data);
    }

    const editTask = (id) => {
        navigate(`/tasks/${id}/edit`);
    }

    const deleteTask = async (id) => {
        setTasks(tasks.filter(task => task.id !== id))
        const res = await fetch(`tasks/${id}`, {
            method: 'DELETE',
            headers: {token: localStorage.token}
        });
        console.log(res);
    }

    useEffect(() => getAllTasks(), []);

    return (
        <div className='Taskslist'>
            <h1>{auth.user}</h1>
            {
                tasks.map(task => (
                    <div id={task.id} key={task.id} className='task'>
                        <h3>{task.title}</h3>
                        <p>{task.description}</p>
                        <div className='task_btns'>
                            <button name='editBtn' onClick={() => editTask(task.id)}>Edit</button>
                            <button name='deleteBtn' onClick={() => deleteTask(task.id)}>Delete</button>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default TasksList;