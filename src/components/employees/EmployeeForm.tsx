import {
  Title,
  Stack,
  Grid,
  TextInput,
  Group,
  Button,
  Container,
  Breadcrumbs,
  Anchor,
  Divider,
  ThemeIcon,
  Box,
  Card,
  Alert,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { IconUser, IconCalendar, IconBriefcase, IconDeviceFloppy, IconX, IconInfoCircle, IconId } from "@tabler/icons-react";

import type { Employee } from "../../types/types";
import { useCreateEmployee, useUpdateEmployee } from "../../hooks/useEmployees";
import { ROUTES } from "../../constants/routes";
import { getActiveRole } from "../../utils/employees";

interface EmployeeFormProps {
  employee?: Employee;
}

export const EmployeeForm = ({ employee }: EmployeeFormProps) => {
  const navigate = useNavigate();
  const createMutation = useCreateEmployee();
  const updateMutation = useUpdateEmployee();
  const isEditing = !!employee;

  const activeEmployee = employee ? getActiveRole(employee.employees || []) : null;

  const form = useForm<{
    firstName: string;
    lastName: string;
    birthDate: Date | undefined;
    employeeNum: string;
    employedDate: Date | undefined;
    terminatedDate: Date | null;
  }>({
    initialValues: {
      firstName: employee?.firstName || "",
      lastName: employee?.lastName || "",
      birthDate: employee?.birthDate ? new Date(employee.birthDate) : undefined,
      employeeNum: activeEmployee?.employeeNum || "",
      employedDate: activeEmployee?.employedDate ? new Date(activeEmployee.employedDate) : undefined,
      terminatedDate: activeEmployee?.terminatedDate ? new Date(activeEmployee.terminatedDate) : null,
    },
    validate: {
      firstName: (value) => {
        if (value.length < 2) return "First name must be at least 2 characters";
        if (!/^[A-Za-z\s]+$/.test(value)) return "First name can only contain letters and spaces";
        return null;
      },
      lastName: (value) => {
        if (value.length < 2) return "Last name must be at least 2 characters";
        if (!/^[A-Za-z\s]+$/.test(value)) return "Last name can only contain letters and spaces";
        return null;
      },
      employeeNum: (value) => {
        if (value.length < 3) return "Employee number must be at least 3 characters";
        if (!/^[A-Z0-9]+$/.test(value)) return "Employee number can only contain uppercase letters and numbers";
        return null;
      },
      birthDate: (value) => {
        if (!value) return "Birth date is required";

        const birthDate = dayjs(value);
        const today = dayjs();

        if (birthDate.isAfter(today, "day")) {
          return "Birth date must be in the past";
        }

        return null;
      },
      employedDate: (value) => {
        if (!value) return "Employed date is required";

        const employedDate = dayjs(value);
        const today = dayjs();

        if (employedDate.isAfter(today, "day")) {
          return "Employed date cannot be in the future";
        }

        const companyFoundingYear = 1961;
        const companyFounding = dayjs().year(companyFoundingYear).startOf("year");
        if (employedDate.isBefore(companyFounding, "day")) {
          return `Employed date cannot be before ${companyFoundingYear}`;
        }

        return null;
      },
      terminatedDate: (value, values) => {
        if (!value) return null;

        const terminatedDate = dayjs(value);
        const today = dayjs();
        const employedDate = dayjs(values.employedDate);

        if (terminatedDate.isAfter(today, "day")) {
          return "Terminated date cannot be in the future";
        }

        if (terminatedDate.isBefore(employedDate, "day")) {
          return "Terminated date cannot be before employed date";
        }

        return null;
      },
    },
    validateInputOnChange: true,
  });

  const handleSubmit = (values: typeof form.values) => {
    const errors = form.validate();
    if (errors.hasErrors) return;

    const submitData = {
      firstName: values.firstName,
      lastName: values.lastName,
      birthDate: values.birthDate ? new Date(values.birthDate).toISOString() : new Date().toISOString(),
      employedDate: values.employedDate ? new Date(values.employedDate).toISOString() : new Date().toISOString(),
      terminatedDate: values.terminatedDate ? new Date(values.terminatedDate).toISOString() : null,
      employeeNum: values.employeeNum,
    };

    if (isEditing) {
      updateMutation.mutate(
        {
          id: employee.id,
          data: {
            ...submitData,
            id: employee.id,
            employeeNum: values.employeeNum,
          },
        },
        {
          onSuccess: () => navigate(ROUTES.EMPLOYEES),
        }
      );
    } else {
      createMutation.mutate(submitData, {
        onSuccess: () => navigate(ROUTES.EMPLOYEES),
      });
    }
  };

  const handleCancel = () => {
    navigate(ROUTES.EMPLOYEES);
  };

  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  const breadcrumbs = [
    { title: "Dashboard", href: "/" },
    { title: "Employees", href: ROUTES.EMPLOYEES },
    { title: isEditing ? "Edit Employee" : "Add Employee", href: "#" },
  ];

  return (
    <Container size="md" py="xl">
      <Stack gap="xl">
        {/* Header */}
        <Group>
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

        {/* Form Header */}
        <Card shadow="lg" padding="xl" radius="xl" withBorder>
          <Group gap="md">
            <ThemeIcon
              size={60}
              radius="xl"
              variant="gradient"
              gradient={{
                from: isEditing ? "orange" : "blue",
                to: isEditing ? "red" : "cyan",
                deg: 45,
              }}
            >
              {<IconUser size={30} />}
            </ThemeIcon>
            <Box>
              <Title order={1} size="h2">
                {isEditing ? "Edit Employee" : "Add New Employee"}
              </Title>
              <Group gap="xs" mt="xs">
                {isEditing && employee && (
                  <>
                    <Box>
                      <Title order={4} c="dimmed">
                        {employee.firstName} {employee.lastName}
                      </Title>
                    </Box>
                  </>
                )}
              </Group>
            </Box>
          </Group>
        </Card>

        {/* Form Content */}
        <Card shadow="lg" padding="xl" radius="xl" withBorder>
          <Stack gap="xl">
            {/* Personal Info Section */}
            <Box>
              <Group gap="sm" mb="lg">
                <ThemeIcon variant="light" color="blue" size="lg" radius="xl">
                  <IconUser size={20} />
                </ThemeIcon>
                <Title order={3}>Personal Information</Title>
              </Group>

              <Stack gap="md">
                <Grid>
                  <Grid.Col span={{ base: 12, sm: 6 }}>
                    <TextInput
                      label="First Name"
                      placeholder="Enter first name"
                      required
                      size="md"
                      {...form.getInputProps("firstName")}
                    />
                  </Grid.Col>
                  <Grid.Col span={{ base: 12, sm: 6 }}>
                    <TextInput
                      label="Last Name"
                      placeholder="Enter last name"
                      required
                      size="md"
                      {...form.getInputProps("lastName")}
                    />
                  </Grid.Col>
                </Grid>

                <DateInput
                  label="Date of Birth"
                  placeholder="Select birth date"
                  description="Employee's date of birth (must be in the past)"
                  required
                  size="md"
                  maxDate={yesterday}
                  leftSection={<IconCalendar size={16} />}
                  {...form.getInputProps("birthDate")}
                />
              </Stack>
            </Box>

            <Divider />

            {/* Employment Info Section */}
            <Box>
              <Group gap="sm" mb="lg">
                <ThemeIcon variant="light" color="green" size="lg" radius="xl">
                  <IconBriefcase size={20} />
                </ThemeIcon>
                <Title order={3}>Employment Details</Title>
              </Group>

              <Stack gap="md">
                <TextInput
                  label="Employee Number"
                  placeholder="Enter unique employee number"
                  description="Unique identifier for this employee"
                  required
                  size="md"
                  leftSection={<IconId size={16} />}
                  {...form.getInputProps("employeeNum")}
                />

                <Grid>
                  <Grid.Col span={{ base: 12, sm: 6 }}>
                    <DateInput
                      label="Employment Start Date"
                      placeholder="Select start date"
                      description="When the employee started working"
                      required
                      size="md"
                      maxDate={today}
                      leftSection={<IconCalendar size={16} />}
                      {...form.getInputProps("employedDate")}
                    />
                  </Grid.Col>
                  <Grid.Col span={{ base: 12, sm: 6 }}>
                    <Box>
                      <DateInput
                        label="Termination Date"
                        placeholder="Select termination date (optional)"
                        description="Leave empty if employee is still active"
                        size="md"
                        maxDate={today}
                        minDate={form.values.employedDate || dayjs().year(1950).startOf("year").toDate()}
                        leftSection={<IconCalendar size={16} />}
                        {...form.getInputProps("terminatedDate")}
                      />
                      {form.values.terminatedDate && (
                        <Group mt="xs">
                          <Button
                            variant="light"
                            color="red"
                            size="xs"
                            leftSection={<IconX size={12} />}
                            onClick={() => form.setFieldValue("terminatedDate", null)}
                          >
                            Clear Termination Date
                          </Button>
                        </Group>
                      )}
                    </Box>
                  </Grid.Col>
                </Grid>
              </Stack>
            </Box>

            {/* Help Info */}
            <Alert icon={<IconInfoCircle size={16} />} title="Form Guidelines" color="blue" variant="light">
              <Stack gap="xs">
                <Box>• All dates must be valid and within reasonable ranges</Box>
                <Box>• All required fields must be completed before saving</Box>
              </Stack>
            </Alert>

            <Divider />

            {/* Action Buttons */}
            <Group justify="flex-end" gap="md">
              <Button variant="light" color="gray" size="md" leftSection={<IconX size={16} />} onClick={handleCancel}>
                Cancel
              </Button>
              <Button
                variant="gradient"
                gradient={{
                  from: isEditing ? "orange" : "blue",
                  to: isEditing ? "red" : "purple",
                  deg: 45,
                }}
                size="md"
                leftSection={<IconDeviceFloppy size={16} />}
                onClick={() => handleSubmit(form.values)}
                loading={createMutation.isLoading || updateMutation.isLoading}
              >
                {isEditing ? "Update Employee" : "Create Employee"}
              </Button>
            </Group>
          </Stack>
        </Card>
      </Stack>
    </Container>
  );
};
