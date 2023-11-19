import { Role } from './auth.service';

export interface IUserModel {
  id: number;
  username: string;
  avatarUrl: string;
  bannedAt: Date;
  verifiedAt: Date;
  createdAt: Date;
  role: Role;
  name: string;
  email: string;
  isVerified: boolean;
}
