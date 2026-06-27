// ---------------------------------------------
// FocusTimer Component (with 4-hour workblock)
// ---------------------------------------------

import { Box, Button, Flex, Heading, Text, Input } from "@chakra-ui/react";
import { useState, useEffect, useCallback, useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";

export function FocusTimer() {
  const workblockFocusSeconds = 60 * 60;
  const shortBreakSeconds = 5 * 60;
  const mediumBreakSeconds = 10 * 60;
  const longBreakSeconds = 15 * 60;

  // ---------------------------------------------
  // State
  // ---------------------------------------------
  const [seconds, setSeconds] = useState(25 * 60);
  const [running, setRunning] = useState(false);
  const [preset, setPreset] = useState(25 * 60);
  const [customMinutes, setCustomMinutes] = useState<number>(0);

  // Workblock state machine
  const [mode, setMode] = useState<
    "idle" | "focus" | "await_break" | "break" | "await_focus" | "done"
  >("idle");

  const [round, setRound] = useState(1); // 1–4
  const [isWorkblock, setIsWorkblock] = useState(false);

  const [breakPreset, setBreakPreset] = useState(shortBreakSeconds);

  const [startTime, setStartTime] = useState<number | null>(null);

  // Refs used to guard against duplicate saves
  const savingRef = useRef(false);
  const sessionCompletedRef = useRef(false);
  const audioUnlockedRef = useRef(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const queryClient = useQueryClient();
  // audio setup
  useEffect(() => {
    const audio = new Audio("/sounds/ding.mp3");
    audio.preload = "auto";
    audio.volume = 1;
    audioRef.current = audio;

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  const unlockAudio = useCallback(() => {
    if (audioUnlockedRef.current) return;
    if (!audioRef.current) return;

    const playAttempt = audioRef.current.play();
    if (!playAttempt) return;

    void playAttempt
      .then(() => {
        if (!audioRef.current) return;
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        audioUnlockedRef.current = true;
      })
      .catch(() => {
        // Browser blocked autoplay until user gesture; we'll try again later.
      });
  }, []);

  const playDing = useCallback(async () => {
    if (!audioRef.current) return;

    const sound = audioRef.current.cloneNode(true) as HTMLAudioElement;
    sound.volume = audioRef.current.volume;

    try {
      sound.currentTime = 0;
      await sound.play();
    } catch {
      // Retry once after reloading source to recover from transient playback issues.
      sound.load();
      try {
        sound.currentTime = 0;
        await sound.play();
      } catch {
        // Ignore playback failures; timer flow should continue even without sound.
      }
    }
  }, []);

  // ---------------------------------------------
  // Save session (idempotent)
  // ---------------------------------------------
  const saveSession = useCallback(async () => {
    if (!startTime || savingRef.current || sessionCompletedRef.current) return;

    savingRef.current = true;

    const startAt = new Date(startTime).toISOString();
    const endAt = new Date().toISOString();
    const duration = Math.round((Date.now() - startTime) / 60000);

    try {
      await fetch("http://localhost:3001/sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          startAt,
          endAt,
          duration,
          preset: preset / 60,
        }),
      });

      await queryClient.invalidateQueries({ queryKey: ["sessions"] });

      sessionCompletedRef.current = true;
      setStartTime(null);
    } finally {
      savingRef.current = false;
    }
  }, [preset, queryClient, startTime]);

  // ---------------------------------------------
  // Countdown interval
  // ---------------------------------------------
  useEffect(() => {
    if (!running) return;

    const interval = setInterval(() => {
      setSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [running]);

  // ---------------------------------------------
  // Timer finished handler (STATE MACHINE)
  // ---------------------------------------------
  useEffect(() => {
    if (!running || seconds !== 0) return;

    void playDing();

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setRunning(false);

    // WORKBLOCK LOGIC
    if (isWorkblock) {
      if (mode === "focus") {
        void saveSession();
        if (round >= 4) {
          setMode("done");
        } else {
          setMode("await_break");
        }
        return;
      }

      if (mode === "break") {
        setMode("await_focus");
        return;
      }
    }

    // NORMAL TIMER LOGIC
    void saveSession();
  }, [running, seconds, mode, isWorkblock, round, playDing, saveSession]);

  // ---------------------------------------------
  // Apply normal preset
  // ---------------------------------------------
  function applyPreset(mins: number) {
    if (running) return;
    if (!mins || mins <= 0) return;

    const newSeconds = mins * 60;

    sessionCompletedRef.current = false;
    setIsWorkblock(false);
    setMode("idle");

    setPreset(newSeconds);
    setSeconds(newSeconds);
    setStartTime(null);
  }

  // ---------------------------------------------
  // Apply 4-hour workblock preset
  // ---------------------------------------------
  function applyWorkblock() {
    if (running) return;

    setIsWorkblock(true);
    setMode("focus");
    setRound(1);

    const focusSeconds = workblockFocusSeconds;

    setPreset(focusSeconds);
    setSeconds(focusSeconds);

    sessionCompletedRef.current = false;
    setStartTime(null);
  }

  // ---------------------------------------------
  // UI calculations
  // ---------------------------------------------
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;

  const progress = seconds / preset;
  const radius = 90;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - progress);

  // ---------------------------------------------
  // Render
  // ---------------------------------------------
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

        {/* Workblock round indicator */}
        {isWorkblock && mode !== "idle" && (
          <Text fontSize="lg" fontWeight="bold" color="text.primary">
            Ronde {round} / 4
          </Text>
        )}

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

          {/* NEW: 4-hour workblock preset */}
          <Button colorScheme="purple" onClick={applyWorkblock}>
            4‑uur werkblok
          </Button>
        </Flex>

        {/* Pause presets (only visible in workblock mode) */}
        {isWorkblock && (
          <Flex gap={3}>
            <Button
              variant={breakPreset === shortBreakSeconds ? "solid" : "outline"}
              colorScheme={breakPreset === shortBreakSeconds ? "blue" : "gray"}
              aria-pressed={breakPreset === shortBreakSeconds}
              onClick={() => setBreakPreset(shortBreakSeconds)}
            >
              Pauze 5 min
            </Button>
            <Button
              variant={breakPreset === mediumBreakSeconds ? "solid" : "outline"}
              colorScheme={breakPreset === mediumBreakSeconds ? "blue" : "gray"}
              aria-pressed={breakPreset === mediumBreakSeconds}
              onClick={() => setBreakPreset(mediumBreakSeconds)}
            >
              Pauze 10 min
            </Button>
            <Button
              variant={breakPreset === longBreakSeconds ? "solid" : "outline"}
              colorScheme={breakPreset === longBreakSeconds ? "blue" : "gray"}
              aria-pressed={breakPreset === longBreakSeconds}
              onClick={() => setBreakPreset(longBreakSeconds)}
            >
              Pauze 15 min
            </Button>
          </Flex>
        )}

        {/* Custom input (hidden in workblock mode) */}
        {!isWorkblock && (
          <Flex gap={3} align="center">
            <Input
              type="number"
              placeholder="Minuten"
              w="100px"
              value={customMinutes}
              onChange={(e) => setCustomMinutes(Number(e.target.value))}
            />
            <Button
              variant="outline"
              onClick={() => applyPreset(customMinutes)}
            >
              Set
            </Button>
          </Flex>
        )}

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

        {/* WORKBLOCK CONFIRMATION UI */}
        {isWorkblock && mode === "focus" && !running && (
          <Button
            colorScheme="green"
            onClick={() => {
              unlockAudio();
              sessionCompletedRef.current = false;
              setRunning(true);
              setStartTime(Date.now());
            }}
          >
            Start focus
          </Button>
        )}

        {isWorkblock && mode === "await_break" && (
          <Flex direction="column" align="center" gap={3}>
            <Text fontSize="lg">Focusblok afgerond</Text>
            <Button
              colorScheme="blue"
              onClick={() => {
                unlockAudio();
                setSeconds(breakPreset);
                setMode("break");
                setRunning(true);
              }}
            >
              Start pauze
            </Button>
          </Flex>
        )}

        {isWorkblock && mode === "await_focus" && (
          <Flex direction="column" align="center" gap={3}>
            <Text fontSize="lg">Pauze afgerond</Text>
            <Button
              colorScheme="green"
              onClick={() => {
                unlockAudio();
                if (round < 4) {
                  sessionCompletedRef.current = false;
                  setRound(round + 1);
                  setSeconds(workblockFocusSeconds);
                  setMode("focus");
                  setRunning(true);
                  setStartTime(Date.now());
                } else {
                  setMode("done");
                }
              }}
            >
              Start focus
            </Button>
          </Flex>
        )}

        {isWorkblock && mode === "done" && (
          <Text fontSize="xl" fontWeight="bold">
            Werkblok afgerond
          </Text>
        )}

        {/* Annuleer werkblok */}
        {isWorkblock && mode !== "done" && (
          <Button
            variant="outline"
            colorScheme="red"
            onClick={() => {
              setIsWorkblock(false);
              setMode("idle");
              setRound(1);
              setRunning(false);
              setSeconds(25 * 60);
              setPreset(25 * 60);
              setStartTime(null);
            }}
          >
            Annuleer werkblok
          </Button>
        )}

        {/* NORMAL TIMER CONTROLS */}
        {!isWorkblock && (
          <Flex gap={4}>
            <Button
              colorScheme="green"
              onClick={() => {
                unlockAudio();
                sessionCompletedRef.current = false;
                setRunning(true);
                setStartTime(Date.now());
              }}
              disabled={running}
            >
              Start
            </Button>

            <Button
              colorScheme="red"
              onClick={() => {
                setRunning(false);

                const elapsed = preset - seconds;
                if (elapsed >= 60) void saveSession();
              }}
              disabled={!running}
            >
              Stop
            </Button>

            <Button
              variant="outline"
              onClick={() => {
                sessionCompletedRef.current = false;
                setRunning(false);
                setSeconds(preset);
                setStartTime(null);
              }}
            >
              Reset
            </Button>
          </Flex>
        )}
      </Flex>
    </Box>
  );
}
