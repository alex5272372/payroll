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
