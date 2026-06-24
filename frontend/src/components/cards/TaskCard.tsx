import { Box, Checkbox, Flex, Text } from "@chakra-ui/react";

export function TaskCard({
  title,
  completed,
  onToggle,
}: {
  title: string;
  completed: boolean;
  onToggle: () => void;
}) {
  return (
    <Box
      bg="bg.surface"
      borderWidth="1px"
      borderColor="border.subtle"
      borderRadius="md"
      p={4}
      _hover={{ bg: "bg.muted", transition: "0.2s ease" }}
    >
      <Flex align="center" gap={3}>
        <Checkbox.Root checked={completed} onCheckedChange={() => onToggle()}>
          <Checkbox.HiddenInput />
          <Checkbox.Control />
        </Checkbox.Root>

        <Text
          fontSize="sm"
          color={completed ? "text.subtle" : "text.primary"}
          textDecoration={completed ? "line-through" : "none"}
        >
          {title}
        </Text>
      </Flex>
    </Box>
  );
}
