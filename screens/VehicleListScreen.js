import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, ScrollView} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import {Card, Button, TextInput, Title} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  createVehicleRegistration,
  deleteVehicleRegistration,
} from '../services/vehicleRegistrationServiceFA';

const VehicleListScreen = ({navigation}) => {
  const [vehicleRegistrations, setVehicleRegistrations] = useState([]);
  // const [userId, setUserId] = useState(null);
  // const [showCreateForm, setShowCreateForm] = useState(false);
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const [activeVehicleId, setActiveVehicleId] = useState(null);

  const isFocused = useIsFocused();

  useEffect(() => {
    // Fetch vehicle registrations from AsyncStorage
    const fetchVehicleRegistrations = async () => {
      try {
        const registrations = await AsyncStorage.getItem(
          'vehicle_registrations',
        );
        const parsedRegistrations = JSON.parse(registrations) || [];
        setVehicleRegistrations(parsedRegistrations);
      } catch (error) {
        console.log(error);
      }
    };

    if (isFocused) {
      fetchVehicleRegistrations();
    }
  }, [isFocused]);

  useEffect(() => {
    // Fetch vehicle registrations from AsyncStorage
    AsyncStorage.getItem('vehicle_registrations')
      .then(registrations => {
        const parsedRegistrations = JSON.parse(registrations);
        if (parsedRegistrations) {
          setVehicleRegistrations(parsedRegistrations);
        }
      })
      .catch(error => console.log(error));
  }, []);

  const handleVehicle = async () => {
    try {
      const response = await createVehicleRegistration(name, number);
      if (response.status === true) {
        // Update vehicleRegistrations state and AsyncStorage
        const updatedRegistrations = [...vehicleRegistrations, response.data];
        setVehicleRegistrations(updatedRegistrations);
        AsyncStorage.setItem(
          'vehicle_registrations',
          JSON.stringify(updatedRegistrations),
        );
        handleVehicleParts(response.data);
        // setShowCreateForm(false);
        setName('');
        setNumber('');
      } else {
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = vehicle => {
    navigation.navigate('InternalRoutes', {
      screen: 'EditVehicle',
      params: {vehicle},
    });
  };

  const handleDelete = async vehicle => {
    // Show confirmation dialog or prompt to confirm deletion

    try {
      const response = await deleteVehicleRegistration(vehicle.id);
      if (response.status === true) {
        // Delete the vehicle registration from AsyncStorage
        const vehicleRegistrationsDel = await AsyncStorage.getItem(
          'vehicle_registrations',
        );
        const parsedRegistrations = JSON.parse(vehicleRegistrationsDel) || [];
        const updatedRegistrations = parsedRegistrations.filter(
          registration => registration.id !== vehicle.id,
        );
        await AsyncStorage.setItem(
          'vehicle_registrations',
          JSON.stringify(updatedRegistrations),
        );

        // Update the vehicleRegistrations state
        setVehicleRegistrations(updatedRegistrations);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // Retrieve the active_vehicle from async storage
    const getActiveVehicleId = async () => {
      try {
        let vehicle = await AsyncStorage.getItem('active_vehicle');
        if (vehicle !== null) {
          vehicle = JSON.parse(vehicle);
          setActiveVehicleId(vehicle.id.toString());
        }
      } catch (error) {
        console.log('Error retrieving active_vehicle:', error);
      }
    };
    getActiveVehicleId();
  }, []);

  const handleUseNow = async vehicle => {
    try {
      // Update the active_vehicle in async storage
      await AsyncStorage.setItem('active_vehicle', JSON.stringify(vehicle));
      await AsyncStorage.setItem('total_kilometers', vehicle.distance);
      setActiveVehicleId(vehicle.id.toString());

      navigation.navigate('Dashboard');
    } catch (error) {
      console.log('Error updating active_vehicle:', error);
    }
  };

  const handleVehicleParts = async vehicle => {
    try {
      // Update the active_vehicle_id in async storage
      await AsyncStorage.setItem('active_vehicle', JSON.stringify(vehicle));
      if (vehicle) {
        setActiveVehicleId(vehicle.id.toString());
      }

      navigation.navigate('PartsRegistration');
    } catch (error) {
      console.log('Error updating active_vehicle:', error);
    }
  };

  const handleCardClick = vehicle => {
    navigation.navigate('InternalRoutes', {
      screen: 'AllPartsByVehicle',
      params: {vehicle},
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {vehicleRegistrations.length > 0 && (
        <View style={styles.listContainer}>
          <Text style={styles.heading}>Vehicle List</Text>
          {vehicleRegistrations.map((vehicle, index) => (
            <Card
              key={vehicle.id}
              style={styles.card}
              onPress={() => handleCardClick(vehicle)}>
              <Card.Content>
                <Title>Name: {vehicle.name}</Title>
                <Text>Number: {vehicle.number}</Text>
                {/* <Text>
                  Distance: {vehicle.distance ? vehicle.distance : 0} km
                </Text> */}
              </Card.Content>
              <Card.Actions>
                {vehicle.id.toString() === activeVehicleId ? (
                  <Button
                    style={styles.useNowButtonActive}
                    textColor={'#ffffff'}>
                    Using Now
                  </Button>
                ) : (
                  <Button
                    style={styles.useNowButton}
                    textColor={'#015802'}
                    onPress={() => handleUseNow(vehicle)}>
                    Use Now
                  </Button>
                )}
                <Button onPress={() => handleEdit(vehicle)}>Edit</Button>
                {vehicle.id.toString() !== activeVehicleId && (
                  <Button
                    style={styles.buttonDelete}
                    onPress={() => handleDelete(vehicle)}>
                    Delete
                  </Button>
                )}
              </Card.Actions>
            </Card>
          ))}
        </View>
      )}
      {vehicleRegistrations.length === 0 && (
        <View style={styles.formContainer}>
          <Text style={styles.title}>Vehicle Registration</Text>
          <TextInput
            label="Name"
            mode="outlined"
            value={name}
            onChangeText={setName}
            style={styles.input}
          />
          <TextInput
            label="Number"
            mode="outlined"
            value={number}
            onChangeText={setNumber}
            style={styles.input}
          />
          <Button
            mode="contained"
            onPress={handleVehicle}
            style={styles.button}>
            Register Vehicle and Add Parts!
          </Button>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
  },
  listContainer: {
    flexGrow: 1,
  },
  formContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  card: {
    marginBottom: 16,
  },
  input: {
    width: '100%',
    marginBottom: 16,
  },
  button: {
    width: '100%',
  },
  useNowButton: {
    borderColor: '#015802',
    width: 120,
  },
  useNowButtonActive: {
    backgroundColor: '#015802',
    width: 120,
    borderColor: 'transparent',
  },
  buttonDelete: {
    backgroundColor: '#7f1416',
  },
});

export default VehicleListScreen;
