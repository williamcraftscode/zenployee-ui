import { Grid, Card, Group, Text, ThemeIcon, Box } from "@mantine/core";
import { IconUsers, IconCalendar } from "@tabler/icons-react";
import { useEmployees } from "../../hooks/useEmployees";
import { LoadingSpinner } from "../ui/LoadingSpinner";
import { ErrorMessage } from "../ui/ErrorMessage";
import { formatDate } from "../../utils/formatters";

export const DashboardStats = () => {
  const { data: employeesResult, isLoading, error } = useEmployees();
  const employees = employeesResult?.data || [];

  const allEmployeeDetails = employees.flatMap((emp) => emp.employees || []);
  const recentEmployee = employees[0];
  const totalEmployees = employees.length;

  const getFirstHireDate = () => {
    return allEmployeeDetails.reduce((min, emp) =>
      new Date(emp.employedDate) < new Date(min.employedDate) ? emp : min
    ).employedDate;
  };

  const firstHireDate = allEmployeeDetails.length ? getFirstHireDate() : null;

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error || !employeesResult?.success) {
    return <ErrorMessage message="Failed to load dashboard data" />;
  }

  return (
    <Grid>
      <Grid.Col span={{ base: 12, md: 4 }}>
        <Card shadow="lg" padding="xl" radius="md" withBorder>
          <Group justify="space-between">
            <Box>
              <Text c="dimmed" size="sm" fw={700} truncate>
                Recent Employees
              </Text>
              <Text fw={700} size="xl">
                {recentEmployee
                  ? `${recentEmployee.firstName} ${recentEmployee.lastName}`
                  : "N/A"}
              </Text>
            </Box>
            <ThemeIcon color="yellow" size="xl" radius="md">
              <IconUsers size={28} />
            </ThemeIcon>
          </Group>
        </Card>
      </Grid.Col>

      <Grid.Col span={{ base: 12, md: 4 }}>
        <Card shadow="lg" padding="xl" radius="md" withBorder>
          <Group justify="space-between">
            <Box>
              <Text c="dimmed" size="sm" fw={700}>
                Total Employees
              </Text>
              <Text fw={700} size="xl">
                {totalEmployees}
              </Text>
            </Box>
            <ThemeIcon color="green" size="xl" radius="md">
              <IconUsers size={28} />
            </ThemeIcon>
          </Group>
        </Card>
      </Grid.Col>

      <Grid.Col span={{ base: 12, md: 4 }}>
        <Card shadow="lg" padding="xl" radius="md" withBorder>
          <Group justify="space-between">
            <Box>
              <Text c="dimmed" size="sm" fw={700}>
                First Hire
              </Text>
              <Text fw={700} size="xl">
                {firstHireDate ? formatDate(firstHireDate) : "-"}
              </Text>
            </Box>
            <ThemeIcon color="orange" size="xl" radius="md">
              <IconCalendar size={28} />
            </ThemeIcon>
          </Group>
        </Card>
      </Grid.Col>
    </Grid>
  );
};
