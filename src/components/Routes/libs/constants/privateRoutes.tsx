import { Navigate } from 'react-router-dom';

import { Profile } from '@/pages/profile/Profile';

import { Dashboard } from '../../../../pages/dashboard/Dashboard';
import { SelectProject } from '../../../../pages/selectProject/SelectProject';
import { ProtectedRoute } from '../../ProtectedRoute';
import { PrivateRoutes } from './privateRoutes.enum';

export const privateRoutes = [
  {
    path: PrivateRoutes.MAIN,
    element: <ProtectedRoute />,
    children: [
      {
        path: PrivateRoutes.MAIN,
        element: <Navigate to={PrivateRoutes.SELECT_PROJECT} />,
      },
      {
        path: PrivateRoutes.SELECT_PROJECT,
        element: <SelectProject />,
      },
      {
        path: PrivateRoutes.DASHBOARD,
        element: <Dashboard />,
      },
      {
        path: PrivateRoutes.PROFILE,
        element: <Profile />,
      },
      {
        path: '*',
        element: <Navigate to={PrivateRoutes.MAIN} />,
      },
    ],
  },
];
