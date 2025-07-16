import { Navigate, useParams } from "react-router-dom";
import { EmployeeProfile } from "../components/employees/EmployeeProfile";
import { useEmployeeContext } from "../hooks/useEmployeeContext";
import { useEmployee } from "../hooks/useEmployees";
import { ErrorMessage } from "../components/ui/ErrorMessage";
import { LoadingSpinner } from "../components/ui/LoadingSpinner";
import { ROUTES } from "../constants/routes";

export const ViewEmployeePage = () => {
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

  return <EmployeeProfile employee={employee} />;
};
