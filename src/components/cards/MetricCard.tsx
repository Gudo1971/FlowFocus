import { Box, Flex, Heading, Text } from "@chakra-ui/react";

export function MetricCard({
  label,
  value,
  sublabel,
}: {
  label: string;
  value: string;
  sublabel?: string;
}) {
  return (
    <Box
      bg="bg.surface"
      borderWidth="1px"
      borderColor="border.subtle"
      borderRadius="lg"
      p={6}
      boxShadow="sm"
      _hover={{ boxShadow: "md", transition: "0.2s ease" }}
    >
      <Flex direction="column" gap={2}>
        <Text fontSize="sm" color="text.muted">
          {label}
        </Text>
        <Heading size="lg" color="text.primary">
          {value}
        </Heading>
        {sublabel && (
          <Text fontSize="xs" color="text.subtle">
            {sublabel}
          </Text>
        )}
      </Flex>
    </Box>
  );
}
