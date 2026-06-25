import { Box, Heading } from "@chakra-ui/react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { useSessionsQuery } from "../../hooks/useSessionsQuery";
import { useFocusTrend } from "../../hooks/useFocusTrend";
import { usePeriodFilter } from "../../context/PeriodFilterContext";

export function FocusTrendChart() {
  const { from, to } = usePeriodFilter();
  const { data: sessions = [] } = useSessionsQuery(from, to);
  const trend = useFocusTrend(sessions);

  return (
    <Box bg="bg.surface" borderWidth="1px" borderRadius="lg" p={6}>
      <Heading size="md" mb={4}>
        Focus Trend
      </Heading>

      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={trend}>
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
