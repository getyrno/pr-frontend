// src/app/models/group-chat.model.ts
export interface GroupChat {
  id: number;
  name: string;
  avatar_url: string;
  user_ids: number[];
  created_at: Date;
}
