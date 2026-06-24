import { Box, Heading } from "@chakra-ui/react";
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

export function DailySessionsChart() {
  const data: WeeklyDayData[] = useWeeklyData();

  return (
    <Box bg="bg.surface" borderWidth="1px" borderRadius="lg" p={6}>
      <Heading size="md" mb={4}>
        Daily Sessions
      </Heading>

      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip
            formatter={(value: unknown) => {
              const v = typeof value === "number" ? value : 0;
              return `${v} sessies`;
            }}
          />
          <Bar dataKey="sessions" fill="#9F7AEA" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
}
