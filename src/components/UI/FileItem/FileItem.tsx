import { FC } from 'react';
import { FaFileAlt } from 'react-icons/fa';

import { getStaticFileRoute } from '@/helpers/static/getStaticRoute';

type Props = {
  fileName: string;
  filePath?: string;
};

export const FileItem: FC<Props> = ({ fileName, filePath }) => {
  const onClick = () => {
    if (!filePath) return;

    window.open(getStaticFileRoute(filePath), '_blank');
  };

  return (
    <div onClick={onClick} className='flex gap-2 items-center'>
      <div>
        <FaFileAlt size={24} />
      </div>
      <div>{fileName}</div>
    </div>
  );
};
