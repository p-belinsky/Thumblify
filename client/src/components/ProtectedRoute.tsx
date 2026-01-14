import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import * as React from "react";

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const { user } = useAuth(); // assume `user` is null/undefined if not logged in

    if (!user) {
        // not logged in → redirect to login
        return <Navigate to="/login" replace />;
    }

    // logged in → show the page
    return <>{children}</>;
};

export default ProtectedRoute;