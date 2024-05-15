import { useState } from 'react';

import { userService } from '@/api/services/user/user.service';
import { UserAvatar } from '@/components/UserAvatar/UserAvatar';
import { AvatarSelectionModal } from '@/pages/profile/libs/AvatarSelectionModal';
import { setUser } from '@/redux/features/user/userSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';

import { Notification } from '../../packages/notification/index';

export const Profile = () => {
  const user = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();

  const [isShowAvatarModal, setIsShowAvatarModal] = useState(false);

  const onAvatarClick = () => {
    setIsShowAvatarModal((prev) => !prev);
  };

  const onAvatarSelect = async (avatarName: string) => {
    try {
      const { data: user } = await userService.updateAvatar(avatarName);

      dispatch(setUser(user));
    } catch (error) {
      Notification.error('Error while updating avatar');
      console.error(error);
    }
  };

  return (
    <div className='bg-[red] flex flex-col'>
      <div className=''>
        <span>{user?.username}</span>
      </div>
      <div onClick={onAvatarClick}>
        <UserAvatar />
      </div>
      <div>
        <AvatarSelectionModal
          handleClose={() => setIsShowAvatarModal(false)}
          isOpen={isShowAvatarModal}
          handleSelectAvatar={onAvatarSelect}
        />
      </div>
    </div>
  );
};
