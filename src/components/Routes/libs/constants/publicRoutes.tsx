import { Navigate } from 'react-router-dom';

import { PublicRoutes } from '@/components/Routes/libs/constants/publicRoutes.enum';
import { Login } from '@/pages/login';
import { Wrapper } from '@/components/UI/Wrapper';
import { Registration } from '@/pages/registration/Registration';

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
