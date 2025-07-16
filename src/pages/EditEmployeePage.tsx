import { useParams, Navigate } from "react-router-dom";
import { EmployeeForm } from "../components/employees/EmployeeForm";
import { useEmployee } from "../hooks/useEmployees";
import { LoadingSpinner } from "../components/ui/LoadingSpinner";
import { ErrorMessage } from "../components/ui/ErrorMessage";
import { ROUTES } from "../constants/routes";
import { useEmployeeContext } from "../hooks/useEmployeeContext";

export const EditEmployeePage = () => {
  const { id } = useParams<{ id: string }>();
  const { selectedEmployee } = useEmployeeContext();
  const { data, isLoading, error } = useEmployee(id || "");

  if (!id) {
    return <Navigate to={ROUTES.EMPLOYEES} replace />;
  }

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error || !data?.success) {
    return <ErrorMessage message="Failed to load employee data" />;
  }

  const employee = selectedEmployee || data.data;

  if (!employee) {
    return <Navigate to={ROUTES.EMPLOYEES} replace />;
  }

  return <EmployeeForm employee={employee} />;
};
