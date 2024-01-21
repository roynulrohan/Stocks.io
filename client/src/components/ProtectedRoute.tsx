import { useState } from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const [profile] = useState(JSON.parse(localStorage.getItem('profile') || '{}'));

    if (!profile.user) {
        return <Navigate to='/auth' replace />;
    }

    return children;
};

export default ProtectedRoute;
