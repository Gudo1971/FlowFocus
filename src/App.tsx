import { Box, Container, Text } from "@chakra-ui/react";
import { Header } from "./components/Header";

export default function App() {
  return (
    <Box minH="100vh" bg="bg.page" color="text.primary">
      <Header />
      <Container maxW="container.lg" py={8}>
        <Text color="text.muted">
          Je project is succesvol gestart. Tijd om te bouwen.
        </Text>
      </Container>
    </Box>
  );
}
