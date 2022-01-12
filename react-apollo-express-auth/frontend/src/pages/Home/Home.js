import useAuth from "../../context/AuthContext"

export default function Home() {
    const { logout, user } = useAuth();
    return (
        <section id="home">
            Home component
            {user && <button onClick={logout}>Logout</button>}
        </section>
    )
}
