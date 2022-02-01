import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../App';

const RequireAuth = ({ children }) => {
    const auth = useAuth();
    const location = useLocation();

    if(!auth.user && !auth.autoLoginLoading) {
        return <Navigate to='/' state={{ from: location }} replace/>
    }

    if (auth.autoLoginLoading) return <h1>LOADING...</h1>

    return children;
}

export default RequireAuth;