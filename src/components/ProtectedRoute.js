import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, authenticated }) => {
    if (!authenticated) {
        return <Navigate to="/login" />;
    }

    return children;
};

export default ProtectedRoute;
