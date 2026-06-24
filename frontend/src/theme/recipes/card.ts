import { defineRecipe } from "@chakra-ui/react";

export const cardRecipe = defineRecipe({
  base: {
    bg: "bg.surface",
    borderRadius: "lg",
    p: "4",
    borderWidth: "1px",
    borderColor: "border.subtle",
  },
});
