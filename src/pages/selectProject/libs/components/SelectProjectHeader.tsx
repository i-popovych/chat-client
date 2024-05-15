import { FC } from 'react';

import { Header } from '../../../../components/layout/Header/Header';

type Props = {
  children: React.ReactNode;
};

export const SelectProjectHeader: FC<Props> = ({ children }) => {
  return (
    <>
      <Header>
        <div className='flex gap-7 items-center ml-5'>
          <div className='text-xl text-white cursor-pointer hover:shadow-sm hover:underline'>
            <span>Create Project</span>
          </div>
          <div className='text-xl text-white cursor-pointer hover:shadow-sm hover:underline'>
            <span>Join to the Project</span>
          </div>
        </div>
      </Header>
      {children}
    </>
  );
};
