import { Box, Heading, VStack } from "@chakra-ui/react";
import { TasksList } from "./TasksList";

export function TasksSection() {
  return (
    <Box
      bg="bg.surface"
      borderWidth="1px"
      borderColor="border.subtle"
      borderRadius="lg"
      p={6}
    >
      <VStack align="stretch" gap={4}>
        <Heading size="md" color="text.primary">
          Taken
        </Heading>

        <TasksList />
      </VStack>
    </Box>
  );
}
