import { FC } from 'react';

type Props = {
  username: string;
};

export const UserInfo: FC<Props> = ({ username }) => {
  return (
    <div className='h-[150px] flex justify-center items-center'>
      <div>
        <h1 className='text-4xl'>{username}</h1>
      </div>
    </div>
  );
};
