import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "./context/AuthContext";

function PrivateRoute() {
    const {user} = useAuth();
    // If authorized, return an outlet that will render child elements
    // If not, return element that will navigate to login page
    if (user) {
        return <Outlet />;
    }
    return <Navigate replace to="/auth/login" />;
}

export default PrivateRoute;