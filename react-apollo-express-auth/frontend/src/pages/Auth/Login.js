import { useState } from "react";
import { useMutation, useLazyQuery } from "@apollo/client";
import { SIGN_IN } from "../../graphql/mutations";
import { LOGOUT } from "../../graphql/queries";

export default function Login() {
    const initialState = {
        email: '',
        password: '',
    }

    const [logoutUser, { data: logoutMessage, loading2, erro2 }] = useLazyQuery(LOGOUT)
    const [loginUser, { data, loading, error }] = useMutation(SIGN_IN);

    const [loginState, setLoginState] = useState(initialState);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setLoginState({ ...loginState, [name]: value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        loginUser({ variables: loginState });
    }

    const handleLogout = () => {
        logoutUser();
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
            {error && <p>{error.message}</p>}
            <button onClick={handleLogout}>
                Logout
            </button>
            {logoutMessage && <p>{logoutMessage.logout.message}</p>}
        </section>
    )
}
