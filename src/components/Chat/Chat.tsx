import { FC, useEffect, useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { FaChevronDown } from 'react-icons/fa6';

import { User } from 'entities/User';

import { groupService } from '@/api/services/group/group.service';
import { MessageResponseItem } from '@/api/services/message/libs/MessageResponse.type';
import { ChatFooter } from '@/components/Chat/libs/components/ChatFooter';
import { UserListPopup } from '@/components/Chat/libs/components/UserListPopup';
import { GetMessage } from '@/components/Chat/libs/types/GetMessage.type';
import { getRandomInt } from '@/helpers/getRandomInt';
import { Notification } from '@/packages/notification';

import { messageService } from '../../api/services/message/message.service';
import { Events } from '../../api/socket/libs/events.enum';
import { socket } from '../../api/socket/socketInstance';
import { Message } from '../../entities/Message';
import { useLoading } from '../../hooks/useLoading';
import { useAppSelector } from '../../redux/hooks';
import { MessageList } from './libs/components/MessageList';
import './libs/styles/chat.scss';

type Props = {
  currentGroupId: number;
};

const ONLINE = getRandomInt(10, 25);

export const Chat: FC<Props> = ({ currentGroupId }) => {
  const user = useAppSelector((state) => state.user);
  const group = useAppSelector((state) => state.group);

  const [isSocketConnect, setIsSocketConnect] = useState(false);
  const [isAddUserPopup, setIsAddUserPopup] = useState(false);

  const [userOnlineCount, setUserOnlineCount] = useState(0);

  const fetchMessages = async () => {
    try {
      const { data: messages } = await messageService.getGroupMessages({ group: currentGroupId });

      return messages;
    } catch (error) {
      console.error('[Error while fetching the messages]', error);
    }
  };

  const { data: messagesListRes, loading, setData } = useLoading(fetchMessages, [currentGroupId]);

  const onGetMessage = (data: GetMessage) => {
    setData((prev: MessageResponseItem[]) => {
      const message: Message = { ...data.message, files: [...data.files] };

      const obj: MessageResponseItem = {
        ...message,
        users: data.users,
      };

      if (prev) return [...prev, obj];
      return obj;
    });
  };

  const onSendMessage = (message: string, files?: File[]) => {
    const sendObject = {
      groupId: currentGroupId,
      content: message,
    } as any;

    if (files && files.length) {
      sendObject['files'] = files.map((file) => ({ data: file, name: file.name }));
    }

    socket.emit(Events.SET_NEW_MESSAGE, sendObject);
  };

  const onSeeAllUserClick = () => {
    setIsAddUserPopup((prev) => !prev);
  };

  const onAddUserToGroup = async (user: User) => {
    try {
      await groupService.addUserToGroup({ group_id: currentGroupId, user_id: user.id });

      Notification.success('User added to group');

      setIsAddUserPopup(false);
    } catch (e) {
      console.error('[Error while adding user to group]', e);
    }
  };

  useEffect(() => {
    socket.emit(Events.ROOM_SET_CONNECT, { groupId: currentGroupId });
    socket.on(Events.ROOM_GET_CONNECT, () => {
      setIsSocketConnect(true);
    });

    socket.on(Events.GET_USERS_ONLINE_COUNT, (data: { userOnlineCount: number }) => {
      setUserOnlineCount(data.userOnlineCount);
    });

    socket.on(Events.GET_MESSAGE, onGetMessage);

    return () => {
      socket.off(Events.ROOM_GET_CONNECT);
      socket.off(Events.GET_USERS_ONLINE_COUNT);
      socket.off(Events.GET_MESSAGE, onGetMessage);
    };
  }, [currentGroupId]);

  if (loading || !isSocketConnect) return <div>Loading...</div>;

  return (
    <div className='flex grow flex-col relative chat  bg-[#bababa]'>
      <header className='bg-white text-gray-700 py-3 pl-5 flex justify-between items-center'>
        <h1 className='text-2xl font-semibold'>{group.currentGroup?.group_name}</h1>
        <div className='flex gap-4 items-baseline'>
          <div className='mt-2 flex items-center text-1xl  gap-2 '>
            <div>
              <AiOutlinePlus />
            </div>
            <div>
              <span onClick={onSeeAllUserClick} className='cursor-pointer'>
                Add user to group
              </span>
            </div>
          </div>
          <div
            onClick={onSeeAllUserClick}
            className='text-1xl font-semibold flex items-center gap-2 pr-5 hover:cursor-pointer hover:text-[blue]'
          >
            <div>{ONLINE} online</div>
            <div>
              <FaChevronDown />
            </div>
          </div>
        </div>
      </header>

      {messagesListRes && (
        <MessageList messages={messagesListRes} userId={user.user?.id as number} />
      )}

      <UserListPopup
        projectId={currentGroupId}
        handleClose={onSeeAllUserClick}
        isOpen={isAddUserPopup}
        handleUserClick={onAddUserToGroup}
        header='Add user to group'
      />

      <ChatFooter handleSendMessage={onSendMessage} />
    </div>
  );
};
