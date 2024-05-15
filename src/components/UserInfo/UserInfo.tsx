import { FC } from 'react';

type Props = {
  username: string;
};

export const UserInfo: FC<Props> = ({ username }) => {
  return (
    <div className='h-[150px] flex justify-center'>
      <div>
        <h1 className='text-2xl font-bold'>{username}</h1>
      </div>
    </div>
  );
};
