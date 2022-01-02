import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";

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
            </Routes>
        </BrowserRouter>
    )
}
