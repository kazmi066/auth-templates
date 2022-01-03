import useAuth from "../../context/AuthContext"

export default function Home() {
    const { logout } = useAuth();
    return (
        <section id="home">
            Home component
            <button onClick={logout}>Logout</button>
        </section>
    )
}
