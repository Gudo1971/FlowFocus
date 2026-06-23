import { Box, Flex, Heading, HStack } from "@chakra-ui/react";
import { ColorModeButton } from "./ColorModeButton";

export function Header() {
  return (
    <Box
      as="header"
      bg="bg.surface"
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
        <HStack gap={4}>
          <ColorModeButton />
        </HStack>
      </Flex>
    </Box>
  );
}
