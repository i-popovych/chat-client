import { Navigate, Outlet } from 'react-router-dom';

import { useAppSelector } from '../../redux/hooks';

export const ProtectedRoute = () => {
  const { user } = useAppSelector((state) => state.user);

  if (!user) {
    return <Navigate to='/login' />;
  }

  return <Outlet />;
};
