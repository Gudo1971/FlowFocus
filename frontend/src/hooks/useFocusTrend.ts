import { useMemo } from "react";
import type { Session } from "../types/session";

export function useFocusTrend(sessions: Session[]) {
  return useMemo(() => {
    if (!sessions || sessions.length === 0) return [];

    const map = new Map<string, number>();

    for (const s of sessions) {
      const date = s.startAt.split("T")[0];
      const prev = map.get(date) ?? 0;
      map.set(date, prev + s.duration);
    }

    return Array.from(map.entries())
      .map(([date, totalMinutes]) => ({
        date,
        totalMinutes,
      }))
      .sort((a, b) => a.date.localeCompare(b.date));
  }, [sessions]);
}
