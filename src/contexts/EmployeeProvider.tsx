import { useState } from "react";
import { EmployeeContext } from "./EmployeeContext";
import type { Employee } from "../types/types";
import type { ReactNode } from "react";

interface EmployeeProviderProps {
  children: ReactNode;
}

export const EmployeeProvider = ({ children }: EmployeeProviderProps) => {
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  return (
    <EmployeeContext.Provider value={{ selectedEmployee, setSelectedEmployee }}>
      {children}
    </EmployeeContext.Provider>
  );
};
