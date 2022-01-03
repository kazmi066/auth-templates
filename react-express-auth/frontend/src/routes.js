import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Dashboard from './pages/Dashboard/Dashboard';
import PrivateRoute from "./PrivateRoute";

export default function MyRoutes() {

    return (
        <BrowserRouter>
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
            </Routes>
        </BrowserRouter>
    )
}
