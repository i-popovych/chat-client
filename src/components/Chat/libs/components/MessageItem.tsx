import { FC } from 'react';

type MessageItemProps = {
  isIncoming?: boolean;
  message: string;
  avatarSrc: string;
};

export const MessageItem: FC<MessageItemProps> = ({ isIncoming = true, message, avatarSrc }) => {
  const containerClassName = `flex ${
    isIncoming ? 'justify-start' : 'justify-end'
  } mb-4 cursor-pointer`;

  const backgroundColor = isIncoming ? 'white' : '[#6366f1]';

  return (
    <div className={containerClassName}>
      <div className='flex gap-2'>
        <div className={`w-9 h-9 rounded-full flex items-center justify-center`}>
          <img
            src={avatarSrc}
            alt={`${isIncoming ? 'User' : 'My'} Avatar`}
            className='w-8 h-8 rounded-full'
          />
        </div>
        <div
          className={`flex max-w-96 bg-${backgroundColor} ${isIncoming ? 'text-black' : 'text-white'} rounded-lg p-3 gap-3`}
        >
          <p>{message}</p>
        </div>
      </div>
    </div>
  );
};
