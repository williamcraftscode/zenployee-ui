import { useState } from "react";
import { Stack, Group, Text, Button, Grid, Pagination, Flex, ThemeIcon, Anchor, Breadcrumbs } from "@mantine/core";
import { IconUserPlus, IconUserStar } from "@tabler/icons-react";
import { Link, useNavigate } from "react-router-dom";
import { useEmployees } from "../../hooks/useEmployees";
import { LoadingSpinner } from "../ui/LoadingSpinner";
import { ErrorMessage } from "../ui/ErrorMessage";
import { EmployeeCard } from "./EmployeeCard";
import { ROUTES } from "../../constants/routes";

export const EmployeeList = () => {
  const { data, isLoading, error } = useEmployees();
  const [activePage, setActivePage] = useState(1);
  const navigate = useNavigate();
  const itemsPerPage = 6;

  const employees = data?.data || [];

  const totalPages = Math.ceil(employees.length / itemsPerPage);
  const startIndex = (activePage - 1) * itemsPerPage;
  const displayedEmployees = employees.slice(startIndex, startIndex + itemsPerPage);

  const breadcrumbs = [
    { title: "Dashboard", href: "/" },
    { title: "Employees", href: ROUTES.EMPLOYEES },
  ];

  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (error || !data?.success) {
    return <ErrorMessage message="Failed to load employees" />;
  }

  return (
    <Stack gap="md">
      <Group mb="md">
        <Breadcrumbs>
          {breadcrumbs.map((item, index) => (
            <Anchor
              key={index}
              href={item.href}
              onClick={(e) => {
                if (item.href !== "#") {
                  e.preventDefault();
                  navigate(item.href);
                }
              }}
              c={index === breadcrumbs.length - 1 ? "dimmed" : "blue"}
            >
              {item.title}
            </Anchor>
          ))}
        </Breadcrumbs>
      </Group>
      <Group justify="space-between">
        <Group>
          <ThemeIcon size="xl" color="blue" variant="light">
            <IconUserStar size={28} />
          </ThemeIcon>
          <Text fz="2rem" fw={700}>
            ACME |
          </Text>
          <Text variant="gradient" gradient={{ from: "blue", to: "teal" }} fz="2rem" fw={700}>
            Employees
          </Text>
        </Group>
      </Group>

      <Group justify="flex-end">
        <Button
          component={Link}
          to={ROUTES.ADD_EMPLOYEE}
          leftSection={<IconUserPlus size={16} />}
          variant="gradient"
          gradient={{ from: "blue", to: "purple" }}
        >
          Add Employee
        </Button>
      </Group>
      <Grid>
        {displayedEmployees.map((employee) => (
          <Grid.Col key={employee.id}>
            <EmployeeCard employee={employee} />
          </Grid.Col>
        ))}
      </Grid>

      {totalPages > 1 && (
        <Flex justify="center" mt="md">
          <Pagination value={activePage} onChange={setActivePage} total={totalPages} color="blue" />
        </Flex>
      )}
    </Stack>
  );
};
