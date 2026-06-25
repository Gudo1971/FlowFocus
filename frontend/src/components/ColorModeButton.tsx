import { Button } from "@chakra-ui/react";
import { useTheme } from "next-themes";
import { useMemo } from "react";

type ThemeMode = "system" | "light" | "dark";

const modes: ThemeMode[] = ["system", "light", "dark"];

const modeMeta: Record<ThemeMode, { label: string; emoji: string }> = {
  system: { label: "Systeem", emoji: "🖥️" },
  light: { label: "Licht", emoji: "☀️" },
  dark: { label: "Donker", emoji: "🌙" },
};

export function ColorModeButton() {
  const { theme, setTheme } = useTheme();

  const currentMode = useMemo<ThemeMode>(() => {
    if (theme === "light" || theme === "dark" || theme === "system") {
      return theme;
    }

    return "system";
  }, [theme]);

  const handleCycleMode = () => {
    const currentIndex = modes.indexOf(currentMode);
    const nextMode = modes[(currentIndex + 1) % modes.length];
    setTheme(nextMode);
  };

  const { emoji, label } = modeMeta[currentMode];

  return (
    <Button
      onClick={handleCycleMode}
      variant="solid"
      size="lg"
      fontSize="xl"
      title={`Modus: ${label}`}
    >
      {emoji}
    </Button>
  );
}
