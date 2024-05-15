import { Navigate } from 'react-router-dom';

import { Dashboard } from '../../../../pages/dashboard/Dashboard';
import { SelectProject } from '../../../../pages/selectProject/SelectProject';
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
        path: '*',
        element: <Navigate to={PrivateRoutes.MAIN} />,
      },
    ],
  },
];
