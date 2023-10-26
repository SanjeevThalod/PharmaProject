import React, { useState } from 'react';
import { useToast } from '@chakra-ui/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack } from '@chakra-ui/react'

export default function Signup() {
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [phone,setPhone] = useState('');
    const [conpass, setConpass] = useState('');
    const [loading, setLoading] = useState(false);
    const toast = useToast();

    const submitHandler = async () => {
        setLoading(true);
        if (!name || !email || !pass || !conpass || !phone) {
            toast({
                title: "All fields are compulsory",
                status: 'Warning',
                duration: 4000,
                isClosable: true,
                position: 'bottom'
            });
            setLoading(false);
            return;
        }
        if (pass !== conpass) {
            toast({
                title: "Both password must be Equal!",
                status: 'Warning',
                duration: 4000,
                isClosable: true,
                position: 'bottom'
            });
            setLoading(false);
            return;
        }

        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            const mal = {
                "name":name,
                "email":email,
                "password":pass,
                "phone":phone
            }
            const { data } = await axios.post(`http://localhost:5000/api/user/signup`, mal, config);
            toast({
                title: "Registration Successfull!",
                status: 'success',
                duration: 4000,
                isClosable: true,
                position: 'bottom'
            });
            localStorage.setItem("userInfo", JSON.stringify(data));
            navigate('/main');
        } catch (error) {
            console.log({error:error});
        }
    }
    return (
        <VStack spacing='5px'>
            <FormControl id='first-name' isRequired>
                <FormLabel>Name</FormLabel>
                <Input placeholder='Enter Your Name'
                    variant='filled'
                    colorScheme='purple.400'
                    bg="purple.100"
                    _hover={{ bg: 'purple.100' }}
                    _focus={{ bg: 'white', borderColor: 'purple.500' }}
                    onChange={(event) => setName(event.target.value)} />
            </FormControl>
            <FormControl id='email' isRequired>
                <FormLabel>Email</FormLabel>
                <Input placeholder='Enter Your Email'
                    variant='filled'
                    colorScheme='purple.400'
                    bg="purple.100"
                    _hover={{ bg: 'purple.100' }} _
                    _focus={{ bg: 'white', borderColor: 'purple.500' }}
                    onChange={(event) => setEmail(event.target.value)} />
            </FormControl>
            <FormControl id='mobile-phone' isRequired>
                <FormLabel>Mobile</FormLabel>
                <Input placeholder='Enter you 10-digit number'
                    variant='filled'
                    colorScheme='purple.400'
                    bg="purple.100"
                    _hover={{ bg: 'purple.100' }}
                    _focus={{ bg: 'white', borderColor: 'purple.500' }}
                    onChange={(event) => setPhone(event.target.value)} />
            </FormControl>
            <FormControl id='password' isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                    <Input placeholder='Enter Your Password'
                        variant='filled'
                        type={show ? 'text' : 'password'}
                        colorScheme='purple.400'
                        bg="purple.100"
                        _hover={{ bg: 'purple.100' }} _
                        _focus={{ bg: 'white', borderColor: 'purple.500' }}
                        onChange={(event) => setPass(event.target.value)} />
                    <InputRightElement >
                        <Button h='1.75rem' size='sm' bg='purple.100' mr={4} onClick={() => show ? setShow(false) : setShow(true)}>{show ? 'Show' : 'Hide'}</Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>
            <FormControl isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                    <Input placeholder='Confirm Your Password'
                        variant='filled'
                        type={show ? 'text' : 'password'}
                        colorScheme='purple.400'
                        bg="purple.100"
                        _hover={{ bg: 'purple.100' }} _
                        _focus={{ bg: 'white', borderColor: 'purple.500' }}
                        onChange={(event) => setConpass(event.target.value)} />
                    <InputRightElement >
                        <Button h='1.75rem' size='sm' bg='purple.100' mr={4} onClick={() => show ? setShow(false) : setShow(true)}>{show ? 'Show' : 'Hide'}</Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>
            <Button
                bg={'purple'}
                mt={4}
                width={'100%'}
                color={'white'}
                _hover={{ bg: 'purple.500' }}
                isLoading={loading}
                onClick={submitHandler}
            >SignUp</Button>
        </VStack>
    )
}
