import React, { useEffect, useRef, useState } from 'react';
import MessageAlert from './MessageAlert';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../App';
import { delay, trimUserData, validInfo } from '../util';
import './Register.css';

const Register = () => {
    const [displayMessage, setDisplayMessage] = useState(false);
    const [messageInfo, setMessageInfo] = useState({ message: '', isSuccess: false });
    const auth = useAuth();
    const registerForm = useRef(null);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/tasks';

    const registerUser = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const newUser = trimUserData({
            username: formData.get('username'),
            password: formData.get('password'),
            confirmedPassword: formData.get('confirmedPassword')
        });

        const validationInfoData = validInfo(Object.values(newUser));

        if (!validationInfoData.isValid) {
            setDisplayMessage(true);
            setMessageInfo({ message: validationInfoData.message, isSuccess: false });
            return false;
        }

        auth.register(newUser,
            () => {
                registerForm.current.classList.add('registerFormLoading');
            },

            (message) => {
                setMessageInfo({ message: message, isSuccess: false });
                setDisplayMessage(true);
                registerForm.current.classList.remove('registerFormLoading');
            },

            async () => {
                e.target.reset();
                setMessageInfo({ message: 'Successful registration', isSuccess: true });
                setDisplayMessage(true);
                await delay(1500);
                registerForm.current.classList.remove('registerFormLoading');
                navigate(from, { replace: true });
            }
        )
    }

    useEffect(() => {
        if (auth.autoLoginLoading) return
        if (auth.user) {
            navigate('/tasks')
            return
        }
        // eslint-disable-next-line
    }, [auth.autoLoginLoading])

    if (auth.autoLoginLoading) {
        return ''
    }

    return (
        <div className='registerContainer'>
            <MessageAlert
                message={messageInfo.message}
                isSuccess={messageInfo.isSuccess}
                displayMessage={displayMessage}
                setDisplayMessage={setDisplayMessage}
            />
            <form ref={registerForm} className='registerForm' onSubmit={registerUser}>
                <h1 className='registerFormTitle'>Register</h1>
                <label>Username</label>
                <input
                    type='name'
                    name='username'
                    className='registerUserNameInput'
                />
                <label>Password</label>
                <input
                    type='password'
                    name='password'
                    className='registerPasswordInput'
                />
                <label>Confirm Password</label>
                <input
                    type='password'
                    name='confirmedPassword'
                    className='registerConfirmPasswordInput'
                />
                <button type='submit'>Register</button>

                <div className='redirectToSignin' style={{ display: 'flex', alignItems: 'center', alignSelf: 'center' }}>
                    <p>Already have an account?</p>
                    <Link className='signInBtn' to='/signin'>Sign In</Link>
                </div>
            </form>
        </div>
    )
}

export default Register;