import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

const customConfig = defineConfig({
  theme: {
    semanticTokens: {
      colors: {
        bg: {
          page: { value: { base: "gray.50", _dark: "gray.900" } },
          surface: { value: { base: "white", _dark: "gray.800" } },
        },
        text: {
          primary: { value: { base: "gray.800", _dark: "gray.100" } },
          muted: { value: { base: "gray.600", _dark: "gray.400" } },
        },
        accent: {
          primary: { value: { base: "blue.500", _dark: "blue.300" } },
        },
      },
    },
  },
});

export const theme = createSystem(defaultConfig, customConfig);
