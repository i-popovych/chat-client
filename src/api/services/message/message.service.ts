import $baseAPI from '../../axios';
import { GetMessageParams } from './libs/GetMesssageParams.type';
import {  MessageResponseItem } from './libs/MessageResponse.type';

class MessageService {
  getGroupMessages(params: GetMessageParams) {
    return $baseAPI.get<MessageResponseItem[]>('message', {
      params,
    });
  }
}

export const messageService = new MessageService();
