import { Card, Group, Avatar, Text, Badge, ActionIcon, Stack, Box, Tooltip, ThemeIcon, Progress } from "@mantine/core";
import {
  IconCalendar,
  IconBriefcase,
  IconEditCircle,
  IconUser,
  IconEye,
  IconHistory,
  IconChevronRight,
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import type { Employee } from "../../types/types";
import { useEmployeeContext } from "../../hooks/useEmployeeContext";
import {
  calculateAge,
  calculateYearsOfService,
  getActiveRole as getActiveRole,
  getRelativeUpdateTime,
} from "../../utils/employees";
import { formatDate } from "../../utils/formatters";

// Add relative time plugin
dayjs.extend(relativeTime);

interface EmployeeCardProps {
  employee: Employee;
}

export const EmployeeCard = ({ employee }: EmployeeCardProps) => {
  const { setSelectedEmployee } = useEmployeeContext();
  const navigate = useNavigate();
  const activeEmployee = getActiveRole(employee.employees || []);

  const handleEdit = () => {
    setSelectedEmployee(employee);
    navigate(`/employees/edit/${employee.id}`);
  };

  const handleView = () => {
    setSelectedEmployee(employee);
    navigate(`/employees/view/${employee.id}`);
  };

  const handleCardClick = () => {
    handleView();
  };

  // Days since last update
  const daysSinceUpdate = () => {
    if (!activeEmployee.updatedAt) return 0;
    const lastUpdate = dayjs(activeEmployee.updatedAt);
    if (!lastUpdate.isValid()) return 0;
    return Math.max(0, dayjs().diff(lastUpdate, "day"));
  };

  const yearsOfService = calculateYearsOfService(activeEmployee);
  const age = calculateAge(employee);
  const isActive = !activeEmployee.terminatedDate;
  const totalEmployments = employee.employees.length;
  const daysSinceLastUpdate = daysSinceUpdate();

  // Service length indicator (for visual progress)
  const serviceProgress = Math.min((yearsOfService / 10) * 100, 100); // Max out at 10 years for progress bar

  return (
    <Card
      shadow="md"
      p="lg"
      radius="lg"
      withBorder
      style={{
        transition: "all 0.2s ease",
        cursor: "pointer",
        "&:hover": {
          transform: "translateY(-1px)",
          boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
          borderColor: "var(--mantine-color-blue-3)",
        },
      }}
      onClick={handleCardClick}
    >
      {/* Main Content Row */}
      <Group justify="space-between" wrap="nowrap">
        {/* Left Section */}
        <Group gap="md" style={{ flex: 1, minWidth: 0 }}>
          <Avatar
            size="lg"
            radius="xl"
            variant="gradient"
            gradient={{ from: "blue", to: "cyan", deg: 45 }}
            style={{
              boxShadow: "0 3px 10px rgba(0,0,0,0.15)",
              border: "2px solid white",
              flexShrink: 0,
            }}
          >
            <Text size="md" fw={700} c="white">
              {employee.firstName[0]}
              {employee.lastName[0]}
            </Text>
          </Avatar>

          <Box style={{ minWidth: 0, flex: 1 }}>
            <Group gap="xs" mb={4}>
              <Text fw={600} size="lg" c="dark" truncate>
                {employee.firstName} {employee.lastName}
              </Text>
              <Badge variant="light" color="gray" size="xs">
                #{activeEmployee.employeeNum}
              </Badge>
            </Group>

            <Group gap="md" wrap="nowrap" visibleFrom="md">
              <Group gap={4}>
                <ThemeIcon variant="light" color="blue" size="xs">
                  <IconUser size={10} />
                </ThemeIcon>
                <Text size="xs" c="dimmed">
                  {age} years old
                </Text>
              </Group>

              <Group gap={4}>
                <ThemeIcon variant="light" color="green" size="xs">
                  <IconBriefcase size={10} />
                </ThemeIcon>
                <Text size="xs" c="dimmed">
                  {yearsOfService} {yearsOfService === 1 ? "year" : "years"} service
                </Text>
              </Group>

              <Group gap={4}>
                <ThemeIcon variant="light" color="orange" size="xs">
                  <IconCalendar size={10} />
                </ThemeIcon>
                <Text size="xs" c="dimmed">
                  Hired {formatDate(activeEmployee.employedDate)}
                </Text>
              </Group>
            </Group>
          </Box>
        </Group>

        {/* Center Section - Status and Metrics */}
        <Stack gap="xs" align="center" style={{ minWidth: 120 }}>
          <Badge
            size="md"
            variant="gradient"
            gradient={isActive ? { from: "green", to: "lime", deg: 45 } : { from: "red", to: "pink", deg: 45 }}
            style={{ boxShadow: "0 2px 6px rgba(0,0,0,0.1)" }}
          >
            {isActive ? "Active" : "Terminated"}
          </Badge>

          {isActive && (
            <Box w="100%" visibleFrom="md">
              <Text size="xs" c="dimmed" ta="center" mb={2}>
                Service Progress
              </Text>
              <Progress
                value={serviceProgress}
                color="blue"
                size="sm"
                radius="xl"
                style={{ boxShadow: "inset 0 1px 2px rgba(0,0,0,0.1)" }}
              />
              <Text size="xs" c="dimmed" ta="center" mt={2}>
                {yearsOfService}/10+ years
              </Text>
            </Box>
          )}
        </Stack>

        {/* Right Section - Additional Info / Actions */}
        <Stack gap="xs" align="flex-end" style={{ minWidth: 140 }}>
          {/* Quick Info Pills */}
          <Group gap="xs" justify="flex-end">
            {totalEmployments > 1 && (
              <Tooltip label="Multiple Employment Records">
                <Badge variant="light" color="blue" size="xs">
                  {totalEmployments} records
                </Badge>
              </Tooltip>
            )}

            <Tooltip label={`Last updated ${getRelativeUpdateTime(activeEmployee)}`}>
              <Badge
                variant="light"
                color={daysSinceLastUpdate <= 7 ? "green" : daysSinceLastUpdate <= 30 ? "yellow" : "red"}
                size="xs"
              >
                <Group gap={2}>
                  <IconHistory size={8} />
                  {daysSinceLastUpdate === 0 ? "Today" : `${daysSinceLastUpdate}d`}
                </Group>
              </Badge>
            </Tooltip>
          </Group>

          {/* Action Buttons */}
          <Group gap="xs" mt="auto">
            <Tooltip label="Edit Employee">
              <ActionIcon
                variant="light"
                color="orange"
                size="md"
                radius="xl"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent click on card which takes you to view
                  handleEdit();
                }}
              >
                <IconEditCircle size={14} />
              </ActionIcon>
            </Tooltip>

            <Tooltip label="View Details">
              <ActionIcon
                variant="light"
                color="blue"
                size="md"
                radius="xl"
                onClick={(e) => {
                  e.stopPropagation();
                  handleView();
                }}
              >
                <IconEye size={14} />
              </ActionIcon>
            </Tooltip>

            <ActionIcon variant="subtle" color="gray" size="md" radius="xl">
              <IconChevronRight size={14} />
            </ActionIcon>
          </Group>
        </Stack>
      </Group>

      {/* Bottom Row - Extra Details */}
      <Group justify="space-between" mt="md" pt="sm" style={{ borderTop: "1px solid var(--mantine-color-gray-2)" }}>
        <Group gap="lg">
          <Text size="xs" c="dimmed">
            <Text component="span" fw={500}>
              Born:
            </Text>{" "}
            {formatDate(employee.birthDate)}
          </Text>

          {activeEmployee.terminatedDate && (
            <Text size="xs" c="red.6">
              <Text component="span" fw={500}>
                Terminated:
              </Text>{" "}
              {formatDate(activeEmployee.terminatedDate)}
            </Text>
          )}

          <Text size="xs" c="dimmed">
            <Text component="span" fw={500}>
              ID:
            </Text>{" "}
            {employee.id.slice(0, 8)}...
          </Text>
        </Group>

        <Text size="xs" c="dimmed">
          Created {formatDate(employee.createdAt)}
        </Text>
      </Group>
    </Card>
  );
};
