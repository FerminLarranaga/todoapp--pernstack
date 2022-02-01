import React, { Fragment } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../App';
import './Navbar.css';

const Navbar = () => {
    const auth = useAuth();
    const navigate = useNavigate();

    if (auth.user) {
        console.log(auth.user)
        return (
            <Fragment>
                <header className='Navbar'>
                    <Link className='tasksBtn' to='/tasks'>Tasks</Link>
                    <div className='navbarBtnsContainer'>
                        <Link className='normalBtn newTaskBtn' to='task/new'>New Task</Link>
                        <svg
                            className='logOutSvg'
                            title='Sign out'
                            focusable="false"
                            aria-hidden="true"
                            viewBox="0 0 24 24"
                            data-testid="LogoutIcon"
                            onClick={() => auth.signout(() => navigate('/'))}>
                            <path d="m17 7-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z" />
                        </svg>
                        {/* <button
                            onClick={() => auth.signout(() => navigate('/'))}
                            className='normalBtn signoutBtn'
                        >
                            Sign Out
                        </button> */}
                    </div>
                </header>

                <Outlet />
            </Fragment>
        )
    }

    return <Outlet />
}

export default Navbar;