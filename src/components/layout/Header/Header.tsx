import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { Logo } from '../../../assets/images';

type Props = {
  children: React.ReactNode;
};

export const Header: FC<Props> = ({ children }) => {
  const navigate = useNavigate();

  const onLogoClick = () => {
    navigate('/select-project');
  };

  return (
    <div className='h-[110px] px-2 bg-[#4a194e] flex'>
      <div
        onClick={onLogoClick}
        className='w-[60px]  flex justify-center items-center cursor-pointer'
      >
        <img src={Logo} alt='logo' className='w-[100px]' />
      </div>
      <div className='flex grow'>{children}</div>
    </div>
  );
};
