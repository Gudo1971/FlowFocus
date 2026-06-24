import { Box, Heading } from "@chakra-ui/react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useWeeklyData } from "../../hooks/useWeeklyData";
import type { WeeklyDayData } from "../../types/weekly";

export function FocusTrendChart() {
  const data: WeeklyDayData[] = useWeeklyData();

  return (
    <Box bg="bg.surface" borderWidth="1px" borderRadius="lg" p={6}>
      <Heading size="md" mb={4}>
        Focus Trend
      </Heading>

      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip
            formatter={(value: unknown) => {
              const v = typeof value === "number" ? value : 0;
              return `${v.toFixed(1)} min/sessie`;
            }}
          />

          <Line
            type="monotone"
            dataKey="totalMinutes"
            stroke="#3182CE"
            strokeWidth={3}
            dot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
}
