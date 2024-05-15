import { Navigate } from 'react-router-dom';

import { Login } from '../../../../pages/login';
import { Registration } from '../../../../pages/registration/Registration';
import { PublicRoutes } from './publicRoutes.enum';

export const publicRoutes = [
  {
    path: PublicRoutes.MAIN,
    element: <Navigate to={PublicRoutes.LOGIN} />,
  },
  {
    path: PublicRoutes.LOGIN,
    element: <Login />,
  },
  {
    path: PublicRoutes.REGISTRATION,
    element: <Registration />,
  },
  {
    path: '*',
    element: <Navigate to={PublicRoutes.LOGIN} />,
  },
];
