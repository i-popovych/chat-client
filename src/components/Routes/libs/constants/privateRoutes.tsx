import { Navigate } from 'react-router-dom';

import { Dashboard } from '../../../../pages/dashboard/Dashboard';
import { ProfilePage } from '../../../../pages/profile/Profile';
import { Wrapper } from '../../../UI/Wrapper';
import { ProtectedRoute } from '../../ProtectedRoute';
import { PrivateRoutes } from './privateRoutes.enum';

export const privateRoutes = [
  {
    path: PrivateRoutes.MAIN,
    element: <ProtectedRoute />,
    children: [
      {
        path: PrivateRoutes.MAIN,
        element: <Navigate to={PrivateRoutes.PROFILE} />,
      },
      {
        path: PrivateRoutes.PROFILE,
        element: (
          <Wrapper>
            <ProfilePage />
          </Wrapper>
        ),
      },
      {
        path: PrivateRoutes.DASHBOARD,
        element: <Dashboard />,
      },
    ],
  },
];
