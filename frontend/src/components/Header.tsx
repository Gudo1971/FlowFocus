import { Box, Flex, Heading, HStack, Text, VStack } from "@chakra-ui/react";
import { ColorModeButton } from "./ColorModeButton";

export function Header() {
  const today = new Date().toLocaleDateString("nl-NL", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <Box
      as="header"
      bg={{ base: "white", _dark: "gray.800" }}
      borderBottomWidth="1px"
      borderColor="border.subtle"
      py={4}
      px={8}
      position="sticky"
      top={0}
      zIndex={10}
    >
      <Flex align="center" justify="space-between" maxW="100%">
        <Heading size="md" color="text.primary">
          FocusFlow
        </Heading>
        {/*right side: greeting + themee toglle */}
        <HStack gap={6}>
          <VStack gap={1} align="flex-end">
            <Text fontSize="sm" color="text.muted">
              Goedemorgen, Gudo 👋
            </Text>
            <Text fontSize="xs" color="text.subtle">
              {today}
            </Text>
          </VStack>

          <ColorModeButton />
        </HStack>
      </Flex>
    </Box>
  );
}
