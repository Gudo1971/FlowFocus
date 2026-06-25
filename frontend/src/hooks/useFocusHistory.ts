import { useEffect, useState } from "react";
import type { FocusHistorySession } from "../types/session";

export function useFocusHistory() {
  const [sessions, setSessions] = useState<FocusHistorySession[]>(() => {
    if (typeof window === "undefined") return [];
    const stored = localStorage.getItem("focusHistory");
    if (!stored) return [];

    try {
      return JSON.parse(stored) as FocusHistorySession[];
    } catch {
      return [];
    }
  });

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("focusHistory", JSON.stringify(sessions));
  }, [sessions]);

  function addSession(session: FocusHistorySession) {
    setSessions((prev) => [...prev, session]);
  }

  function getTotalFocusTimeToday() {
    const today = new Date().toDateString();
    return sessions
      .filter((s) => new Date(s.end).toDateString() === today)
      .reduce((sum, s) => sum + s.duration, 0);
  }

  function getSessionCountToday() {
    const today = new Date().toDateString();
    return sessions.filter((s) => new Date(s.end).toDateString() === today)
      .length;
  }

  return {
    sessions,
    addSession,
    getTotalFocusTimeToday,
    getSessionCountToday,
  };
}
