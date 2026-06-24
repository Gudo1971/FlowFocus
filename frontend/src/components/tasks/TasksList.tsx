import { VStack } from "@chakra-ui/react";
import { useState } from "react";
import { TaskCard } from "../cards/TaskCard";

export function TasksList() {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Dagstart check-in", completed: false },
    { id: 2, title: "Focus sessie 1", completed: true },
    { id: 3, title: "Inbox verwerken", completed: false },
  ]);

  function toggleTask(id: number) {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    );
  }

  return (
    <VStack gap={3} align="stretch">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          title={task.title}
          completed={task.completed}
          onToggle={() => toggleTask(task.id)}
        />
      ))}
    </VStack>
  );
}
