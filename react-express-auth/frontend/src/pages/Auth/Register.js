import { useState } from "react";
import useAuth from "../../context/AuthContext";

export default function Login() {


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
        console.log(loginState);
    }

    return (
        <section id="user_register">
            <h1>Register User</h1>
            <form onChange={handleChange}>
                <div>
                    <label htmlFor="fullname">Fullname</label>
                    <input type="fullname" id="fullname" name="fullname" required />
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" required />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" required />
                </div>
                <input type="submit" onSubmit={handleSubmit} />
            </form>
        </section>
    )
}
