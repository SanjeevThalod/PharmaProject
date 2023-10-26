import { Box, Grid, GridItem, Heading, SimpleGrid, Stack, Text, VStack } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CareTaker(props) {
    const [token, setToken] = useState('');
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    const fetchUsers = async () => {
        try {
            const { data } = await axios.get('http://localhost:5000/api/user/users');
            setUsers(data);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        const token = JSON.parse(localStorage.getItem('userInfo'));
        if (!token || !token.token) {
            navigate('/');
        } else {
            setToken(token.token);
            fetchUsers();
        }
    })
    return (
        <div>
            <Box p={4}>
                <Heading as="h1" size="xl" mb={4}>
                    User List
                </Heading>
                <SimpleGrid>

                <VStack templateColumns="repeat(3, 1fr)" gap={4}>
                    {users && users.map((user) => (
                        <GridItem key={user.id} borderWidth="1px" borderRadius="lg" p={4}>
                            <Stack spacing={2}>
                                <Heading as="h2" size="md">
                                    {user.name}
                                </Heading>
                                <Text>{user.email}</Text>
                                {/* You can add more user information here */}
                            </Stack>
                        </GridItem>
                    ))}
                </VStack>
                </SimpleGrid>
            </Box>
        </div>
    );
}

export default CareTaker;