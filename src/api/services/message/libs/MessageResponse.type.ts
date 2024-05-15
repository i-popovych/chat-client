import { Message } from '../../../../entities/Message';
import { User } from '../../user/libs/types/user.type';

export type MessageResponseItem = Message & { users: User };
