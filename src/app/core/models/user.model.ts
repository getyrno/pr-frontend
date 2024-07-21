// src/app/models/user.model.ts
export interface User {
  id: number;
  phone_number: string;
  username: string;
  password: string;
  avatar_url: string;
  nickname: string;
  status: string;
  last_seen: Date | null;
  isdeleted: boolean;
  created_at: Date;
  updated_at: Date;
}
