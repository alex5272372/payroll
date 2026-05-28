export interface EmployeeRequest {
  departmentId: number;
  personId: number;
}

export interface EmployeeResponse {
  id: number;
  departmentId: number;
  personId: number;
  firstName: string;
  lastName: string;
  departmentName: string;
}
