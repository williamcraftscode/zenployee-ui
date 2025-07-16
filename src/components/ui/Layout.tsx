import type { ReactNode } from "react";
import { AppShell, ActionIcon, Box, Flex, Paper } from "@mantine/core";
import { IconMenu2, IconX } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { useLocation } from "react-router-dom";
import { Header } from "./Header";
import { Navigation } from "./Navigation";
import { MobileNavigation } from "./MobileNavigation";
import { useEffect, useState } from "react";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const [sidebarOpened, { toggle: toggleSidebar, close: closeSidebar }] = useDisclosure();
  const [desktopSidebarCollapsed, setDesktopSidebarCollapsed] = useState(false);
  const location = useLocation();

  useEffect(() => {
    closeSidebar();
  }, [location.pathname, closeSidebar]);

  const toggleDesktopSidebar = () => {
    setDesktopSidebarCollapsed(!desktopSidebarCollapsed);
  };

  return (
    <AppShell
      header={{ height: 70 }}
      navbar={{
        width: desktopSidebarCollapsed ? 58 : 280,
        breakpoint: "md",
        collapsed: { mobile: !sidebarOpened, desktop: false },
      }}
      padding="md"
      transitionDuration={300}
      transitionTimingFunction="ease-in-out"
      w="98vw"
    >
      <AppShell.Header>
        <Paper shadow="sm" h="100%" style={{ borderRadius: 0 }}>
          <Flex h="100%" align="center" px="md">
            <ActionIcon
              variant="subtle"
              color="gray"
              onClick={toggleSidebar}
              hiddenFrom="md"
              aria-label="Toggle navigation"
              size="lg"
            >
              <IconMenu2 size={20} />
            </ActionIcon>

            <ActionIcon
              variant="subtle"
              color="gray"
              onClick={toggleDesktopSidebar}
              visibleFrom="md"
              aria-label={desktopSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
              size="lg"
              mr="md"
            >
              {desktopSidebarCollapsed ? <IconMenu2 size={20} /> : <IconX size={20} />}
            </ActionIcon>

            <Box style={{ flex: 1 }}>
              <Header />
            </Box>
          </Flex>
        </Paper>
      </AppShell.Header>

      <AppShell.Navbar>
        <Paper
          shadow="sm"
          h="100%"
          style={{
            borderRadius: 0,
            background: "var(--mantine-color-body)",
            borderRight: "1px solid var(--mantine-color-gray-3)",
          }}
        >
          <Navigation />
        </Paper>
      </AppShell.Navbar>

      <AppShell.Main>
        <Box
          style={{
            minHeight: "calc(100vh - 70px)",
            borderRadius: "var(--mantine-radius-md)",
            padding: "var(--mantine-spacing-md)",
          }}
        >
          {children}
        </Box>
      </AppShell.Main>

      <Box hiddenFrom="md">
        <MobileNavigation />
      </Box>
    </AppShell>
  );
};
