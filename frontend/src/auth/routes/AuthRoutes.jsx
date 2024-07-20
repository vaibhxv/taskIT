import { Navigate } from 'react-router-dom';
import {
 
  LoginPage,
  RegisterPage
 
} from '../pages';

const AuthRoutes = [
  {
    path: 'login',
    element: <LoginPage />
  },
  {
    path: 'register',
    element: <RegisterPage />
  },
  
  {
    index: true,
    element: <Navigate to='/auth/login' />
  },
]

export default AuthRoutes;