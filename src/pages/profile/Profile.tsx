import { useState } from 'react';

import { UserAvatar } from '@/components/UserAvatar/UserAvatar';
import { useAppSelector } from '@/redux/hooks';

export const Profile = () => {
  const user = useAppSelector((state) => state.user.user);

  const [isShowAvatarModal, setIsShowAvatarModal] = useState(false);

  const onAvatarClick = () => {
    setIsShowAvatarModal((prev) => !prev);

  };

  return (
    <div className='bg-[red] flex flex-col'>
      <div className=''>
        <span>{user?.username}</span>
      </div>
      <div>
        <UserAvatar />
      </div>
    </div>
  );
};
