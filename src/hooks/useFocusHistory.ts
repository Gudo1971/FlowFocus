import { useEffect, useState } from "react";

export type FocusSession = {
  id: string;
  start: number; // timestamp
  end: number; // timestamp
  duration: number; // in seconds
  preset: number; // in seconds
};

export function useFocusHistory() {
  const [sessions, setSessions] = useState<FocusSession[]>(() => {
    if (typeof window === "undefined") return [];
    const stored = localStorage.getItem("focusHistory");
    if (!stored) return [];

    try {
      return JSON.parse(stored) as FocusSession[];
    } catch {
      return [];
    }
  });

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("focusHistory", JSON.stringify(sessions));
  }, [sessions]);

  function addSession(session: FocusSession) {
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
