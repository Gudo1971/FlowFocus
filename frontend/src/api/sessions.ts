import type { Session } from "../types/session";

export async function fetchSessions(params?: { from?: string; to?: string }) {
  const url = new URL("http://localhost:3001/sessions");

  if (params?.from) url.searchParams.set("from", params.from);
  if (params?.to) url.searchParams.set("to", params.to);

  const res = await fetch(url.toString());

  if (!res.ok) {
    throw new Error("Failed to fetch sessions");
  }

  return (await res.json()) as Session[];
}
