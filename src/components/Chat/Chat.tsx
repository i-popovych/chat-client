import { FC, useEffect, useState } from 'react';

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
  const [isSocketConnect, setIsScoketConnect] = useState(false);
  const [message, setMessage] = useState('');

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

  useEffect(() => {
    socket.emit(Events.ROOM_SET_CONNECT, { groupId: currentGroupId, userId: user.user?.id });
    socket.on(Events.ROOM_GET_CONNECT, (data) => {
      setIsScoketConnect(true);
    });

    socket.on(Events.GET_MESSAGE, onGetMessage);

    return () => {
      socket.off(Events.GET_MESSAGE, onGetMessage);
    };
  }, [currentGroupId]);

  const onSendMessage = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    socket.emit(Events.SET_NEW_MESSAGE, {
      groupId: currentGroupId,
      userId: user.user?.id,
      content: message,
    });
  };

  if (loading || !isSocketConnect) return <div>Loading...</div>;

  return (
    <div className='flex grow flex-col relative chat py-2 bg-[#bababa]'>
      <header className='bg-white p-4 text-gray-700'>
        <h1 className='text-2xl font-semibold'>{user.user?.username}</h1>
      </header>

      {messagesListRes && (
        <MessageList messages={messagesListRes} userId={user.user?.id as number} />
      )}

      <footer className='bg-white border-t border-gray-300 py-2 absolute bottom-1 w-full'>
        <div className='flex items-center'>
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            type='text'
            placeholder='Type a message...'
            className='w-full p-2 rounded-md border border-gray-400 focus:outline-none focus:border-blue-500'
          />
          <button
            className='bg-indigo-500 text-white px-4 py-2 rounded-md ml-2'
            onClick={onSendMessage}
          >
            Send
          </button>
        </div>
      </footer>
    </div>
  );
};
