import type { Gender } from '@/types/enums'

export interface PersonRequest {
  firstName: string;
  lastName: string;
  middleName?: string | null;
  gender?: Gender | null;
  birthdate?: string | null;
}

export interface PersonResponse {
  id: number;
  firstName: string;
  lastName: string;
  middleName: string | null;
  gender: Gender | null;
  birthdate: Date | null;
}
