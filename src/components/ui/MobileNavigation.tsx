import { Paper, Group, UnstyledButton, Text } from "@mantine/core";
import { IconDashboard, IconSend, IconUserPlus } from "@tabler/icons-react";
import { Link, useLocation } from "react-router-dom";

const bottomNavItems = [
  { id: "dashboard", label: "Dashboard", icon: IconDashboard, path: "/" },
  { id: "employees", label: "Employees", icon: IconSend, path: "/employees" },
  { id: "add", label: "Add", icon: IconUserPlus, path: "/employees/add" },
];

export const MobileNavigation: React.FC = () => {
  const location = useLocation();

  return (
    <Paper
      shadow="lg"
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        borderTop: "1px solid var(--mantine-color-gray-3)",
      }}
    >
      <Group justify="space-around" p="sm">
        {bottomNavItems.map((item) => {
          const isActive =
            location.pathname === item.path ||
            (item.path === "/" && location.pathname === "/dashboard");

          return (
            <UnstyledButton
              key={item.id}
              component={Link}
              to={item.path}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "8px 16px",
                borderRadius: "8px",
                minWidth: "60px",
                backgroundColor: isActive
                  ? "var(--mantine-color-blue-0)"
                  : "transparent",
              }}
            >
              <item.icon
                size={20}
                color={
                  isActive
                    ? "var(--mantine-color-blue-6)"
                    : "var(--mantine-color-gray-6)"
                }
              />
              <Text
                size="xs"
                c={isActive ? "blue" : "dimmed"}
                mt={4}
                fw={isActive ? 600 : 400}
              >
                {item.label}
              </Text>
            </UnstyledButton>
          );
        })}
      </Group>
    </Paper>
  );
};
