import { Box, Button, Flex, Heading, Input, Text } from "@chakra-ui/react";
import { useForm, useFieldArray } from "react-hook-form";

type HabitTask = {
  name: string;
  minutes: number;
};

type HabitListFormValues = {
  listName: string;
  tasks: HabitTask[];
};

export function HabitListForm() {
  const { register, control, handleSubmit } = useForm<HabitListFormValues>({
    defaultValues: {
      listName: "",
      tasks: [{ name: "", minutes: 25 }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "tasks",
  });

  function onSubmit(data: HabitListFormValues) {
    console.log("Habit list saved:", data);

    // TODO: backend koppeling
    // await createHabitList(data)
  }

  return (
    <Box
      bg="bg.surface"
      borderWidth="1px"
      borderColor="border.subtle"
      borderRadius="lg"
      p={6}
      maxW="500px"
      mx="auto"
    >
      <Heading size="md" mb={4}>
        Nieuwe Habit‑lijst
      </Heading>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Text mb={1}>Naam van de lijst</Text>
        <Input
          placeholder="Bijv. Studie, Fitness, Deep Work"
          {...register("listName", { required: true })}
          mb={4}
        />

        <Heading size="sm" mb={2}>
          Taken in deze lijst
        </Heading>

        <Flex direction="column" gap={4}>
          {fields.map((field, index) => (
            <Flex key={field.id} gap={3} align="center">
              <Input
                placeholder="Taaknaam"
                {...register(`tasks.${index}.name` as const, {
                  required: true,
                })}
              />

              <Input
                type="number"
                w="90px"
                placeholder="Min"
                {...register(`tasks.${index}.minutes` as const, {
                  required: true,
                  valueAsNumber: true,
                })}
              />

              <Button
                variant="outline"
                colorScheme="red"
                onClick={() => remove(index)}
              >
                X
              </Button>
            </Flex>
          ))}

          <Button
            variant="outline"
            onClick={() => append({ name: "", minutes: 25 })}
          >
            + Taak toevoegen
          </Button>
        </Flex>

        <Button colorScheme="purple" mt={6} w="100%" type="submit">
          Habit‑lijst opslaan
        </Button>
      </form>
    </Box>
  );
}
