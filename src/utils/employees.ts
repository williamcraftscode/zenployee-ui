import dayjs from "dayjs";
import type { Employee, EmployeeDetails } from "../types/types";

export const calculateYearsOfService = (employeeDetails: EmployeeDetails) => {
  if (!employeeDetails.employedDate) return 0;

  const hiredDate = dayjs(employeeDetails.employedDate);
  if (!hiredDate.isValid()) return 0;

  return Math.max(0, dayjs().diff(hiredDate, "year"));
};

export const getRelativeUpdateTime = (employeeDetails: EmployeeDetails) => {
  if (!employeeDetails.updatedAt) return "Unknown";

  const lastUpdate = dayjs(employeeDetails.updatedAt);
  if (!lastUpdate.isValid()) return "Unknown";

  return lastUpdate.fromNow();
};

export const calculateAge = (employee: Employee) => {
  if (!employee.birthDate) return 0;
  const birthDate = dayjs(employee.birthDate);
  if (!birthDate.isValid()) return 0;
  return Math.max(0, dayjs().diff(birthDate, "year"));
};

export const getActiveRole = (employees: EmployeeDetails[]) => {
  return employees.find((emp) => !emp.terminatedDate) || employees[0];
};
