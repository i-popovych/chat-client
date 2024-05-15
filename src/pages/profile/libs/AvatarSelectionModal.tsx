import { FC } from 'react';

import { Popup } from '@/components/UI/PopUp/PopUp';
import { getStaticAvatarRoute } from '@/helpers/static/getStaticRoute';
import { AvatarItem } from '@/pages/profile/libs/AvatarItem';

type Props = {
  handleClose: () => void;
  handleSelectAvatar: (avatarName: string) => void;
  isOpen: boolean;
};

const avatars = ['ava1.png', 'ava2.png', 'ava3.png', 'ava4.png', 'ava5.png', 'ava6.png'];

export const AvatarSelectionModal: FC<Props> = ({ handleClose, isOpen, handleSelectAvatar }) => {
  return (
    <Popup handleClose={handleClose} isOpen={isOpen}>
      <div className='grid grid-cols-3 gap-4 m-10'>
        {avatars.map((avatar) => {
          return (
            <AvatarItem
              key={avatar}
              link={getStaticAvatarRoute(avatar)}
              handleClick={() => handleSelectAvatar(avatar)}
            />
          );
        })}
      </div>
    </Popup>
  );
};
