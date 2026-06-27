import { Box, Heading, Text } from "@chakra-ui/react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useWeeklyData } from "../../hooks/useWeeklyData";
import type { WeeklyDayData } from "../../types/weekly";
import type { Session } from "../../types/session";

type Props = {
  sessions: Session[];
};

export function WeeklyOverview({ sessions }: Props) {
  const data: WeeklyDayData[] = useWeeklyData(sessions);

  return (
    <Box
      bg="bg.surface"
      borderWidth="1px"
      borderColor="border.subtle"
      borderRadius="lg"
      p={6}
    >
      <Heading size="md" mb={4} color="text.primary">
        Weekly Overview
      </Heading>

      {data.length === 0 ? (
        <Text color="text.muted">Nog geen focus-sessies deze week.</Text>
      ) : (
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={data}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip
              formatter={(value, name) =>
                name === "totalMinutes"
                  ? `${value} minuten`
                  : `${value} sessies`
              }
            />
            <Bar dataKey="totalMinutes" fill="#3182CE" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      )}
    </Box>
  );
}
