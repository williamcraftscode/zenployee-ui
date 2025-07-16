import { Stack, Group, Title, ThemeIcon, Paper, Text } from "@mantine/core";
import { IconSparkles, IconTrendingUp } from "@tabler/icons-react";
import { DashboardStats } from "../components/dashboard/DashboardStats";

export const DashboardPage = () => {
  return (
    <Stack gap="xl">
      <Group>
        <ThemeIcon size="xl" color="blue" variant="light">
          <IconSparkles size={28} />
        </ThemeIcon>
        <Text fz="2rem" fw={700}>
          ACME |
        </Text>
        <Text
          fz="2rem"
          fw={700}
          variant="gradient"
          gradient={{ from: "blue", to: "teal" }}
        >
          Zenployee Dashboard
        </Text>
      </Group>

      <DashboardStats />

      <Paper shadow="md" p="xl" radius="md">
        <Group mb="md">
          <IconTrendingUp size={24} />
          <Title order={3}>Quick Overview</Title>
        </Group>
        <Text c="dimmed">
          Welcome to your employee management system. Here you can view key
          metrics about your workforce, manage employee records, and track
          important dates and milestones.
        </Text>
      </Paper>
    </Stack>
  );
};
