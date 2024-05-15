import { FC } from 'react';

import { getStaticRoute } from '@/helpers/static/getStaticRoute';

import { MessageResponseItem } from '../../../../api/services/message/libs/MessageResponse.type';
import { MessageItem } from './MessageItem';

type Props = {
  messages: MessageResponseItem[];
  userId: number;
};

export const MessageList: FC<Props> = ({ messages, userId }) => {
  return (
    <div className='h-screen overflow-y-auto p-4 pb-36'>
      {messages.map((messageItem) => {
        return (
          <MessageItem
            key={messageItem.id}
            isIncoming={messageItem.sender_id !== userId}
            message={messageItem.body}
            avatarSrc={getStaticRoute(messageItem.users.avatar)}
          />
        );
      })}
    </div>
  );
};
