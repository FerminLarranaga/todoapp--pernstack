import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../App';
import { delay, trimUserData, validInfo } from '../util'
import MessageAlert from './MessageAlert';
// import './SignIn.css';

const SignIn = () => {
    const [displayMessage, setDisplayMessage] = useState(false);
    const [messageInfo, setMessageInfo] = useState({ message: '', isSuccess: false });
    const signinForm = useRef(null);
    const navigate = useNavigate();
    const auth = useAuth();

    const signInUser = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const newUser = trimUserData({
            username: formData.get('username'),
            password: formData.get('password')
        })

        const validationInfoData = validInfo(Object.values(newUser));

        if (!validationInfoData.isValid) {
            setDisplayMessage(true);
            setMessageInfo({message: validationInfoData.message, isSuccess: false});
            return false;
        }

        auth.signin(newUser,
            () => {
                signinForm.current.classList.add('registerFormLoading');
            },

            (message) => {
                setMessageInfo({message: message, isSuccess: false});
                setDisplayMessage(true);
                signinForm.current.classList.remove('registerFormLoading');
            },
            
            async () => {
                e.target.reset();
                setMessageInfo({ message: 'Successfuly signed in', isSuccess: true });
                setDisplayMessage(true);
                await delay(1500);
                signinForm.current.classList.remove('registerFormLoading');
                navigate('/tasks');
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
            <form ref={signinForm} onSubmit={signInUser} className='registerForm'>
                <h1 className='registerFormTitle'>Sign In</h1>
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
                    className='registerConfirmPasswordInput'
                />
                <button type='submit'>Sign In</button>

                <div style={{ display: 'flex', alignItems: 'center', alignSelf: 'center' }}>
                    <p>Don't have an account?</p>
                    <Link className='signInBtn' to='/'>Register</Link>
                </div>
            </form>
        </div>
    )
}

export default SignIn;