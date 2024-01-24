import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { AuthState } from '../types';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const user = useSelector((state: AuthState) => state.authReducer?.authData?.user);

    if (!user) {
        return <Navigate to='/auth' replace />;
    }

    return children;
};

export default ProtectedRoute;
