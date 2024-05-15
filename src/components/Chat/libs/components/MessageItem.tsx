import { FC } from 'react';

import { File } from 'entities/FIle';

import { FilesList } from '@/components/Chat/libs/components/FilesList';

type MessageItemProps = {
  isIncoming?: boolean;
  message: string;
  avatarSrc: string;
  files?: File[];
};

export const MessageItem: FC<MessageItemProps> = ({
  isIncoming = true,
  message,
  avatarSrc,
  files,
}) => {
  const containerClassName = `flex ${
    isIncoming ? 'justify-start' : 'justify-end'
  } mb-4 cursor-pointer`;

  const backgroundColor = isIncoming ? 'bg-white' : 'bg-[#6366f1]';

  const filesAlign = isIncoming ? 'flex-start' : 'flex-end';

  const isFiles = files && files.length > 0;

  return (
    <div className={containerClassName}>
      <div className='flex flex-col gap-3' style={{ alignItems: filesAlign }}>
        <div className='flex gap-2'>
          <div className={`w-9 h-9 rounded-full flex items-center justify-center`}>
            <img
              src={avatarSrc}
              alt={`${isIncoming ? 'User' : 'My'} Avatar`}
              className='w-8 h-8 rounded-full'
            />
          </div>
          <div className='flex flex-col gap-3'>
            <div
              className={`flex max-w-96 ${backgroundColor} ${isIncoming ? 'text-black' : 'text-white'} rounded-lg p-3 gap-3`}
            >
              <p>{message}</p>
            </div>
            {isFiles && <FilesList files={files} />}
          </div>
        </div>
      </div>
    </div>
  );
};
