import { FC, useEffect, useState } from 'react';
import { FaChevronDown } from 'react-icons/fa6';

import { AllUserListModal } from '@/components/Chat/libs/components/AllUserListModal';
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
  const [isAllUserModal, setIsAlluserModal] = useState(false);

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

  const onSendMessage = (message: string, files?: File[]) => {
    debugger;
    const sendObject = {
      groupId: currentGroupId,
      userId: user.user?.id,
      content: message,
    } as any;

    if (files && files.length) {
      sendObject['files'] = files.map((file) => ({ data: file, name: file.name }));
    }

    socket.emit(Events.SET_NEW_MESSAGE, sendObject);
  };

  const onSeeAllUserClick = () => {
    setIsAlluserModal((prev) => !prev);
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
      <header className='bg-white text-gray-700 py-3 pl-5 flex justify-between items-center'>
        <h1 className='text-2xl font-semibold'>{group.currentGroup?.group_name}</h1>
        <div
          onClick={onSeeAllUserClick}
          className='text-1xl font-semibold flex items-center gap-2 pr-5 hover:cursor-pointer hover:text-[blue]'
        >
          <div>120 online</div>
          <div>
            <FaChevronDown />
          </div>
        </div>
      </header>

      {messagesListRes && (
        <MessageList messages={messagesListRes} userId={user.user?.id as number} />
      )}

      <AllUserListModal
        currentGroupId={currentGroupId}
        handleClose={onSeeAllUserClick}
        isOpen={isAllUserModal}
      />

      <ChatFooter handleSendMessage={onSendMessage} />
    </div>
  );
};
