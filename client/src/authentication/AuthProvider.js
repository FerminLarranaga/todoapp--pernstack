import React, { useState, useEffect } from 'react';
import { AuthContext } from '../App';

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState();
    const [autoLoginLoading, setAutoLoginLoading] = useState(true);
    const [signinLoading, setSigninLoading] = useState(false);

    const register = async (newUser, beforeAuth, onError, onSuccess) => {
        setSigninLoading(true);
        beforeAuth();
        try {
            const res = await fetch('/authRoutes/register', {
                method: 'POST',
                body: JSON.stringify({ username: newUser.username, password: newUser.password }),
                headers: { 'Content-type': 'application/json' }
            })

            if (!res.ok){
                setAutoLoginLoading(false);
                onError(res.statusText);
                return
            }

            const userToken = await res.json();
            
            localStorage.setItem('token', userToken.token);
            setUser(newUser.username);
            onSuccess();
            setAutoLoginLoading(false);
        } catch (error) {
            console.error(error);
            setAutoLoginLoading(false);
            onError(`Server didn't responde, please try later`);
        }
    }

    const signin = async (newUser, beforeAuth, onError, onSuccess) => {
        setSigninLoading(true);
        beforeAuth();
        try {
            const res = await fetch('/authRoutes/signin', {
                method: 'POST',
                body: JSON.stringify(newUser),
                headers: { 'Content-Type': 'application/json' }
            })

            if(!res.ok){
                const errorData = await res.json();
                console.log(errorData)
                onError(errorData);
                setSigninLoading(false);
                return false
            }

            const userToken = await res.json();

            localStorage.setItem('token', userToken.token);
            setUser(newUser.username);
            onSuccess();
            setSigninLoading(false);
        } catch (error) {
            console.error(error);
            setAutoLoginLoading(false);
            onError(`Server didn't responde, please try later`);
        }
    }

    const signout = (callback) => {
        setUser(null);
        localStorage.setItem('token', '')
        callback();
    }

    const checkToken = async () => {
        if (!localStorage.token) {
            setAutoLoginLoading(false);
            return false
        }

        try {
            const verifyRes = await fetch('/authRoutes/is-verify', {
                method: 'GET',
                headers: { token: localStorage.token }
            })

            console.log(verifyRes);
            
            if (!verifyRes.ok){
                const errorData = await verifyRes.json();
                console.log(errorData.message);
                setAutoLoginLoading(false);
                return false
            }

            const tokenData = await verifyRes.json();

            return tokenData.isTokenValid

        } catch (error) {
            setAutoLoginLoading(false);
            console.error(error);
        }

    }

    const autoLoginUser = async () => {
        setAutoLoginLoading(true);
        if (!await checkToken()) {
            return false
        }

        try {
            const dataRes = await fetch('/authRoutes/dashboard', {
                method: 'GET',
                headers: { token: localStorage.token }
            });
    
            if (!dataRes.ok) {
                const errorData = await dataRes.json();
                console.log(errorData.message);
                setAutoLoginLoading(false);
                return false
            }
    
            const userData = await dataRes.json();
    
            setUser(userData.username);
            setAutoLoginLoading(false);
        } catch (error) {
            console.error(error)
            setAutoLoginLoading(false);
        }

        return true
    }

    useEffect(() => {
        autoLoginUser();
        // eslint-disable-next-line
    }, []);

    const value = {
        user,
        signinLoading,
        autoLoginLoading,
        register,
        signin,
        signout,
        autoLoginUser
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthProvider;