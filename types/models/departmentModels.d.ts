export interface DepartmentRequest {
  name: string;
  companyId: number;
  countryCode: string;
}

export interface DepartmentResponse {
  id: number;
  name: string;
  companyId: number;
  countryCode: string;
  companyName: string;
}
