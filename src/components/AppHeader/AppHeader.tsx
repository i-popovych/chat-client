import { FC } from 'react';
import { FaBell, FaUser } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';

import { AvatarIcon, NotificationIcon } from '@/assets/images';
import { privateRoutes } from '@/components/Routes/libs/constants/privateRoutes';
import { PrivateRoutes } from '@/components/Routes/libs/constants/privateRoutes.enum';
import { Header } from '@/components/layout/Header/Header';
import { useAppSelector } from '@/redux/hooks';

type Props = {
  children: React.ReactNode;
};

export const AppHeader: FC<Props> = ({ children }) => {
  const project = useAppSelector((state) => state.project);
  const userState = useAppSelector((state) => state.user);

  const navigate = useNavigate();

  const onGroupClick = () => {
    navigate(PrivateRoutes.SELECT_PROJECT);
  };

  if (!project.currentProject || !userState.user) return null;

  return (
    <>
      <Header>
        <div className='w-full flex justify-between items-center'>
          <div className='flex gap-7 ml-8 text-white text-lg'>
            <div onClick={onGroupClick} className='cursor-pointer hover:underline'>
              {project.currentProject.project_name}
            </div>
            <div className='cursor-pointer hover:underline'>Groups</div>
          </div>
          <div className='flex w-[120px] gap-8'>
            <div className='cursor-pointer'>
              <FaUser fill='white' size={22} />
            </div>
            <div className='cursor-pointer'>
              <FaBell fill='white' size={22} />
            </div>
          </div>
        </div>
      </Header>
      {children}
    </>
  );
};
