import { useMemo } from "react";
import type { Session } from "../types/session";

const msPerDay = 24 * 60 * 60 * 1000;

const isConsecutive = (dateA: string, dateB: string) => {
  const diff = Math.abs(new Date(dateA).getTime() - new Date(dateB).getTime());
  return diff === msPerDay;
};

export function useStreak(sessions: Session[]) {
  return useMemo(() => {
    if (!sessions || sessions.length === 0) {
      return { currentStreak: 0, longestStreak: 0 };
    }

    // Unieke kalenderdagen met sessies, gesorteerd oud → nieuw
    const uniqueDays = [
      ...new Set(sessions.map((s) => s.startAt.split("T")[0])),
    ].sort();

    if (uniqueDays.length === 0) {
      return { currentStreak: 0, longestStreak: 0 };
    }

    // current streak: tel terug vanaf vandaag
    const today = new Date().toISOString().split("T")[0];
    let currentStreak = 0;
    for (let i = uniqueDays.length - 1; i >= 0; i--) {
      const expected = new Date(
        new Date(today).getTime() - currentStreak * msPerDay,
      )
        .toISOString()
        .split("T")[0];
      if (uniqueDays[i] === expected) {
        currentStreak++;
      } else {
        break;
      }
    }

    // longest streak: aaneengesloten kalenderdagen
    let longestStreak = 1;
    let temp = 1;
    for (let i = 1; i < uniqueDays.length; i++) {
      if (isConsecutive(uniqueDays[i - 1], uniqueDays[i])) {
        temp++;
        longestStreak = Math.max(longestStreak, temp);
      } else {
        temp = 1;
      }
    }

    return { currentStreak, longestStreak };
  }, [sessions]);
}
