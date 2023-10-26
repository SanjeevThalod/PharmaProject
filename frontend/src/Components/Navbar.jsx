import React, { useEffect, useState } from 'react';
import {
  Box,
  Flex,
  Avatar,
  HStack,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Links = ['Medicines', 'CareTakers', 'Team'];

const NavLink = (props) => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate(props.to); // Use the 'to' prop to specify the route
  };

  return (
    <button onClick={handleButtonClick}>
      {props.children}
    </button>
  );
};

export default function Simple() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [user, setUser] = useState();
  const navigate = useNavigate();
  // Fetching User Details
  const getUserInfo = async (token) => {
    try {
      const response = await axios.get('http://localhost:5000/api/user/users/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response.data.user);
      setUser(response.data.user);
    } catch (error) {
      // Handle any errors, e.g., network error, token invalid, etc.
      console.error('Error fetching user info:', error);
    }
  };
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('userInfo'));

    if (!token || !token.token) {
      navigate('/'); // Redirect to login if token is not found
    } else {
      setUser(token.token);
      getUserInfo(token.token);
    }
  }, [navigate]);


  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'}>
            <Box>Logo</Box>
            <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
              {Links.map((link) => (
                <NavLink key={link} to={`/${link.toLowerCase()}`}>{link}</NavLink>
              ))}

            </HStack>
          </HStack>
          <Flex alignItems={'center'}>
            <Menu>
              <MenuButton
                as={Button}
                rounded={'full'}
                variant={'link'}
                cursor={'pointer'}
                minW={0}
              >
                <Avatar
                  size={'sm'}
                  src={'https://icon-library.com/images/profile-png-icon/profile-png-icon-14.jpg'}
                />
              </MenuButton>
              <MenuList>
                {user && (
                  <>
                    <MenuItem>{user.name}</MenuItem>
                    <MenuItem>{user.email}</MenuItem>
                  </>
                )}
                <MenuDivider />
                <MenuItem color={'red'}>Log Out</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
