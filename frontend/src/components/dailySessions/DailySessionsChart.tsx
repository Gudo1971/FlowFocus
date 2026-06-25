import { Box, Heading } from "@chakra-ui/react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useSessionsQuery } from "../../hooks/useSessionsQuery";
import { useWeeklyData } from "../../hooks/useWeeklyData";
import type { WeeklyDayData } from "../../types/weekly";
import { usePeriodFilter } from "../../context/PeriodFilterContext";

export function DailySessionsChart() {
  const { from, to } = usePeriodFilter();
  const { data: sessions = [] } = useSessionsQuery(from, to);
  const data: WeeklyDayData[] = useWeeklyData(sessions);

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
