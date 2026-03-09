import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Role } from '../../data/authData';
interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: Role[];
}
export function ProtectedRoute({
  children,
  allowedRoles
}: ProtectedRouteProps) {
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();
  if (!isAuthenticated) {
    return (
      <Navigate
        to="/auth/login"
        state={{
          from: location
        }}
        replace />);


  }
  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    // Redirect to their respective dashboard if they try to access unauthorized area
    if (user.role === 'admin') return <Navigate to="/admin" replace />;
    if (user.role === 'creator') return <Navigate to="/creator" replace />;
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
}