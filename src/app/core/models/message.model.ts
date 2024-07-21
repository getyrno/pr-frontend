// src/app/models/message.model.ts
export interface Message {
  id: number;
  chat_id: number;
  user_id: number;
  sender_nickname: string;
  content: string;
  sent_at: Date;
  is_read: boolean;
  is_deleted: boolean;
}
