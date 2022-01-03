import axios from 'axios';
import { createContext, useState, useEffect, useMemo, useContext } from 'react';
import AxiosClient from '../axiosClient';
import cookie from 'js-cookie';

let initialState = {
    user: null,
    loading: false,
    error: "",
    message: "",
}

const AuthContext = createContext(initialState);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(initialState.user);
    const [loading, setLoading] = useState(initialState.loading);
    const [error, setError] = useState(initialState.error);
    const [message, setMessage] = useState(initialState.message);
    const [access_token, setAccessToken] = useState("");
    const [refresh_token, setRefreshToken] = useState("");

    const login = async (email, password) => {
        setLoading(true);
        try {
            const userData = await AxiosClient.post('/auth/login', { email, password })
            setUser(userData.data.user);
            setAccessToken(userData.data.access_token);
            setRefreshToken(userData.data.refresh_token);
            setError("")
        } catch (err) {
            setError(err.response.data.error)
        }
        setLoading(false)
    }

    const register = async (fullname, email, password) => {
        setLoading(true);
        try {
            const userData = await AxiosClient.post('/auth/register', { fullname, email, password })
            setMessage(userData.data.message);
            setError("")
        } catch (err) {
            setError(err.response.data.error)
        }
        setLoading(false)
    }

    const logout = async () => {
        setLoading(true);
        try {
            const logoutData = await AxiosClient.get('/auth/logout');
            setUser(null);
        } catch (err) {
            setError(err.response.data.error)
        }
        setLoading(false)
    }

    const checkCookie = async () => {
        setLoading(true);
        try {
            const cookieData = await AxiosClient.get('/cookies');
            setUser(null);
        } catch (err) {
            setError(err.response.data.error)
        }
        setLoading(false)
    }

    const momoedValue = {
        user,
        loading,
        error,
        message,
        login,
        register,
        logout,
        checkCookie
    }

    return (
        <AuthContext.Provider value={momoedValue}>
            {children}
        </AuthContext.Provider>
    )
}

export default function useAuth() {
    return useContext(AuthContext);
};
