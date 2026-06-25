import prisma from "../prisma.js";

const toValidDate = (value: string, fieldName: "from" | "to") => {
  const parsed = new Date(value);

  if (Number.isNaN(parsed.getTime())) {
    throw new Error(`Invalid '${fieldName}' date`);
  }

  return parsed;
};

export const sessionService = {
  async getAll({ from, to }: { from?: string; to?: string }) {
    const filters: any = {};
    const startAtFilter: { gte?: Date; lte?: Date } = {};

    if (from) {
      startAtFilter.gte = toValidDate(from, "from");
    }

    if (to) {
      startAtFilter.lte = toValidDate(to, "to");
    }

    if (
      startAtFilter.gte &&
      startAtFilter.lte &&
      startAtFilter.gte > startAtFilter.lte
    ) {
      throw new Error("'from' must be before or equal to 'to'");
    }

    if (startAtFilter.gte || startAtFilter.lte) {
      filters.startAt = startAtFilter;
    }
    console.log("sessions prisma filter", filters);
    return prisma.focusSession.findMany({
      where: filters,
      orderBy: { startAt: "asc" },
    });
  },

  async create(data: any) {
    return prisma.focusSession.create({ data });
  },
};
