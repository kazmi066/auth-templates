import { Routes, Route, useNavigate } from "react-router-dom";
import Home from './pages/Home/Home';
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";

export default function MyRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="auth">
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
            </Route>
        </Routes >
    )
}
