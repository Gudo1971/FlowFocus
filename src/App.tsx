import { Box, Container } from "@chakra-ui/react";
import { Header } from "./components/Header";
import { DashboardPage } from "./pages/DashboardPage";

export default function App() {
  return (
    <Box minH="100vh" bg="bg.page" color="text.primary">
      <Header />
      <Container maxW="container.lg" py={8}>
        <DashboardPage />
      </Container>
    </Box>
  );
}
