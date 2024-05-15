import { FC } from 'react';

import { User } from 'entities/User';

import { groupService } from '@/api/services/group/group.service';
import { PopUpProps, Popup } from '@/components/UI/PopUp/PopUp';
import { getStaticAvatarRoute } from '@/helpers/static/getStaticRoute';
import { useLoading } from '@/hooks/useLoading';

interface Props extends Omit<PopUpProps, 'children'> {
  currentGroupId: number;
}

export const AllUserListModal: FC<Props> = ({ handleClose, isOpen, currentGroupId }) => {
  const fetchUsers = async () => {
    if (!isOpen) return [];

    try {
      const users = await groupService.getAllGroupUsers({ groupId: currentGroupId });

      return users.data;
    } catch (error) {
      console.error('[Error while fetching the users]', error);
      return [];
    }
  };

  const { data, loading } = useLoading(fetchUsers, [isOpen]);

  const renderUsers = (users: User[]) => {
    return users.map((user) => {
      return (
        <div className='flex'>
          <div>
            <img src={getStaticAvatarRoute(user.avatar)} alt='avatar' className='w-[50px]' />
          </div>
          <div>{user.username}</div>
        </div>
      );
    });
  };

  if (loading) return <div>Loading...</div>;

  if (!data) return <div>No users</div>;

  return (
    <Popup isOpen={isOpen} handleClose={handleClose}>
      <div className='min-h-[300px]'>{renderUsers(data)}</div>
    </Popup>
  );
};
