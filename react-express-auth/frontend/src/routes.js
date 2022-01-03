import { Routes, Route, useNavigate } from "react-router-dom";
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Dashboard from './pages/Dashboard/Dashboard';
import PrivateRoute from "./PrivateRoute";
import useAuth from "./context/AuthContext";

export default function MyRoutes() {
    const navigate = useNavigate();
    const { user } = useAuth();
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="auth">
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
            </Route>
            <Route path="/dashboard" element={<PrivateRoute />}>
                <Route path="/dashboard" element={<Dashboard />} />
            </Route>
        </Routes >
    )
}
