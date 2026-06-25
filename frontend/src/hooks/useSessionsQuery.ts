import { useQuery } from "@tanstack/react-query";
import { fetchSessions } from "../api/sessions";
import type { Session } from "../types/session";

export function useSessionsQuery(from?: string, to?: string) {
  return useQuery<Session[]>({
    queryKey: ["sessions", from, to],
    queryFn: () => fetchSessions({ from, to }),
  });
}
