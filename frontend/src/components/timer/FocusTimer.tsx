import { Box, Button, Flex, Heading, Text, Input } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useFocusHistory } from "../../hooks/useFocusHistory";

// Audio object buiten de component (voorkomt herladen)
const dingSound = new Audio("/sounds/ding.mp3");
dingSound.volume = 1;

export function FocusTimer() {
  const [seconds, setSeconds] = useState(25 * 60);
  const [running, setRunning] = useState(false);
  const [preset, setPreset] = useState(25 * 60);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [customMinutes, setCustomMinutes] = useState<number>(0);

  const { addSession } = useFocusHistory();

  // Countdown effect
  useEffect(() => {
    if (!running) return;

    const interval = setInterval(() => {
      setSeconds((prev) => {
        if (prev > 1) return prev - 1;

        // Timer reached zero: stop and persist completed session
        clearInterval(interval);
        dingSound.currentTime = 0;
        void dingSound.play();
        setRunning(false);

        if (startTime) {
          addSession({
            id: crypto.randomUUID(),
            start: startTime,
            end: Date.now(),
            duration: preset,
            preset,
          });
        }

        return 0;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [addSession, preset, running, startTime]);

  // Format mm:ss
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;

  // Progress percentage
  const progress = seconds / preset;

  // Circle math
  const radius = 90;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - progress);

  function applyPreset(mins: number) {
    if (!mins || mins <= 0) return;
    const newSeconds = mins * 60;
    setPreset(newSeconds);
    setSeconds(newSeconds);
    setRunning(false);
    setStartTime(null);
  }

  return (
    <Box
      bg="bg.surface"
      borderWidth="1px"
      borderColor="border.subtle"
      borderRadius="lg"
      p={6}
    >
      <Flex direction="column" align="center" gap={6}>
        <Heading size="md" color="text.primary">
          Focus Timer
        </Heading>

        {/* Presets */}
        <Flex gap={3}>
          <Button variant="outline" onClick={() => applyPreset(25)}>
            25 min
          </Button>
          <Button variant="outline" onClick={() => applyPreset(45)}>
            45 min
          </Button>
          <Button variant="outline" onClick={() => applyPreset(60)}>
            60 min
          </Button>
        </Flex>

        {/* Custom input */}
        <Flex gap={3} align="center">
          <Input
            type="number"
            placeholder="Minuten"
            w="100px"
            value={customMinutes}
            onChange={(e) => setCustomMinutes(Number(e.target.value))}
          />
          <Button variant="outline" onClick={() => applyPreset(customMinutes)}>
            Set
          </Button>
        </Flex>

        {/* Animated ring */}
        <Box position="relative" w="220px" h="220px">
          <svg width="220" height="220">
            <circle
              cx="110"
              cy="110"
              r={radius}
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="10"
              fill="none"
            />

            <circle
              cx="110"
              cy="110"
              r={radius}
              stroke="var(--chakra-colors-blue-400)"
              strokeWidth="10"
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              style={{ transition: "stroke-dashoffset 0.5s linear" }}
            />
          </svg>

          {/* Timer text in center */}
          <Flex
            position="absolute"
            top="0"
            left="0"
            w="100%"
            h="100%"
            align="center"
            justify="center"
          >
            <Text fontSize="4xl" fontWeight="bold" color="text.primary">
              {minutes}:{secs.toString().padStart(2, "0")}
            </Text>
          </Flex>
        </Box>

        {/* Controls */}
        <Flex gap={4}>
          <Button
            colorScheme="green"
            onClick={() => {
              setRunning(true);
              setStartTime(Date.now());
            }}
            disabled={running}
          >
            Start
          </Button>

          <Button
            colorScheme="red"
            onClick={() => setRunning(false)}
            disabled={!running}
          >
            Stop
          </Button>

          <Button
            variant="outline"
            onClick={() => {
              setRunning(false);
              setSeconds(preset);
              setStartTime(null);
            }}
          >
            Reset
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
}
