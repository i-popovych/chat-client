import { useEffect } from 'react';

import { socket } from '../api/socket/socketInstance';

export const useSocket = () => {
  useEffect(() => {
    function onConnect() {
      console.log('Connected');
    }

    function onDisconnect() {
      console.log('Disconnected');
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
    };
  }, []);
};
