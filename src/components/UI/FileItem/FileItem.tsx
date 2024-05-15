import { FC } from 'react';
import { FaFileAlt } from 'react-icons/fa';

type Props = {
  fileName: string;
};

export const FileItem: FC<Props> = ({ fileName }) => {
  return (
    <div className='flex gap-2 items-center'>
      <div>
        <FaFileAlt size={24} />
      </div>
      <div>{fileName}</div>
    </div>
  );
};
