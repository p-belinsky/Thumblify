import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import * as React from "react";

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const { user, loading } = useAuth();

    // ⏳ wait for auth to resolve
    if (loading) {
        return null; // or a spinner
    }

    // ❌ unauthenticated
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // ✅ authenticated
    return <>{children}</>;
};

export default ProtectedRoute;
