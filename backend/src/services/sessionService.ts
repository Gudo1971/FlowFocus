// ---------------------------------------------
// Session Service
// Handles database operations for focus sessions
// ---------------------------------------------

import prisma from "../prisma.js";

// ---------------------------------------------
// Validate and parse date strings
// Throws an error if the date is invalid
// ---------------------------------------------
const toValidDate = (value: string, fieldName: "from" | "to") => {
  const parsed = new Date(value);

  if (Number.isNaN(parsed.getTime())) {
    throw new Error(`Invalid '${fieldName}' date`);
  }

  return parsed;
};

export const sessionService = {
  // ---------------------------------------------
  // Fetch all sessions with optional date filters
  // Supports ?from=YYYY-MM-DD and ?to=YYYY-MM-DD
  // ---------------------------------------------
  async getAll({ from, to }: { from?: string; to?: string }) {
    const filters: any = {};
    const startAtFilter: { gte?: Date; lte?: Date } = {};

    // Apply "from" filter
    if (from) {
      startAtFilter.gte = toValidDate(from, "from");
    }

    // Apply "to" filter
    if (to) {
      startAtFilter.lte = toValidDate(to, "to");
    }

    // Validate range
    if (
      startAtFilter.gte &&
      startAtFilter.lte &&
      startAtFilter.gte > startAtFilter.lte
    ) {
      throw new Error("'from' must be before or equal to 'to'");
    }

    // Attach filter if any bounds exist
    if (startAtFilter.gte || startAtFilter.lte) {
      filters.startAt = startAtFilter;
    }

    return prisma.focusSession.findMany({
      where: filters,
      orderBy: { startAt: "asc" },
    });
  },

  // ---------------------------------------------
  // Create a new session
  // ---------------------------------------------
  async create(data: any) {
    return prisma.focusSession.create({ data });
  },
};
