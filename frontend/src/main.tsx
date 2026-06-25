import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import { ThemeProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { theme } from "./theme/index";
import App from "./App.tsx";
import { PeriodFilterProvider } from "./context/PeriodFilterContext";
const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider value={theme}>
          <PeriodFilterProvider>
            <App />
          </PeriodFilterProvider>
        </ChakraProvider>
      </QueryClientProvider>
    </ThemeProvider>
  </StrictMode>,
);
