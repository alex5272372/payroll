import type { Role } from '@prisma/client'

export interface UserResponse {
  id: number;
  email: string;
  personId: number;
  emailVerified: Date | null;
  firstName: string;
  lastName: string;
  roles: Role[];
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
