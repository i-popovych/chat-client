import { AppHeader } from '@/components/SideBar/SideBar';
import { useAppSelector } from '@/redux/hooks';

import { Chat } from '../../components/Chat/Chat';
import { SelectChat } from './libs/SelectChat';

export const Dashboard = () => {
  const group = useAppSelector((state) => state.group);

  return (
    <AppHeader>
      <div className='flex justify-between mx-auto'>
        <div className='flex grow max-w-[1000px] max-h-[calc(100vh)] ml-auto'>
          {group.currentGroup?.id ? (
            <Chat currentGroupId={group.currentGroup?.id} />
          ) : (
            <SelectChat />
          )}
        </div>
      </div>
    </AppHeader>
  );
};
