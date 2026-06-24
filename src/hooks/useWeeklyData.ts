import { useFocusHistory } from "./useFocusHistory";
import type { WeeklyDayData } from "../types/weekly";

export function useWeeklyData(): WeeklyDayData[] {
  const { sessions } = useFocusHistory();

  const grouped: Record<string, WeeklyDayData> = {};

  for (const s of sessions) {
    const day = new Date(s.start).toISOString().slice(0, 10);

    if (!grouped[day]) {
      grouped[day] = {
        date: day,
        totalMinutes: 0,
        sessions: 0,
        efficiency: 0, // ← verplicht door jouw type
      };
    }

    grouped[day].totalMinutes += s.duration / 60;
    grouped[day].sessions += 1;
  }

  return Object.values(grouped);
}
