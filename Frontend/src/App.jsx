import { Box, useColorModeValue } from "@chakra-ui/react"
import { Route, Routes } from "react-router-dom"

import CreatePage from "./pages/CreatePage"
import HomePage from "./pages/HomePage"
import UserRegistrationPage from "./pages/UserRegistrationPage"
import Navbar from "./components/Navbar"


function App() {



  return (
    <Box minH = {"100vh"} bg={useColorModeValue("gray.100", "gray.900")}>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} /> 
        <Route path="/create" element={<CreatePage />} />
        <Route path="/register" element={<UserRegistrationPage />} />
      </Routes>
    </Box>
  );
}

export default App
