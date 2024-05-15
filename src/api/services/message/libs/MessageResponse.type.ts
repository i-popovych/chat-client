import { Message } from '../../../../entities/Message';
import { User } from '../../../../entities/User';

export type MessageResponseItem = Message & { users: User };
