import { useState } from 'react';

import { AppHeader } from '@/components/AppHeader/AppHeader';

import { groupService } from '../../api/services/group/group.service';
import { Chat } from '../../components/Chat/Chat';
import { useLoading } from '../../hooks/useLoading';
import { useAppSelector } from '../../redux/hooks';
import { GroupsList } from './libs/GroupsList';
import { SelectChat } from './libs/SelectChat';

export const Dashboard = () => {
  const { currentProject } = useAppSelector((state) => state.project);

  const [currentGroupId, setCurrentGroupId] = useState<number | null>(null);

  const fetchGroup = async () => {
    if (!currentProject) return;

    try {
      const { data: groups } = await groupService.groupService({ project: currentProject.id });

      return groups;
    } catch (error) {
      console.error('[Error while fetchig the groups]', error);
    }
  };

  const handleGroupClick = (groupId: number) => {
    setCurrentGroupId(groupId);
  };

  const { data: groupsList, loading } = useLoading(fetchGroup);

  return (
    <AppHeader>
      <div className='flex justify-between px-5  mx-auto'>
        <div className='w-[300px]'>
          <h1>Groups</h1>
          {groupsList && <GroupsList groups={groupsList} handleGroupClick={handleGroupClick} />}
        </div>
        <div className='flex grow max-w-[1000px] max-h-[calc(100vh-10px)]'>
          {currentGroupId ? <Chat currentGroupId={currentGroupId} /> : <SelectChat />}
        </div>
      </div>
    </AppHeader>
  );
};
