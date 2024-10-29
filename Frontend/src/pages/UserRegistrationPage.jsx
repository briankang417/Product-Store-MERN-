import { Box, Button, Container, Heading, Input, useToast, useColorModeValue, VStack } from '@chakra-ui/react';
import { useState } from 'react';
import { useUserStore } from '../store/user'; // Import the user store

const UserRegistrationPage = () => {
    const [newUser, setNewUser] = useState({
        username: "",
        email: "",
        password: "",
    });

    const toast = useToast();
    const { registerUser } = useUserStore();

    const handleRegister = async () => {
        const { success, message } = await registerUser(newUser);
        toast({
            title: success ? "Success" : "Error",
            description: message,
            status: success ? "success" : "error",
            isClosable: true,
        });
        setNewUser({ username: "", email: "", password: "" }); // Reset form fields
    };

    return (
        <Container maxW={"container.sm"}>
            <VStack spacing={8}>
                <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
                    User Registration
                </Heading>

                <Box
                    w={"full"} bg={useColorModeValue("white", "gray.800")}
                    p={6} rounded={"lg"} shadow={"md"}
                >
                    <VStack spacing={4}>
                        <Input 
                            placeholder='Username'
                            value={newUser.username}
                            onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                        />

                        <Input 
                            placeholder='Email'
                            type='email'
                            value={newUser.email}
                            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                        />

                        <Input 
                            placeholder='Password'
                            type='password'
                            value={newUser.password}
                            onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                        />

                        <Button colorScheme='blue' onClick={handleRegister} w='full'>
                            Register
                        </Button>
                    </VStack>
                </Box>
            </VStack>
        </Container>
    );
};

export default UserRegistrationPage;
