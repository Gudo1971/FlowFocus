import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";
import { recipes } from "./recipes";
import { semanticTokens, tokens } from "./tokens";

const customConfig = defineConfig({
  theme: {
    tokens,
    semanticTokens,
    recipes,
  },
});

export const theme = createSystem(defaultConfig, customConfig);
