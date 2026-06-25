export interface Session {
  id: string;
  startAt: string; // ISO string
  endAt: string; // ISO string
  duration: number; // in minutes
  preset: number; // in minutes
  createdAt: string; // ISO string
}

export interface FocusHistorySession {
  id: string;
  start: number; // timestamp
  end: number; // timestamp
  duration: number; // in seconds
  preset: number; // in seconds
}
