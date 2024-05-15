import { FC, useState } from 'react';

type Props = {
  handleSendMessage: (message: string) => void;
};

export const ChatFooter: FC<Props> = ({ handleSendMessage }) => {
  const [message, setMessage] = useState('');

  const onChangeMessage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const onSendMessage = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    handleSendMessage(message);
    setMessage('');
  };

  return (
    <footer className='bg-white border-t border-gray-300  absolute bottom-0 w-full py-3 px-5'>
      <div className='flex items-center'>
        <input
          value={message}
          onChange={onChangeMessage}
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
  );
};
