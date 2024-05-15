import { ProfilePage } from '../../../../pages/profile/Profile';
import { ProtectedRoute } from '../../ProtectedRoute';
import { PrivateRoutes } from './privateRoutes.enum';

export const privateRoutes = [
  {
    path: PrivateRoutes.MAIN,
    element: <ProtectedRoute />,
    children: [
      {
        path: PrivateRoutes.MAIN,
        element: <div>sdf</div>,
      },
      {
        path: PrivateRoutes.PROFILE,
        element: <ProfilePage />,
      },
    ],
  },
];
