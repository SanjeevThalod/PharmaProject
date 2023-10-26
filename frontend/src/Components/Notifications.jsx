import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TimePicker from 'react-time-picker';
import {
    Box,
    Button,
    Heading,
    Text,
    VStack,
    Divider,
    useToast,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    FormControl,
    FormLabel,
    Select,
    Textarea,
    Button as ChakraButton,
    Input,
    IconButton,
    HStack,
} from '@chakra-ui/react';
import { FaPlus, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function Notifications() {
    const [notifications, setNotifications] = useState([]);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editNotification, setEditNotification] = useState(null);
    const [editedNotification, setEditedNotification] = useState({
        deliveryMethod: '',
        medicine: '',
        message: '',
        time: ['00:00'],
    });
    const [t, setT] = useState('');
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [newNotification, setNewNotification] = useState({
        deliveryMethod: '',
        medicine: '',
        message: '',
        times: [{ time: '00:00', showTimePicker: true }],
    });
    const navigate = useNavigate();
    const toast = useToast();

    const fetchNotifications = async (token) => {
        try {
            const response = await axios.post('http://localhost:5000/api/notification/user', {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setNotifications(response.data.notifications);
        } catch (error) {
            console.log(error);
        }
    };

    const addTime = () => {
        const updatedTimes = [...newNotification.times];
        updatedTimes.push({ time: '00:00', showTimePicker: true });
        setNewNotification({ ...newNotification, times: updatedTimes });
        setShowTimePicker(true); // Make sure to set the showTimePicker flag to true
    };


    const removeTime = (index) => {
        const updatedTimes = [...newNotification.times];
        updatedTimes.splice(index, 1);
        setNewNotification({ ...newNotification, times: updatedTimes });
    };


    const openAddModal = () => {
        setIsAddModalOpen(true);
    };

    const closeAddModal = () => {
        setIsAddModalOpen(false);
        setShowTimePicker(false);
    };

    const populateEditedNotification = (notification) => {
        setEditNotification(notification);
        setEditedNotification({
            deliveryMethod: notification.deliveryMethod,
            medicine: notification.medicine,
            message: notification.message,
            time: notification.time,
        });
    };

    const openEditModal = (notification) => {
        populateEditedNotification(notification);
        setIsEditModalOpen(true);
    };

    const closeEditModal = () => {
        setEditNotification(null);
        setIsEditModalOpen(false);
    };

    const handleAddSubmit = async () => {
        // Check for empty fields in newNotification
        if (
            newNotification.deliveryMethod === '' ||
            newNotification.medicine === '' ||
            newNotification.message === '' ||
            (newNotification.times && newNotification.times.some((timeObj) => timeObj.time === '00:00'))
        ) {
            toast({
                title: 'Please fill in all fields',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        try {
            // Remove the showTimePicker flag before sending the request
            const timeData = newNotification.times.map((timeObj) => timeObj.time);
            console.log(timeData);
            const notificationData = {
                ...newNotification,
                time: timeData,
            };
            console.log(notificationData);
            const response = await axios.post('http://localhost:5000/api/notification/create', notificationData, {
                headers: {
                    Authorization: `Bearer ${t}`
                }
            });

            closeAddModal();
            fetchNotifications(response.data.token);
            toast({
                title: 'Notification created',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
        } catch (error) {
            console.log(error);
            toast({
                title: 'Error creating notification',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    };

    const handleEditSubmit = async () => {
        if (
            editedNotification.deliveryMethod === '' ||
            editedNotification.medicine === '' ||
            editedNotification.message === '' ||
            editedNotification.time.some((time) => time === '00:00')
        ) {
            toast({
                title: 'Please fill in all fields',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
            return;
        }
        try {
            const response = await axios.put(`http://localhost:5000/api/notification/${editNotification._id}`, editNotification, {
                headers: {
                    Authorization: `Bearer ${t}`
                }
            });
            closeEditModal();
            fetchNotifications(response.data.token);
            toast({
                title: 'Notification updated',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
        } catch (error) {
            console.log(error);
            toast({
                title: 'Error updating notification',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    };

    const handleDeleteNotification = async (notificationId) => {
        try {
            const response = await axios.delete(`http://localhost:5000/api/notification/${notificationId}`, {
                headers: {
                    Authorization: `Bearer ${t}`
                }
            });

            const updatedNotifications = notifications.filter((notification) => notification.id !== notificationId);
            setNotifications(updatedNotifications);

            toast({
                title: 'Notification deleted',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
        } catch (error) {
            console.log(error);
            toast({
                title: 'Error deleting notification',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    };

    useEffect(() => {
        const token = JSON.parse(localStorage.getItem('userInfo'));
        if (!token || !token.token) {
            navigate('/');
        } else {
            fetchNotifications(token.token);
            setT(token.token);
        }
    }, [navigate, notifications]);

    return (
        <Box p={4}>
            <Heading as="h1" size="lg" mb={4}>
                Notifications
            </Heading>
            <Button colorScheme="teal" size="sm" mb={4} onClick={openAddModal}>
                Create New Notification
            </Button>
            <Box display="flex" flexWrap="wrap" justifyContent="space-between">
                {notifications.map((notification) => (
                    <Box
                        key={notification.id}
                        width={['100%', '45%', '30%']}
                        borderWidth="1px"
                        borderRadius="lg"
                        p={4}
                        position="relative"
                        mb={4}
                    >
                        <VStack spacing={2} alignItems={'flex-start'} mt={5}>
                            <Text>{notification.sentAt}</Text>
                            <Text>Type: {notification.deliveryMethod}</Text>
                            <Text>
                                Medicine: {notification.medicine} 
                            </Text>
                            <Text>Message: {notification.message}</Text>
                            <Text>Time: {notification.time.join(" ")}</Text>
                        </VStack>
                        <Divider mt={4} />
                        <IconButton
                            aria-label="Delete Notification"
                            icon={<FaTrash />}
                            position="absolute"
                            top="10px"
                            right="10px"
                            onClick={() => handleDeleteNotification(notification._id)}
                        />
                        <Button
                            colorScheme="teal"
                            size="sm"
                            onClick={() => openEditModal(notification)}
                            position="absolute"
                            top="10px"
                            left="10px"
                        >
                            Edit
                        </Button>
                    </Box>
                ))}
            </Box>
            <Modal isOpen={isAddModalOpen} onClose={closeAddModal}>
                <ModalOverlay />
                <ModalContent maxW={'380px'}>
                    <ModalHeader>Create New Notification</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl maxW={"380px"}>
                            <FormLabel>Delivery Method</FormLabel>
                            <Select
                                maxW={'380px'}
                                value={newNotification.deliveryMethod}
                                onChange={(e) => setNewNotification({ ...newNotification, deliveryMethod: e.target.value })}
                            >
                                <option value="">Select one</option>
                                <option value="SMS">SMS</option>
                                <option value="Call">Call</option>
                                <option value="Email">Email</option>
                                <option value="WhatsApp">WhatsApp</option>
                            </Select>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Medicine</FormLabel>
                            <Input
                                value={newNotification.medicine}
                                onChange={(e) => setNewNotification({ ...newNotification, medicine: e.target.value })}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Message</FormLabel>
                            <Textarea
                                value={newNotification.message}
                                onChange={(e) => setNewNotification({ ...newNotification, message: e.target.value })}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Time</FormLabel>
                            <VStack align="flex-start">
                                {newNotification.times.map((timeObj, index) => (
                                    <div key={index}>
                                        <HStack>
                                            {timeObj.showTimePicker && (
                                                <TimePicker
                                                    onChange={(newTime) => {
                                                        const updatedTimes = [...newNotification.times];
                                                        updatedTimes[index].time = newTime;
                                                        setNewNotification({ ...newNotification, times: updatedTimes });
                                                    }}
                                                    value={timeObj.time}
                                                    format="HH:mm" // Set the format to 24-hour format
                                                />
                                            )}
                                            {index > 0 && (
                                                <IconButton
                                                    aria-label="Delete Time"
                                                    icon={<FaTrash />}
                                                    onClick={() => removeTime(index)}
                                                />
                                            )}
                                        </HStack>
                                    </div>
                                ))}
                            </VStack>

                            <HStack justifyContent="space-between" alignItems="center" mt={2}>
                                <IconButton aria-label="Add Time" icon={<FaPlus />} onClick={addTime} />
                            </HStack>
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <ChakraButton colorScheme="teal" onClick={handleAddSubmit}>
                            Create Notification
                        </ChakraButton>
                        <ChakraButton colorScheme="gray" ml={3} onClick={closeAddModal}>
                            Cancel
                        </ChakraButton>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <Modal isOpen={isEditModalOpen} onClose={closeEditModal}>
                <ModalOverlay />
                <ModalContent maxW={'380px'}>
                    <ModalHeader>Edit Notification</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl maxW={"380px"}>
                            <FormLabel>Delivery Method</FormLabel>
                            <Select
                                maxW={'380px'}
                                value={editedNotification.deliveryMethod}
                                onChange={(e) =>
                                    setEditedNotification({ ...editedNotification, deliveryMethod: e.target.value })
                                }
                            >
                                <option value="">Select one</option>
                                <option value="SMS">SMS</option>
                                <option value="Call">Call</option>
                                <option value="Email">Email</option>
                            </Select>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Medicine</FormLabel>
                            <Input
                                value={editedNotification.medicine}
                                onChange={(e) => setEditedNotification({ ...editedNotification, medicine: e.target.value })}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Message</FormLabel>
                            <Textarea
                                value={editedNotification.message}
                                onChange={(e) => setEditedNotification({ ...editedNotification, message: e.target.value })}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Time</FormLabel>
                            <VStack align="flex-start">
                                {showTimePicker && editedNotification.time.map((time, index) => (
                                    <div key={index}>
                                        <HStack>
                                            <TimePicker
                                                onChange={(newTime) => {
                                                    const updatedTimes = [...editedNotification.time];
                                                    updatedTimes[index] = newTime;
                                                    setEditedNotification({ ...editedNotification, time: updatedTimes });
                                                }}
                                                value={time}
                                                format="HH:mm" // Set the format to 24-hour format
                                            />
                                            {index > 0 && (
                                                <IconButton
                                                    aria-label="Delete Time"
                                                    icon={<FaTrash />}
                                                    onClick={() => removeTime(index)}
                                                />
                                            )}
                                        </HStack>
                                    </div>
                                ))}
                            </VStack>
                            <HStack justifyContent="space-between" alignItems="center" mt={2}>
                                <IconButton aria-label="Add Time" icon={<FaPlus />} onClick={addTime} />
                            </HStack>
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <ChakraButton colorScheme="teal" onClick={handleEditSubmit}>
                            Update Notification
                        </ChakraButton>
                        <ChakraButton colorScheme="gray" ml={3} onClick={closeEditModal}>
                            Cancel
                        </ChakraButton>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
}

export default Notifications;
