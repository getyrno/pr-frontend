// src/app/models/message.model.ts
export interface Message {
  id: string;
  chatId: number;
  user_id: number;
  sender_nickname: string;
  content: string;
  sent_at: string;
}
