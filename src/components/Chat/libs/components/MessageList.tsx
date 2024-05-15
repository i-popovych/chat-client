import { FC } from 'react';

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
            avatarSrc='https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato'
          />
        );
      })}
    </div>
  );
};
