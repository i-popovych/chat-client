import { Suspense } from 'react';

import { Loader } from '@/components/Loader';

import { Routes } from './components/Routes/Routes';
import { useAuth } from './hooks/useAuth';
import { useSocket } from './hooks/useSocket';
import './index.css';
import { NotificationSettings } from './packages/notification/NotificationSettings';
import { useAppSelector } from './redux/hooks';
import './reset.css';

export const App = () => {
  useAuth();
  useSocket();
  const { isAuthInitialized } = useAppSelector((state) => state.user);

  if (!isAuthInitialized) return <div> </div>;

  return (
    <>
      <Suspense fallback={<Loader />}>
        <Routes />
      </Suspense>
      <NotificationSettings />
    </>
  );
};
