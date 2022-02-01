import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../App';
import './TaskForm.css';

const TaskForm = () => {
    const [task, setTask] = useState({
        title: "",
        description: ""
    });
    const [loading, setLoading] = useState(false);

    const { id } = useParams();
    const navigate = useNavigate();
    const auth = useAuth();

    const postTask = async (e) => {
        e.preventDefault();

        setLoading(true);
        const method = id ? 'PUT' : 'POST';

        const res = await fetch(`/taskRoutes/tasks${id ? '/' + id : ''}`, {
            method: method,
            body: JSON.stringify(task),
            headers: { 
                token: localStorage.token,
                'Content-Type': 'application/json'
            }
        });

        console.log(res);

        setLoading(false);
        navigate('/tasks');
    }

    const updateTask = (evt) => {
        setTask({ ...task, [evt.target.name]: evt.target.value });
    }

    const loadTask = async () => {
        const res = await fetch(`/taskRoutes/tasks/${id}`, {
            method: 'GET',
            headers: {token: localStorage.token}
        });
        const data = await res.json();
        setTask({ title: data.title, description: data.description });
    }

    useEffect(() => {
        if (id) {
            loadTask()
        } else {
            setTask({ title: "", description: ""});
        }
    }, [id]);

    return (
        <div className='Taskform'>
            <form onSubmit={postTask} className='Taskform_container'>
                <h2 className='Taskform_title'>{id? 'Edit task' : 'Create task'}</h2>
                <p className='Taskform_titleEntry'>
                    <label htmlFor='title'>Title:</label>
                    <input
                        name='title'
                        type='text'
                        value={task.title}
                        onChange={evt => updateTask(evt)}
                    />
                </p>

                <p className='Taskform_descEntry'>
                    <label htmlFor='description'>Description:</label>
                    <textarea
                        name='description'
                        type='text'
                        value={task.description}
                        onChange={evt => updateTask(evt)}
                    />
                </p>

                <button
                    type='submit'
                    style={{ textAlign: 'center' }}
                    disabled={loading || !task.title || !task.description}
                    className='Taskform_submit'
                >{loading ? 'Loading...' : 'Save'}</button>
            </form>
        </div>
    )
}

export default TaskForm;