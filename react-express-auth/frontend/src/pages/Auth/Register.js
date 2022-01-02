import { useState } from "react";
import useAuth from "../../context/AuthContext";

export default function Register() {
    const { register, loading, error, message } = useAuth();

    const initialState = {
        fullname: "",
        email: '',
        password: '',
    }

    const [registerState, setRegisterState] = useState(initialState);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setRegisterState({ ...registerState, [name]: value });
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        register(registerState.fullname, registerState.email, registerState.password);
    }

    return (
        <section id="user_register">
            <h1>Register User</h1>
            {loading && <p>Loading...</p>}
            <form onChange={handleChange} onSubmit={handleSubmit}>
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
                <input type="submit" />
            </form>
            {error && <p>{error}</p>}
            {message && <p>{message}</p>}
        </section>
    )
}
