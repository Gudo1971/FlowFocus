// ---------------------------------------------
// DashboardPage
// Displays metrics, charts, timer, tasks, and session list
// ---------------------------------------------

import { Box, Grid, Heading } from "@chakra-ui/react";
import { MetricCard } from "../components/cards/MetricCard";
import { TasksSection } from "../components/tasks/TasksSection";
import { FocusTimer } from "../components/timer/FocusTimer";
import { WeeklyOverview } from "../components/weeklyOverview/WeeklyOverview";
import { DailySessionsChart } from "../components/dailySessions/DailySessionsChart";
import { FocusTrendChart } from "../components/focusTrend/FocusTrendChart";
import { EfficiencyChart } from "../components/efficiency/EfficiencyChart";
import { useSessionsQuery } from "../hooks/useSessionsQuery";
import { SessionList } from "../components/sessions/SessionList";
import type { Session } from "../types/session";
import { useStreak } from "../hooks/useStreak";
import { usePeriodFilter } from "../context/PeriodFilterContext";
import { PeriodFilter } from "../components/filters/PeriodFilter";
import { HabitListForm } from "../components/forms/HabitListForm";
export function DashboardPage() {
  // ---------------------------------------------
  // Filters and data loading
  // ---------------------------------------------
  const { from, to } = usePeriodFilter();
  const { data: sessions = [], isLoading } = useSessionsQuery(from, to);

  // ---------------------------------------------
  // Streak calculation
  // ---------------------------------------------
  const { currentStreak, longestStreak } = useStreak(sessions);

  if (isLoading) {
    return <Heading size="md">Gegevens laden...</Heading>;
  }

  // ---------------------------------------------
  // Metrics calculation
  // ---------------------------------------------
  const totalMinutes = sessions.reduce(
    (sum: number, s: Session) => sum + s.duration,
    0,
  );

  const totalSessions = sessions.length;

  const totalHours = Math.floor(totalMinutes / 60);
  const remainingMinutes = totalMinutes % 60;

  const formattedFocusTime =
    totalHours > 0
      ? `${totalHours}h ${remainingMinutes}m`
      : `${remainingMinutes}m`;

  // ---------------------------------------------
  // Render
  // ---------------------------------------------
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
      <HabitListForm />
      {/* Page title */}
      <Heading size="lg" color="text.primary">
        Jouw dag in focus
      </Heading>

      <PeriodFilter />

      {/* Metrics */}
      <Grid
        templateColumns={{
          base: "1fr",
          md: "repeat(2, 1fr)",
          lg: "repeat(4, 1fr)",
        }}
        gap={6}
      >
        <MetricCard
          label="Focus tijd"
          value={formattedFocusTime}
          sublabel="Totaal"
        />

        <MetricCard
          label="Sessies"
          value={totalSessions.toString()}
          sublabel="Totaal"
        />

        <MetricCard
          label="Gem. duur"
          value={
            totalSessions > 0
              ? `${Math.round(totalMinutes / totalSessions)}m`
              : "0m"
          }
          sublabel="Per sessie"
        />

        <MetricCard
          label="Streaks"
          value={`${currentStreak} dagen`}
          sublabel={`Longest: ${longestStreak}`}
        />
      </Grid>

      {/* Session list */}
      <Box>
        <Heading size="md" mb={4}>
          Jouw sessies
        </Heading>
        <SessionList sessions={sessions} />
      </Box>

      {/* Tasks and timer */}
      <Grid templateColumns={{ base: "1fr", lg: "2fr 1fr" }} gap={6}>
        <TasksSection />
        <FocusTimer />
      </Grid>

      {/* Weekly overview */}
      <Box>
        <WeeklyOverview sessions={sessions} />
      </Box>

      {/* Analytics charts */}
      <Grid templateColumns={{ base: "1fr", lg: "repeat(3, 1fr)" }} gap={6}>
        <DailySessionsChart sessions={sessions} />
        <FocusTrendChart sessions={sessions} />
        <EfficiencyChart sessions={sessions} />
      </Grid>
    </Box>
  );
}
