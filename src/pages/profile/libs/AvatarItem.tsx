import { FC } from 'react';

type Props = {
  link: string;
};

export const AvatarItem: FC<Props> = ({ link }) => {
  return (
    <div className='cursor-pointer'>
      <img src={link} alt='' />
    </div>
  );
};
