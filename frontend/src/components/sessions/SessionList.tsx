import { Box, VStack, Text, HStack, Badge } from "@chakra-ui/react";
import type { Session } from "../../types/session";

type Props = {
  sessions: Session[];
};

export function SessionList({ sessions }: Props) {
  if (sessions.length === 0) {
    return <Text color="text.muted">Nog geen sessies vandaag.</Text>;
  }

  return (
    <VStack align="stretch" gap={4}>
      {sessions.map((s) => (
        <Box
          key={s.id}
          p={4}
          borderWidth="1px"
          borderRadius="md"
          bg="bg.surface"
        >
          <HStack justify="space-between">
            <Text fontWeight="medium">
              {new Date(s.startAt).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
              {" — "}
              {new Date(s.endAt).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Text>

            <Badge colorScheme="purple">{s.duration} min</Badge>
          </HStack>

          <Text fontSize="sm" color="text.muted">
            Preset: {s.preset} min
          </Text>
        </Box>
      ))}
    </VStack>
  );
}
