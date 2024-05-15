import { FC, useEffect, useState } from 'react';

import { ChatFooter } from '@/components/Chat/libs/components/ChatFooter';

import { messageService } from '../../api/services/message/message.service';
import { Events } from '../../api/socket/libs/events.enum';
import { socket } from '../../api/socket/socketInstance';
import { useLoading } from '../../hooks/useLoading';
import { useAppSelector } from '../../redux/hooks';
import { MessageList } from './libs/components/MessageList';
import './libs/styles/chat.scss';

type Props = {
  currentGroupId: number;
};

export const Chat: FC<Props> = ({ currentGroupId }) => {
  const user = useAppSelector((state) => state.user);
  const group = useAppSelector((state) => state.group);

  const [isSocketConnect, setIsScoketConnect] = useState(false);

  const fetchMessages = async () => {
    try {
      const { data: messages } = await messageService.getGroupMessages({ group: currentGroupId });

      return messages;
    } catch (error) {
      console.error('[Error while fetching the messages]', error);
    }
  };

  const { data: messagesListRes, loading, setData } = useLoading(fetchMessages, [currentGroupId]);

  const onGetMessage = (data: any) => {
    setData((prev: any) => {
      if (prev) return [...prev, data.content];
      return data.content;
    });
    console.log(data);
  };

  const onSendMessage = (message: string) => {
    socket.emit(Events.SET_NEW_MESSAGE, {
      groupId: currentGroupId,
      userId: user.user?.id,
      content: message,
    });
  };

  useEffect(() => {
    socket.emit(Events.ROOM_SET_CONNECT, { groupId: currentGroupId, userId: user.user?.id });
    socket.on(Events.ROOM_GET_CONNECT, () => {
      setIsScoketConnect(true);
    });

    socket.on(Events.GET_MESSAGE, onGetMessage);

    return () => {
      socket.off(Events.GET_MESSAGE, onGetMessage);
    };
  }, [currentGroupId]);

  if (loading || !isSocketConnect) return <div>Loading...</div>;

  return (
    <div className='flex grow flex-col relative chat  bg-[#bababa]'>
      <header className='bg-white text-gray-700 py-3 pl-5'>
        <h1 className='text-2xl font-semibold'>{group.currentGroup?.group_name}</h1>
      </header>

      {messagesListRes && (
        <MessageList messages={messagesListRes} userId={user.user?.id as number} />
      )}

      <ChatFooter handleSendMessage={onSendMessage} />
    </div>
  );
};
