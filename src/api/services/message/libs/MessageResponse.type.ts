import { Message } from '../../../../entities/Message';
import { User } from '../../../../entities/User';

export interface MessageResponseItem extends Message {
  users: User;
}
