import { Box, Grid, Heading } from "@chakra-ui/react";
import { MetricCard } from "../components/cards/MetricCard";
import { TasksSection } from "../components/tasks/TasksSection";
import { FocusTimer } from "../components/timer/FocusTimer";
import { WeeklyOverview } from "../components/weeklyOverview/WeeklyOverview";
import { DailySessionsChart } from "../components/dailySessions/DailySessionsChart";
import { FocusTrendChart } from "../components/focusTrend/FocusTrendChart";
import { EfficiencyChart } from "../components/efficiency/EfficiencyChart";

export function DashboardPage() {
  return (
    <Box
      as="main"
      px={8}
      py={6}
      maxW="1200px"
      mx="auto"
      display="flex"
      flexDirection="column"
      gap={10}
    >
      {/* Title */}
      <Heading size="lg" color="text.primary">
        Jouw dag in focus
      </Heading>

      {/* Metrics row */}
      <Grid
        templateColumns={{
          base: "1fr",
          md: "repeat(2, 1fr)",
          lg: "repeat(4, 1fr)",
        }}
        gap={6}
      >
        <MetricCard label="Taken voltooid" value="12" sublabel="Vandaag" />
        <MetricCard label="Focus tijd" value="3h 45m" sublabel="Vandaag" />
        <MetricCard label="Pomodoro's" value="5" sublabel="Vandaag" />
        <MetricCard label="Onderbrekingen" value="2" sublabel="Vandaag" />
      </Grid>

      {/* Tasks + Timer */}
      <Grid templateColumns={{ base: "1fr", lg: "2fr 1fr" }} gap={6}>
        <TasksSection />
        <FocusTimer />
      </Grid>

      {/* Weekly Overview */}
      <Box>
        <WeeklyOverview />
      </Box>

      {/* Analytics row */}
      <Grid templateColumns={{ base: "1fr", lg: "repeat(3, 1fr)" }} gap={6}>
        <DailySessionsChart />
        <FocusTrendChart />
        <EfficiencyChart />
      </Grid>
    </Box>
  );
}
