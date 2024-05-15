import { useState } from 'react';

import { UserAvatar } from '@/components/UserAvatar/UserAvatar';

export const UserInfo = () => {
  const [isShowModal, setIsShowModal] = useState(false);

  const onAvatarClick = () => {
    setIsShowModal((prev) => !prev);
  };

  const renderMenu = () => {
    return (
      <div className='absolute top-16 right-3 bg-[white] transition-all'>
        <div className='px-3 py-2'>Profile</div>
        <div className='px-3 py-2'>Logout</div>
      </div>
    );
  };

  return (
    <div className='pr-5 relative'>
      <div onClick={onAvatarClick}>
        <UserAvatar />
      </div>
      {isShowModal && renderMenu()}
    </div>
  );
};
