import {
  Card,
  Group,
  Avatar,
  Text,
  Badge,
  Stack,
  Box,
  Button,
  Paper,
  ThemeIcon,
  Grid,
  Timeline,
  Container,
  Title,
  Breadcrumbs,
  Anchor,
  Progress,
  Alert,
} from "@mantine/core";
import {
  IconCalendar,
  IconBriefcase,
  IconEditCircle,
  IconUser,
  IconHistory,
  IconArrowLeft,
  IconMail,
  IconPhone,
  IconInfoCircle,
  IconId,
  IconTimeline,
  IconTrash,
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import type { Employee } from "../../types/types";
import { formatDate, formatDateLong } from "../../utils/formatters";
import { useEmployeeContext } from "../../hooks/useEmployeeContext";
import { ROUTES } from "../../constants/routes";
import { calculateAge, calculateYearsOfService, getActiveRole, getRelativeUpdateTime } from "../../utils/employees";
import { useDeleteEmployee } from "../../hooks/useEmployees";

// Add relative time plugin
dayjs.extend(relativeTime);

interface EmployeeDetailsProps {
  employee: Employee;
}

export const EmployeeProfile = ({ employee }: EmployeeDetailsProps) => {
  const { setSelectedEmployee } = useEmployeeContext();
  const navigate = useNavigate();
  const activeEmployee = getActiveRole(employee.employees || []);

  const deleteEmployeeMutation = useDeleteEmployee();

  const handleEdit = () => {
    setSelectedEmployee(employee);
    navigate(`/employees/edit/${employee.id}`);
  };

  const handleDelete = () => {
    if (
      window.confirm(`Are you sure you want to delete ${employee.firstName} ${employee.lastName}? This action cannot be undone.`)
    ) {
      deleteEmployeeMutation.mutate(employee.id, {
        onSuccess: () => {
          navigate(ROUTES.EMPLOYEES);
        },
      });
    }
  };

  const handleBack = () => {
    navigate(ROUTES.EMPLOYEES);
  };

  const yearsOfService = calculateYearsOfService(activeEmployee);
  const age = calculateAge(employee);
  const isActive = !activeEmployee.terminatedDate;
  const totalEmployments = employee.employees.length;

  // Calculate service progress (0-10 years scale)
  const serviceProgress = Math.min((yearsOfService / 10) * 100, 100);

  const mockData = {
    email: `${employee.firstName.toLowerCase()}.${employee.lastName.toLowerCase()}@company.com`,
    phone: "+27 (063) 123-4567",
    address: "123 Main Path, Diagon Alley, Hogwarts 10001",
    department: "Quantity Surveying",
    position: "Builder Engineer",
    manager: "Tony Stark",
    nextReview: dayjs().add(3, "month").format("MMM D, YYYY"),
  };

  const breadcrumbs = [
    { title: "Dashboard", href: "/" },
    { title: "Employees", href: ROUTES.EMPLOYEES },
    { title: `${employee.firstName} ${employee.lastName}`, href: "#" },
  ];

  return (
    <Container size="lg" py="xl">
      <Stack gap="xl">
        {/* Breadcrumbs & Back Button */}
        <Group justify="space-between">
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

          <Button variant="light" leftSection={<IconArrowLeft size={16} />} onClick={handleBack}>
            Back to Employees
          </Button>
        </Group>

        {/* Header Card */}
        <Card shadow="lg" padding="xl" radius="xl" withBorder>
          <Group justify="space-between" mb="xl">
            <Group>
              <Avatar
                size={100}
                radius="xl"
                variant="gradient"
                gradient={{ from: "blue", to: "cyan", deg: 45 }}
                style={{
                  boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
                  border: "4px solid white",
                }}
              >
                <Text size="xl" fw={700} c="white">
                  {employee.firstName[0]}
                  {employee.lastName[0]}
                </Text>
              </Avatar>

              <Stack gap="xs">
                <Title order={1} size="h2">
                  {employee.firstName} {employee.lastName}
                </Title>
                <Text size="lg" c="dimmed" fw={500}>
                  {mockData.position} • {mockData.department}
                </Text>
                <Group gap="xs">
                  <Badge variant="light" color="gray" size="md">
                    ID #{activeEmployee.employeeNum}
                  </Badge>
                  {totalEmployments > 1 && (
                    <Badge variant="light" color="blue" size="md">
                      {totalEmployments} Employment Records
                    </Badge>
                  )}
                </Group>
              </Stack>
            </Group>

            <Stack align="flex-end" gap="md">
              <Badge
                size="xl"
                variant="gradient"
                gradient={isActive ? { from: "green", to: "lime", deg: 45 } : { from: "red", to: "pink", deg: 45 }}
                style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.15)" }}
              >
                {isActive ? "Active Employee" : "Terminated"}
              </Badge>

              <Button
                variant="gradient"
                gradient={{ from: "orange", to: "red", deg: 45 }}
                leftSection={<IconEditCircle size={18} />}
                radius="xl"
                size="md"
                onClick={handleEdit}
              >
                Edit Employee
              </Button>
            </Stack>
          </Group>

          {/* Quick Stats */}
          <Grid>
            <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
              <Paper p="md" bg="blue.0" radius="lg">
                <Group gap="sm">
                  <ThemeIcon variant="light" color="blue" size="lg" radius="xl">
                    <IconUser size={20} />
                  </ThemeIcon>
                  <Box>
                    <Text size="xs" c="dimmed" tt="uppercase" fw={600}>
                      Age
                    </Text>
                    <Text size="xl" fw={700} c="blue.7">
                      {age}
                    </Text>
                    <Text size="xs" c="dimmed">
                      years old
                    </Text>
                  </Box>
                </Group>
              </Paper>
            </Grid.Col>

            <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
              <Paper p="md" bg="green.0" radius="lg">
                <Group gap="sm">
                  <ThemeIcon variant="light" color="green" size="lg" radius="xl">
                    <IconBriefcase size={20} />
                  </ThemeIcon>
                  <Box>
                    <Text size="xs" c="dimmed" tt="uppercase" fw={600}>
                      Service
                    </Text>
                    <Text size="xl" fw={700} c="green.7">
                      {yearsOfService}
                    </Text>
                    <Text size="xs" c="dimmed">
                      years
                    </Text>
                  </Box>
                </Group>
              </Paper>
            </Grid.Col>

            <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
              <Paper p="md" bg="orange.0" radius="lg">
                <Group gap="sm">
                  <ThemeIcon variant="light" color="orange" size="lg" radius="xl">
                    <IconCalendar size={20} />
                  </ThemeIcon>
                  <Box>
                    <Text size="xs" c="dimmed" tt="uppercase" fw={600}>
                      Hired
                    </Text>
                    <Text size="sm" fw={700} c="orange.7">
                      {formatDate(activeEmployee.employedDate)}
                    </Text>
                    <Text size="xs" c="dimmed">
                      start date
                    </Text>
                  </Box>
                </Group>
              </Paper>
            </Grid.Col>

            <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
              <Paper p="md" bg="violet.0" radius="lg">
                <Group gap="sm">
                  <ThemeIcon variant="light" color="violet" size="lg" radius="xl">
                    <IconHistory size={20} />
                  </ThemeIcon>
                  <Box>
                    <Text size="xs" c="dimmed" tt="uppercase" fw={600}>
                      Updated
                    </Text>
                    <Text size="sm" fw={700} c="violet.7">
                      {getRelativeUpdateTime(activeEmployee)}
                    </Text>
                    <Text size="xs" c="dimmed">
                      last modified
                    </Text>
                  </Box>
                </Group>
              </Paper>
            </Grid.Col>
          </Grid>
        </Card>

        {/* Main Content Grid */}
        <Grid>
          {/* Left Column */}
          <Grid.Col span={{ base: 12, md: 8 }}>
            <Stack gap="lg">
              {/* Personal Info */}
              <Card shadow="md" padding="lg" radius="lg" withBorder>
                <Stack gap="md">
                  <Group gap="sm" mb="md">
                    <ThemeIcon variant="light" color="blue" size="lg" radius="xl">
                      <IconUser size={20} />
                    </ThemeIcon>
                    <Title order={3}>Personal Information</Title>
                  </Group>

                  <Grid>
                    <Grid.Col span={6}>
                      <Box>
                        <Text size="sm" c="dimmed" fw={500}>
                          Date of Birth
                        </Text>
                        <Text size="lg" fw={600}>
                          {formatDateLong(employee.birthDate)}
                        </Text>
                      </Box>
                    </Grid.Col>
                    <Grid.Col span={6}>
                      <Box>
                        <Text size="sm" c="dimmed" fw={500}>
                          Age
                        </Text>
                        <Text size="lg" fw={600}>
                          {age} years old
                        </Text>
                      </Box>
                    </Grid.Col>
                    <Grid.Col span={6}>
                      <Box>
                        <Text size="sm" c="dimmed" fw={500}>
                          Email Address
                        </Text>
                        <Text size="lg" fw={600}>
                          {mockData.email}
                        </Text>
                      </Box>
                    </Grid.Col>
                    <Grid.Col span={6}>
                      <Box>
                        <Text size="sm" c="dimmed" fw={500}>
                          Phone Number
                        </Text>
                        <Text size="lg" fw={600}>
                          {mockData.phone}
                        </Text>
                      </Box>
                    </Grid.Col>
                    <Grid.Col span={12}>
                      <Box>
                        <Text size="sm" c="dimmed" fw={500}>
                          Address
                        </Text>
                        <Text size="lg" fw={600}>
                          {mockData.address}
                        </Text>
                      </Box>
                    </Grid.Col>
                  </Grid>
                </Stack>
              </Card>

              {/* Employment Info */}
              <Card shadow="md" padding="lg" radius="lg" withBorder>
                <Stack gap="md">
                  <Group gap="sm" mb="md">
                    <ThemeIcon variant="light" color="green" size="lg" radius="xl">
                      <IconBriefcase size={20} />
                    </ThemeIcon>
                    <Title order={3}>Employment Details</Title>
                  </Group>

                  <Grid>
                    <Grid.Col span={6}>
                      <Box>
                        <Text size="sm" c="dimmed" fw={500}>
                          Position
                        </Text>
                        <Text size="lg" fw={600}>
                          {mockData.position}
                        </Text>
                      </Box>
                    </Grid.Col>
                    <Grid.Col span={6}>
                      <Box>
                        <Text size="sm" c="dimmed" fw={500}>
                          Department
                        </Text>
                        <Text size="lg" fw={600}>
                          {mockData.department}
                        </Text>
                      </Box>
                    </Grid.Col>
                    <Grid.Col span={6}>
                      <Box>
                        <Text size="sm" c="dimmed" fw={500}>
                          Direct Manager
                        </Text>
                        <Text size="lg" fw={600}>
                          {mockData.manager}
                        </Text>
                      </Box>
                    </Grid.Col>
                    <Grid.Col span={6}>
                      <Box>
                        <Text size="sm" c="dimmed" fw={500}>
                          Start Date
                        </Text>
                        <Text size="lg" fw={600}>
                          {formatDateLong(activeEmployee.employedDate)}
                        </Text>
                      </Box>
                    </Grid.Col>
                    <Grid.Col span={6}>
                      <Box>
                        <Text size="sm" c="dimmed" fw={500}>
                          Years of Service
                        </Text>
                        <Text size="lg" fw={600}>
                          {yearsOfService} {yearsOfService === 1 ? "year" : "years"}
                        </Text>
                      </Box>
                    </Grid.Col>
                  </Grid>

                  {/* Service Progress */}
                  <Box mt="md">
                    <Group justify="space-between" mb="xs">
                      <Text size="sm" fw={500}>
                        Career Progress
                      </Text>
                      <Text size="sm" c="dimmed">
                        {yearsOfService}/20+ years
                      </Text>
                    </Group>
                    <Progress
                      value={serviceProgress}
                      color="green"
                      size="lg"
                      radius="xl"
                      style={{ boxShadow: "inset 0 2px 4px rgba(0,0,0,0.1)" }}
                    />
                  </Box>

                  {activeEmployee.terminatedDate && (
                    <Alert icon={<IconInfoCircle size={16} />} title="Employment Terminated" color="red" variant="light">
                      This employee was terminated on {formatDateLong(activeEmployee.terminatedDate)}.
                    </Alert>
                  )}
                </Stack>
              </Card>

              {/* Employment History Timeline */}
              {totalEmployments > 1 && (
                <Card shadow="md" padding="lg" radius="lg" withBorder>
                  <Group gap="sm" mb="lg">
                    <ThemeIcon variant="light" color="indigo" size="lg" radius="xl">
                      <IconTimeline size={20} />
                    </ThemeIcon>
                    <Title order={3}>Employment History</Title>
                    <Badge variant="light" color="indigo">
                      {totalEmployments} Records
                    </Badge>
                  </Group>

                  <Timeline active={0} bulletSize={24} lineWidth={2}>
                    {employee.employees
                      .sort((a, b) => dayjs(b.employedDate).unix() - dayjs(a.employedDate).unix())
                      .map((emp) => (
                        <Timeline.Item key={emp.id} bullet={<IconBriefcase size={12} />} title={`Employment #${emp.employeeNum}`}>
                          <Text size="sm" c="dimmed">
                            {formatDate(emp.employedDate)} - {emp.terminatedDate ? formatDate(emp.terminatedDate) : "Present"}
                          </Text>
                          <Text size="xs" c="dimmed" mt={4}>
                            {emp.terminatedDate ? "Terminated" : "Active"} • Created {formatDate(emp.createdAt)}
                          </Text>
                        </Timeline.Item>
                      ))}
                  </Timeline>
                </Card>
              )}
            </Stack>
          </Grid.Col>

          {/* Right Column - Sidebar */}
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Stack gap="lg">
              {/* Record Information */}
              <Card shadow="md" padding="lg" radius="lg" withBorder>
                <Group gap="sm" mb="md">
                  <ThemeIcon variant="light" color="orange" size="lg" radius="xl">
                    <IconId size={20} />
                  </ThemeIcon>
                  <Title order={4}>Record Details</Title>
                </Group>

                <Stack gap="md">
                  <Box>
                    <Text size="sm" c="dimmed" fw={500}>
                      Employee ID
                    </Text>
                    <Text size="md" fw={600}>
                      {activeEmployee.employeeNum}
                    </Text>
                  </Box>
                  <Box>
                    <Text size="sm" c="dimmed" fw={500}>
                      System ID
                    </Text>
                    <Text size="md" fw={600} style={{ wordBreak: "break-all" }}>
                      {employee.id}
                    </Text>
                  </Box>
                  <Box>
                    <Text size="sm" c="dimmed" fw={500}>
                      Record Created
                    </Text>
                    <Text size="md" fw={600}>
                      {formatDate(activeEmployee.createdAt)}
                    </Text>
                  </Box>
                  <Box>
                    <Text size="sm" c="dimmed" fw={500}>
                      Last Updated
                    </Text>
                    <Text size="md" fw={600}>
                      {getRelativeUpdateTime(activeEmployee)}
                    </Text>
                  </Box>
                </Stack>
              </Card>

              {/* Quick Actions */}
              <Card shadow="md" padding="lg" radius="lg" withBorder>
                <Title order={4} mb="md">
                  Quick Actions
                </Title>
                <Stack gap="sm">
                  <Button variant="light" color="blue" fullWidth leftSection={<IconMail size={16} />}>
                    Send Email
                  </Button>
                  <Button variant="light" color="green" fullWidth leftSection={<IconPhone size={16} />}>
                    Call Employee
                  </Button>
                  <Button variant="light" color="orange" fullWidth leftSection={<IconCalendar size={16} />}>
                    Meet
                  </Button>

                  <Button
                    variant="light"
                    color="red"
                    fullWidth
                    leftSection={<IconTrash size={16} />}
                    onClick={handleDelete}
                    loading={deleteEmployeeMutation.isLoading}
                  >
                    Delete Employee
                  </Button>
                </Stack>
              </Card>
            </Stack>
          </Grid.Col>
        </Grid>
      </Stack>
    </Container>
  );
};
