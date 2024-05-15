import { File } from 'entities/FIle';

export interface Message {
  id: number;
  body: string;
  sender_id: number;
  group_id: number;
  files: File[];
  createdAt: string;
}
