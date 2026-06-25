import { createContext, useContext, useState, type ReactNode } from "react";

const startOfDay = (date: Date) => {
  const value = new Date(date);
  value.setHours(0, 0, 0, 0);
  return value;
};

const endOfDay = (date: Date) => {
  const value = new Date(date);
  value.setHours(23, 59, 59, 999);
  return value;
};

// -----------------------------
// Types
// -----------------------------
type PeriodFilterContextType = {
  from: string | undefined;
  to: string | undefined;
  setFrom: (value: string | undefined) => void;
  setTo: (value: string | undefined) => void;
  setRange: (from: string | undefined, to: string | undefined) => void;
};

// -----------------------------
// Context
// -----------------------------
const PeriodFilterContext = createContext<PeriodFilterContextType | undefined>(
  undefined,
);

// -----------------------------
// Provider
// -----------------------------
export function PeriodFilterProvider({ children }: { children: ReactNode }) {
  // Init: huidige maand
  const now = new Date();
  const firstDay = startOfDay(
    new Date(now.getFullYear(), now.getMonth(), 1),
  ).toISOString();
  const lastDay = endOfDay(
    new Date(now.getFullYear(), now.getMonth() + 1, 0),
  ).toISOString();

  const [from, setFrom] = useState<string | undefined>(firstDay);
  const [to, setTo] = useState<string | undefined>(lastDay);

  const setRange = (
    fromValue: string | undefined,
    toValue: string | undefined,
  ) => {
    setFrom(fromValue);
    setTo(toValue);
  };

  return (
    <PeriodFilterContext.Provider
      value={{ from, to, setFrom, setTo, setRange }}
    >
      {children}
    </PeriodFilterContext.Provider>
  );
}

// -----------------------------
// Hook
// -----------------------------
export function usePeriodFilter() {
  const ctx = useContext(PeriodFilterContext);
  if (!ctx) {
    throw new Error("usePeriodFilter must be used inside PeriodFilterProvider");
  }
  return ctx;
}
