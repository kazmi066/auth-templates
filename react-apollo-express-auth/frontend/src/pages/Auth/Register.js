import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../context/AuthContext";

export default function Register() {
    const { user, register, loading, error, message } = useAuth();
    const navigate = useNavigate();

    const initialState = {
        fullname: "",
        email: '',
        password: '',
    }

    useEffect(() => {
        if (user) {
            navigate('/')
        }
    }, [user])

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
