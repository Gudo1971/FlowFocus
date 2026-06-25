import { useMemo } from "react";
import type { Session } from "../types/session";
import type { WeeklyDayData } from "../types/weekly";

export function useWeeklyData(sessions: Session[]): WeeklyDayData[] {
  return useMemo(() => {
    if (!sessions || sessions.length === 0) return [];

    const map: Record<string, WeeklyDayData> = {};

    sessions.forEach((s) => {
      const date = s.startAt.split("T")[0];

      if (!map[date]) {
        map[date] = {
          date,
          sessions: 0,
          totalMinutes: 0,
          efficiency: 0,
        };
      }

      map[date].sessions += 1;
      map[date].totalMinutes += s.duration;
    });

    return Object.values(map).sort((a, b) => a.date.localeCompare(b.date));
  }, [sessions]);
}
