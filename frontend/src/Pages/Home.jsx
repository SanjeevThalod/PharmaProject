import React, { useEffect } from 'react'
import { Container, Box, Text, Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react"
import Login from '../Components/Authentication/Login'
import Signup from '../Components/Authentication/Signup'
import { useNavigate } from 'react-router-dom'

export default function Home() {
  return (
    <Container maxW="xl" centerContent justifyContent={'center'}>
      <Box d="flex"
        justifyContent="center"
        p={'3'}
        bg={'white'}
        w={'100%'}
        m="20px 0px 10px 0px"
        borderRadius={'5px'}
        borderWidth={'1px'}>
        <Text fontSize={'4xl'} fontFamily={'Work sans'} color={'black'} textAlign={'center'}>Pharma</Text>
      </Box>
      <Box d="flex"
        justifyContent="center"
        p={'3'}
        bg={'white'}
        w={'100%'}
        m="40px 0px 15px 0px"
        borderRadius={'5px'}
        borderWidth={'1px'}
        color={'balck'}>
        <Tabs variant='soft-rounded' colorScheme='purple'>
          <TabList mb='1em'>
            <Tab width={'50%'}>Login</Tab>
            <Tab width={'50%'}>SignUp</Tab>
          </TabList>
          <TabPanels color='black'>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <Signup />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  )
}
