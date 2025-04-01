import { Navigate, Outlet } from 'react-router-dom';
import { isAuthenticated } from '../services/authService';

export const PrivateRoute: React.FC = () => {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/login" />;
};
