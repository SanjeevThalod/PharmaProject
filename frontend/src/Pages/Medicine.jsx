import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Heading,
  Input,
  Text,
  VStack,
  Divider,
  useToast,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input as ChakraInput,
  Button as ChakraButton,
  SimpleGrid,
} from '@chakra-ui/react';
import { EditIcon, AddIcon } from '@chakra-ui/icons';

function Medicine() {
  const [medicines, setMedicines] = useState([]);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const toast = useToast();

  const fetchMedicines = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/medication/all');
      console.log(response.data.data);
      setMedicines(response.data.data);
    } catch (error) {
      console.error('Error fetching medicines:', error);
    }
  };

  useEffect(() => {
    // Fetch medicines from your API
    fetchMedicines();
  }, []);

  const [editMedicineId, setEditMedicineId] = useState(null);
  const [editedMedicine, setEditedMedicine] = useState({});
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Function to open the edit modal
  const openEditModal = (medicine) => {
    setEditMedicineId(medicine._id);
    setEditedMedicine({ ...medicine });
    setIsEditModalOpen(true);
  };

  // Function to close the edit modal
  const closeEditModal = () => {
    setEditMedicineId(null);
    setIsEditModalOpen(false);
  };

  // Function to handle form submission for updating the medicine
  const handleEditSubmit = async () => {
    try {
      // Create an object with the fields to update
      const updatedFields = {
        name: editedMedicine.name,
        dosage: editedMedicine.dosage,
        prescriptionDetails: editedMedicine.prescriptionDetails,
      };

      // Make the PUT request to your API to update the medicine
      await axios.put(`http://localhost:5000/api/medication/${editMedicineId}`, updatedFields);

      // Display a success message
      toast({
        title: 'Medicine updated',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      // Close the edit modal
      closeEditModal();

      // Fetch updated medicine list after updating
      fetchMedicines();
    } catch (error) {
      console.error('Error updating medicine:', error);

      // Display an error message if the update fails
      toast({
        title: 'Error updating medicine',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newMedicine, setNewMedicine] = useState({
    name: '',
    dosage: '',
    prescriptionDetails: '',
  });

  // Function to open the "Add Medicine" modal
  const openAddModal = () => {
    setIsAddModalOpen(true);
  };

  // Function to close the "Add Medicine" modal
  const closeAddModal = () => {
    setIsAddModalOpen(false);
  };

  // Function to handle form submission for adding a new medicine
  const handleAddSubmit = async () => {
    try {
      // Make a POST request to your API to add the new medicine
      await axios.post('http://localhost:5000/api/medication/create', newMedicine);

      // Display a success message
      toast({
        title: 'Medicine added',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      // Close the "Add Medicine" modal
      closeAddModal();

      // Fetch updated medicine list after adding
      fetchMedicines();
    } catch (error) {
      console.error('Error adding medicine:', error);

      // Display an error message if the addition fails
      toast({
        title: 'Error adding medicine',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };
  const navigateBack = () => {
    navigate('/main'); // Use the history object to navigate to the main page (adjust the route as needed)
  };

  return (
    <Box p={4}>
        <Button colorScheme="teal" size="sm" mb={4} onClick={navigateBack}>
        Back to Main Page
      </Button>
      <Heading as="h1" size="lg" mb={4}>
        Medicine List
      </Heading>
      <Input
        placeholder="Search by name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        mb={4}
      />
      <Button colorScheme="teal" size="sm" mb={4} onClick={openAddModal}>
        Add New Medicine
      </Button>
      <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing={4}>
        {medicines
          .filter((medicine) => medicine.name.toLowerCase().includes(searchTerm.toLowerCase()))
          .map((medicine) => (
            <Box key={medicine._id} borderWidth="1px" borderRadius="lg" p={4} position="relative">
              <IconButton
                colorScheme="teal"
                size="sm"
                aria-label="Edit Medicine"
                icon={<EditIcon />}
                position="absolute"
                top={2}
                right={2}
                onClick={() => openEditModal(medicine)}
              />
              <VStack spacing={2}>
                <Heading as="h3" size="md">
                  {medicine.name}
                </Heading>
                <Text>Prescription Details: {medicine.prescriptionDetails}</Text>
                <Text>Average Dose: {medicine.dosage}</Text>
                <Text>Price: {medicine.price}</Text>
              </VStack>
              <Divider mt={4} />
            </Box>
          ))}
      </SimpleGrid>
      {/* Edit Medicine Modal */}
      <Modal isOpen={isEditModalOpen} onClose={closeEditModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Medicine</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <ChakraInput
                value={editedMedicine.name}
                onChange={(e) => setEditedMedicine({ ...editedMedicine, name: e.target.value })}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Dosage</FormLabel>
              <ChakraInput
                value={editedMedicine.dosage}
                onChange={(e) => setEditedMedicine({ ...editedMedicine, dosage: e.target.value })}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Prescription Details</FormLabel>
              <ChakraInput
                value={editedMedicine.prescriptionDetails}
                onChange={(e) =>
                  setEditedMedicine({ ...editedMedicine, prescriptionDetails: e.target.value })
                }
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <ChakraButton colorScheme="teal" onClick={handleEditSubmit}>
              Save Changes
            </ChakraButton>
            <ChakraButton colorScheme="gray" ml={3} onClick={closeEditModal}>
              Cancel
            </ChakraButton>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {/* Add Medicine Modal */}
      <Modal isOpen={isAddModalOpen} onClose={closeAddModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Medicine</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <ChakraInput
                value={newMedicine.name}
                onChange={(e) => setNewMedicine({ ...newMedicine, name: e.target.value })}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Dosage</FormLabel>
              <ChakraInput
                value={newMedicine.dosage}
                onChange={(e) => setNewMedicine({ ...newMedicine, dosage: e.target.value })}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Prescription Details</FormLabel>
              <ChakraInput
                value={newMedicine.prescriptionDetails}
                onChange={(e) =>
                  setNewMedicine({ ...newMedicine, prescriptionDetails: e.target.value })
                }
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <ChakraButton colorScheme="teal" onClick={handleAddSubmit}>
              Add Medicine
            </ChakraButton>
            <ChakraButton colorScheme="gray" ml={3} onClick={closeAddModal}>
              Cancel
            </ChakraButton>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default Medicine;
