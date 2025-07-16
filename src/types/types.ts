export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  employees: EmployeeDetails[];
  createdAt: string;
  updatedAt: string;
}

export interface EmployeeDetails {
  id: number;
  employeeNum: string;
  employedDate: string;
  terminatedDate?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateEmployeeDto {
  firstName: string;
  lastName: string;
  birthDate: string;
  employeeNum: string;
  employedDate: string;
  terminatedDate?: string | null;
}

export interface UpdateEmployeeDto extends CreateEmployeeDto {
  id: string;
  employeeNum: string;
}

export interface ApiResult<T> {
  success: boolean;
  message: string;
  data?: T;
  errors: string[];
  timestamp: string;
}
