import { FC } from 'react';

import { Logo } from '../../../assets/images';

type Props = {
  children: React.ReactNode;
};

export const Header: FC<Props> = ({ children }) => {
  return (
    <div className='h-[150px] px-2 bg-[#4a194e] flex'>
      <div className='w-[60px]  flex justify-center items-center'>
        <img src={Logo} alt='logo' className='w-[100px]' />
      </div>
      <div className='flex grow'>{children}</div>
    </div>
  );
};
