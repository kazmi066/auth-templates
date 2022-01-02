import { useState } from "react";
import useAuth from "../../context/AuthContext";

export default function Login() {
    const { login, loading, error } = useAuth();

    const initialState = {
        email: '',
        password: '',
    }

    const [loginState, setLoginState] = useState(initialState);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setLoginState({ ...loginState, [name]: value });
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        login(loginState);
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
        </section>
    )
}