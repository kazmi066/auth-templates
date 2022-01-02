import axios from 'axios';
import { createContext, useState, useEffect, useMemo, useContext } from 'react';
import AxiosClient from '../axiosClient';

let initialState = {
    user: null,
    loading: false,
    error: "",
    message: "",
}

const AuthContext = createContext({ initialState });

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(initialState.user);
    const [loading, setLoading] = useState(initialState.loading);
    const [error, setError] = useState(initialState.error);
    const [message, setMessage] = useState(initialState.message);

    const login = (email, password) => {
        setLoading(true);

        AxiosClient.post('/auth/login', { email, password }, { withCredentials: true }).then((user) => {
            setUser(user);
        }).catch(error => {
            setError(error)
        }).finally(() => setLoading(false));
    }

    const register = (fullname, email, password) => {
        setLoading(true);
        AxiosClient.post('/auth/register', { fullname, email, password }, { withCredentials: true }).then((message) => {
            setMessage(message);
        }).catch(error => {
            setError(error)
        }).finally(() => setLoading(false));
    }

    const logout = () => {
        setLoading(true);
        AxiosClient.get('/auth/logout', { withCredentials: true }).then(() => {
            setUser(null);
        }).catch(error => {
            setError(error)
        }).finally(() => setLoading(false));
    }

    const momoedValue = useMemo(() => ({
        user,
        loading,
        error,
        message,
        login,
        register,
        logout,
    }), [user, loading, error, message]);

    return (
        <AuthContext.Provider value={momoedValue}>
            {children}
        </AuthContext.Provider>
    )
}

export default function useAuth() {
    return useContext(AuthContext);
};
