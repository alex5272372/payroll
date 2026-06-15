import type { UserRole } from '@/types/roleMatrix'

export interface UserResponse {
  id: number;
  email: string;
  personId: number;
  emailVerified: Date | null;
  firstName: string;
  lastName: string;
  roles: UserRole[];
}

export interface UserCreateRequest {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

export interface UserUpdateRequest {
  email: string;
  personId: number;
}
