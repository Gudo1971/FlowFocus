import { HStack, Button } from "@chakra-ui/react";
import { usePeriodFilter } from "../../context/PeriodFilterContext";

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

export function PeriodFilter() {
  const { setRange } = usePeriodFilter();

  const today = new Date();

  const getCurrentWeekStart = () => {
    const day = today.getDay();
    const diff = day === 0 ? 6 : day - 1;
    const monday = startOfDay(today);
    monday.setDate(today.getDate() - diff);
    return monday;
  };

  const setToday = () => {
    setRange(startOfDay(today).toISOString(), endOfDay(today).toISOString());
  };

  const setThisWeek = () => {
    const monday = getCurrentWeekStart();

    const sunday = endOfDay(monday);
    sunday.setDate(monday.getDate() + 6);

    setRange(monday.toISOString(), sunday.toISOString());
  };

  const setLastWeek = () => {
    const monday = getCurrentWeekStart();
    monday.setDate(monday.getDate() - 7);

    const sunday = endOfDay(monday);
    sunday.setDate(monday.getDate() + 6);

    setRange(monday.toISOString(), sunday.toISOString());
  };

  const setThisMonth = () => {
    const first = startOfDay(
      new Date(today.getFullYear(), today.getMonth(), 1),
    );
    const last = endOfDay(
      new Date(today.getFullYear(), today.getMonth() + 1, 0),
    );

    setRange(first.toISOString(), last.toISOString());
  };

  const setAllTime = () => {
    setRange(undefined, undefined);
  };

  return (
    <HStack gap={3} mb={6}>
      <Button size="sm" onClick={setToday}>
        Vandaag
      </Button>
      <Button size="sm" onClick={setThisWeek}>
        Deze week
      </Button>
      <Button size="sm" onClick={setLastWeek}>
        Vorige week
      </Button>
      <Button size="sm" onClick={setThisMonth}>
        Deze maand
      </Button>
      <Button size="sm" variant="outline" onClick={setAllTime}>
        Alles
      </Button>
    </HStack>
  );
}
