import { defineRecipe } from "@chakra-ui/react";

export const buttonRecipe = defineRecipe({
  base: {
    fontWeight: "medium",
    borderRadius: "md",
    px: "4",
    py: "2",
  },
  variants: {
    variant: {
      solid: {
        bg: "accent.primary",
        color: "white",
        _hover: { opacity: 0.9 },
      },
    },
  },
  defaultVariants: {
    variant: "solid",
  },
});
