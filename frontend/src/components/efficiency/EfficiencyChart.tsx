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
import { useSessionsQuery } from "../../hooks/useSessionsQuery";
import { usePeriodFilter } from "../../context/PeriodFilterContext";
export function EfficiencyChart() {
  const { from, to } = usePeriodFilter();
  const { data: sessions = [] } = useSessionsQuery(from, to);
  const data: WeeklyDayData[] = useWeeklyData(sessions).map((d) => ({
    ...d,
    efficiency: d.sessions === 0 ? 0 : d.totalMinutes / d.sessions,
  }));

  return (
    <Box bg="bg.surface" borderWidth="1px" borderRadius="lg" p={6}>
      <Heading size="md" mb={4}>
        Focus Efficiency
      </Heading>

      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip
            formatter={(value) =>
              typeof value === "number"
                ? `${value.toFixed(1)} min/sessie`
                : value
            }
          />
          <Bar dataKey="efficiency" fill="#48BB78" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
}
