import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider } from "react-query";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { AppRouter } from "./router/AppRouter";
import { queryClient } from "./store/queryClient";
import { EmployeeProvider } from "./contexts/EmployeeProvider";
import { useUIContext } from "./hooks/useUiContext";

export const App = () => {
  const { themeMode } = useUIContext();

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <MantineProvider
          forceColorScheme={themeMode}
          theme={{
            primaryColor: "blue",
            fontFamily: "Inter, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif",
          }}
        >
          <Notifications />
          <EmployeeProvider>
            <AppRouter />
          </EmployeeProvider>
        </MantineProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
};
