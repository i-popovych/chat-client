import { FC, useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { FaBell, FaChevronDown, FaUser } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';

import { Group } from 'entities/Group';

import { groupService } from '@/api/services/group/group.service';
import { PrivateRoutes } from '@/components/Routes/libs/constants/privateRoutes.enum';
import { CreateGroupPopup } from '@/components/SideBar/libs/components/CreateGroupPopup';
import { useLoading } from '@/hooks/useLoading';
import { GroupsList } from '@/pages/dashboard/libs/GroupsList';
import { setGroup } from '@/redux/features/groups/groupSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';

type Props = {
  children: React.ReactNode;
};

export const AppHeader: FC<Props> = ({ children }) => {
  const project = useAppSelector((state) => state.project);
  const userState = useAppSelector((state) => state.user);

  const [isShowGroupPopup, setIsShowGroupPopup] = useState(false);

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const onGroupClick = () => {
    navigate(PrivateRoutes.SELECT_PROJECT);
  };

  const fetchGroup = async () => {
    if (!project.currentProject) return;

    try {
      const { data: groups } = await groupService.getAllUserGroups({
        project: project.currentProject.id,
      });

      return groups;
    } catch (error) {
      console.error('[Error while fetchig the groups]', error);
    }
  };

  const handleGroupClick = (group: Group) => {
    dispatch(setGroup(group));
  };

  const { data: groupsList, refetchData } = useLoading(fetchGroup);

  if (!project.currentProject || !userState.user) return null;

  return (
    <div className='flex h-[100%]'>
      <div className='w-[300px] flex flex-col grow  bg-[#4a194e] px-4 text-lg text-white'>
        <div className='flex gap-8 mt-4 justify-between items-center'>
          <div className='flex gap-3 items-center cursor-pointer '>
            <FaUser fill='white' size={22} />
            <span className='text-lg text-white'>{userState.user.username}</span>
          </div>
          <div className='cursor-pointer'>
            <FaBell fill='white' size={22} />
          </div>
        </div>
        <div className='flex gap-7 text-white text-lg mt-3'>
          <div
            onClick={onGroupClick}
            className='cursor-pointer hover:underline text-2xl flex gap-2 items-center'
          >
            <div>{project.currentProject.project_name}</div>
            <div>
              <FaChevronDown />
            </div>
          </div>
        </div>
        <div className='mt-2 flex items-center text-lg text-white gap-2'>
          <div>
            <AiOutlinePlus size={22} fill='white' />
          </div>
          <div>
            <span onClick={() => setIsShowGroupPopup(true)} className='cursor-pointer'>
              Create Group
            </span>
          </div>
          <CreateGroupPopup
            handleClose={() => setIsShowGroupPopup(false)}
            isOpen={isShowGroupPopup}
            refetchGroups={refetchData}
          />
        </div>
        <div className='mt-2'>
          <div>Groups:</div>
          {groupsList && <GroupsList groups={groupsList} handleGroupClick={handleGroupClick} />}
        </div>
      </div>
      <div className='w-full'>{children}</div>
    </div>
  );
};
