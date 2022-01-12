import useAuth from "../../context/AuthContext";

export default function Dashboard() {
    const { user } = useAuth();
    return (
        <div>
            {user && <h1>{user.email}</h1>}
            Dashboard ROute
        </div>
    )
}
