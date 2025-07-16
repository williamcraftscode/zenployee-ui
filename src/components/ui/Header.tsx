import { Group, Text, Avatar, Menu, Switch } from "@mantine/core";
import { IconAerialLift, IconMoon, IconSun } from "@tabler/icons-react";
import { useUIContext } from "../../hooks/useUiContext";

export const Header: React.FC = () => {
  const { themeMode, setThemeMode } = useUIContext();
  const isDark = themeMode === "dark";
  const toggleTheme = () => setThemeMode(isDark ? "light" : "dark");

  return (
    <Group h="100%" px="md" justify="space-between">
      <Group>
        <IconAerialLift size={28} />
        <Text size="xl" fw={700}>
          Zenployee
        </Text>
      </Group>

      <Group>
        <Switch
          size="md"
          onLabel={<IconSun size={16} />}
          offLabel={<IconMoon size={16} />}
          checked={!isDark}
          title="Toggle theme"
          onChange={toggleTheme}
        />

        <Menu shadow="md" width={220} position="bottom-end">
          <Menu.Target>
            <Group style={{ cursor: "pointer" }} gap="sm">
              <Avatar size="md" color="blue">
                A
              </Avatar>
            </Group>
          </Menu.Target>
        </Menu>
      </Group>
    </Group>
  );
};
