import { RouteObject } from 'react-router-dom';
import AdminLayout from '../layouts/AdminLayout';
import AdminPanel from '../components/Admin/AdminPanel';
import AdminLogin from '../pages/admin/AdminLogin';
import AdminAuthGuard from '../components/Auth/AdminAuthGuard';

const adminRoutes: RouteObject[] = [
  {
    path: '/admin',
    element: <AdminAuthGuard><AdminLayout /></AdminAuthGuard>,
    children: [
      {
        index: true,
        element: <AdminPanel />
      }
    ]
  },
  {
    path: '/admin/login',
    element: <AdminLogin />
  }
];

export default adminRoutes; 