import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { authService } from '../../services/api';

interface AdminAuthGuardProps {
  children: React.ReactNode;
}

export default function AdminAuthGuard({ children }: AdminAuthGuardProps) {
  const { state, dispatch } = useApp();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('adminToken');
        if (!token) {
          navigate('/admin/login');
          return;
        }
        await authService.verifyToken();
        dispatch({ type: 'SET_ADMIN_STATUS', payload: true });
      } catch (error) {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminAuth');
        dispatch({ type: 'SET_ADMIN_STATUS', payload: false });
        navigate('/admin/login');
      }
    };

    checkAuth();
  }, [dispatch, navigate]);

  if (!state.isAdmin) {
    return null; // Don't render anything while checking auth
  }

  return <>{children}</>;
} 