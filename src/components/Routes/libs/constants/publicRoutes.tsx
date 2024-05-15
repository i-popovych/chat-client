import { Navigate } from 'react-router-dom';

import { Login } from '../../../../pages/login';
import { Registration } from '../../../../pages/registration/Registration';
import { Wrapper } from '../../../UI/Wrapper';
import { PublicRoutes } from './publicRoutes.enum';

export const publicRoutes = [
  {
    path: PublicRoutes.MAIN,
    element: <Navigate to={PublicRoutes.LOGIN} />,
  },
  {
    path: PublicRoutes.LOGIN,
    element: (
      <Wrapper>
        <Login />
      </Wrapper>
    ),
  },
  {
    path: PublicRoutes.REGISTRATION,
    element: (
      <Wrapper>
        <Registration />
      </Wrapper>
    ),
  },
  {
    path: '*',
    element: <Navigate to={PublicRoutes.LOGIN} />,
  },
];
