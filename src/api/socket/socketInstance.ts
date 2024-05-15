import { io } from 'socket.io-client';

// todo: process
const URL = 'ws://localhost:7000';

export const socket = io(URL, { transports: ['websocket'], upgrade: false });
