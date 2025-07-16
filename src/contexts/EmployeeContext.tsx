import { createContext } from "react";
import type { Employee } from "../types/types";

export interface EmployeeContextType {
  selectedEmployee: Employee | null;
  setSelectedEmployee: (employee: Employee | null) => void;
}

export const EmployeeContext = createContext<EmployeeContextType | undefined>(
  undefined
);
