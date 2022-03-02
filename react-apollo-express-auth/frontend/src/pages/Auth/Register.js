import { useState } from "react";
import { useMutation } from "@apollo/client";
import { SIGN_UP } from '../../graphql/mutations';

export default function Register() {
    const initialState = {
        username: "",
        email: '',
        password: '',
    }
    
    const [registerUser, {data, loading, error}] = useMutation(SIGN_UP);
    
    const [registerState, setRegisterState] = useState(initialState);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setRegisterState({ ...registerState, [name]: value });
    }
    
    const handleSubmit = (event) => {
        event.preventDefault();
        registerUser({ variables: registerState });
    }

    if(loading) return <p>Loading...</p>;

    return (
        <section id="user_register">
            <h1>Register User</h1>
            {loading ? <p>Loading...</p> : (
                <form onChange={handleChange} onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="username">username</label>
                        <input type="text" name="username" required />
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
            )}

            {error && <p>{error.message}</p>}
            {data && <p>{data.signUp.message}</p>}
        </section>
    )
}
