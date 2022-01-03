import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import cookie from 'js-cookie'

function PrivateRoute() {
    console.log(isAuthenticated);

    // If authorized, return an outlet that will render child elements
    // If not, return element that will navigate to login page
    return isAuthenticated ? <Outlet /> : <Navigate to="/auth/login" />
}

export default PrivateRoute;