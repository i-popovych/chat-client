import { useNavigate } from 'react-router-dom';

import { PrivateRoutes } from '@/components/Routes/libs/constants/privateRoutes.enum';
import { AppHeader } from '@/components/SideBar/SideBar';
import { useAppSelector } from '@/redux/hooks';

import { Chat } from '../../components/Chat/Chat';
import { SelectChat } from './libs/SelectChat';

export const Dashboard = () => {
  const { currentGroup } = useAppSelector((state) => state.group);

  const navigate = useNavigate();

  if (!currentGroup) {
    navigate(PrivateRoutes.SELECT_PROJECT);
    return;
  }

  return (
    <AppHeader>
      <div className='flex justify-between mx-auto'>
        <div className='flex grow max-w-[1000px] max-h-[calc(100vh)] ml-auto'>
          {currentGroup?.id ? <Chat currentGroupId={currentGroup?.id} /> : <SelectChat />}
        </div>
      </div>
    </AppHeader>
  );
};
