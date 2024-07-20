import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';
import { AuthLayout } from '../auth/layout/AuthLayout';
import { AdminLayout, LandingLayout } from '../IntelliTask/layout';
import AuthRoutes from '../auth/routes/AuthRoutes';
import { DashboardRoutes, ProjectsRoutes, LandingRoutes } from '../IntelliTask/routes/TaskUnityRoutes';
import { ErrorPage } from '../IntelliTask/pages';

const AppRouter = [
  {
    path: '/',
    element:
      <PublicRoute>
        <LandingLayout />
      </PublicRoute>,
    errorElement: <ErrorPage />,
    children: LandingRoutes,
  },
  {
    path: '/auth',
    element:
      <PublicRoute>
        <AuthLayout />
      </PublicRoute>,
    errorElement: <ErrorPage />,
    children: AuthRoutes,
  },
  {
    path: '/dashboard',
    element:
      <PrivateRoute>
        <AdminLayout />
      </PrivateRoute>,
    children: DashboardRoutes,
  },
  
]

export default AppRouter;