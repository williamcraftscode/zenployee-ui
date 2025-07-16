import { Stack, NavLink } from "@mantine/core";
import { IconDashboard, IconUserPlus, IconUsers } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../constants/routes";

const navLinkStyles = {
  label: {
    transition: "color 80ms ease",
  },
};

export const Navigation: React.FC = () => {
  return (
    <Stack gap="0">
      <NavLink
        component={Link}
        to={ROUTES.DASHBOARD}
        label="Dashboard"
        variant="filled"
        color="teal"
        p="md"
        leftSection={<IconDashboard size={20} />}
        active={location.pathname === ROUTES.DASHBOARD}
        styles={navLinkStyles}
      />
      <NavLink
        component={Link}
        to={ROUTES.EMPLOYEES}
        label="Employees"
        variant="filled"
        color="teal"
        p="md"
        leftSection={<IconUsers size={20} />}
        active={location.pathname === ROUTES.EMPLOYEES}
        styles={navLinkStyles}
      />
      <NavLink
        component={Link}
        to={ROUTES.ADD_EMPLOYEE}
        label="Add Employee"
        variant="filled"
        color="teal"
        p="md"
        leftSection={<IconUserPlus size={20} />}
        active={location.pathname === ROUTES.ADD_EMPLOYEE}
        styles={navLinkStyles}
      />
    </Stack>
  );
};
