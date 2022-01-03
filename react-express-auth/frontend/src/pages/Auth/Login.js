import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../../context/AuthContext";

export default function Login() {
    const { login, loading, error, user, logout, checkCookie } = useAuth();

    const initialState = {
        email: '',
        password: '',
    }

    const [loginState, setLoginState] = useState(initialState);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setLoginState({ ...loginState, [name]: value });
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        login(loginState.email, loginState.password);
    }

    return (
        <section id="user_login">
            <h1>Login User</h1>
            {loading ? <p>Loading...</p> : (
                <form onChange={handleChange} onSubmit={handleSubmit} >
                    <div>
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" required />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" required />
                    </div>
                    <input type="submit" />
                </form>
            )}
            {error && <p>{error}</p>}
            {user && <>
                <p>{user.email}</p>
                <button onClick={logout}>Logout</button>
            </>}
            <button onClick={checkCookie}>Check Cookie</button>
        </section>
    )
}
