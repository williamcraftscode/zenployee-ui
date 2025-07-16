import { Routes, Route } from "react-router-dom";
import { DashboardPage } from "../pages/DashboardPage";
import { EmployeesPage } from "../pages/EmployeesPage";
import { AddEmployeePage } from "../pages/AddEmployeePage";
import { EditEmployeePage } from "../pages/EditEmployeePage";
import { ROUTES } from "../constants/routes";
import { ViewEmployeePage } from "../pages/ViewEmployeePage";
import { Layout } from "../components/ui/Layout";

export const AppRouter = () => {
  return (
    <Layout>
      <Routes>
        <Route path={ROUTES.DASHBOARD} element={<DashboardPage />} />
        <Route path={ROUTES.EMPLOYEES} element={<EmployeesPage />} />
        <Route path={ROUTES.ADD_EMPLOYEE} element={<AddEmployeePage />} />
        <Route path={ROUTES.EDIT_EMPLOYEE} element={<EditEmployeePage />} />
        <Route path={ROUTES.VIEW_EMPLOYEE} element={<ViewEmployeePage />} />
      </Routes>
    </Layout>
  );
};
