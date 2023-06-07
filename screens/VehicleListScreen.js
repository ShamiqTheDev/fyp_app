import React, {useEffect, useState, useCallback} from 'react';
import {View, StyleSheet, Text, ScrollView} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import {Card, Button, TextInput, Title} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  createVehicleRegistration,
  deleteVehicleRegistration,
  fetchVehicleRegistrationsByUserId,
} from '../services/vehicleRegistrationServiceFA';

const VehicleListScreen = ({navigation}) => {
  const [vehicleRegistrations, setVehicleRegistrations] = useState([]);
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [activeVehicleId, setActiveVehicleId] = useState(null);

  const isFocused = useIsFocused();

  // const fetchVehicleRegistrations = useCallback(async () => {
  //   try {
  //     const registrations = await AsyncStorage.getItem('vehicle_registrations');
  //     const parsedRegistrations = JSON.parse(registrations) || {};
  //     setVehicleRegistrations(parsedRegistrations);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }, []);

  // useEffect(() => {
  //   fetchVehicleRegistrations();
  // }, [isFocused, fetchVehicleRegistrations]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchVehicleRegistrationsByUserId();
        if (response.status === true) {
          setVehicleRegistrations(response.data);
        } else {
          console.log(response.message);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [isFocused]);

  // const handleVehicle = useCallback(async () => {
  //   try {
  //     const response = await createVehicleRegistration(name, number);
  //     if (response.status === true) {
  //       const updatedRegistrations = [...vehicleRegistrations, response.data];
  //       setVehicleRegistrations(updatedRegistrations);
  //       await AsyncStorage.multiSet([
  //         ['vehicle_registrations', JSON.stringify(updatedRegistrations)],
  //         ['active_vehicle', JSON.stringify(response.data)],
  //         ['total_kilometers', response.data.distance],
  //       ]);
  //       navigation.navigate('Dashboard');
  //     } else {
  //       console.log(response);
  //     }
  //     setName('');
  //     setNumber('');
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }, [name, number, vehicleRegistrations, navigation]);

  const handleVehicle = useCallback(async () => {
    try {
      const response = await createVehicleRegistration(name, number);
      if (response.status === true) {
        setVehicleRegistrations([...vehicleRegistrations, response.data]);
        await AsyncStorage.multiSet([
          ['active_vehicle', JSON.stringify(response.data)],
          ['total_kilometers', response.data.distance],
        ]);
        navigation.navigate('Dashboard');
      } else {
        console.log(response);
      }
      setName('');
      setNumber('');
    } catch (error) {
      console.log(error);
    }
  }, [name, number, vehicleRegistrations, navigation]);

  const handleEdit = useCallback(
    vehicle => {
      navigation.navigate('InternalRoutes', {
        screen: 'EditVehicle',
        params: {vehicle},
      });
    },
    [navigation],
  );

  // const handleDelete = useCallback(async vehicle => {
  //   try {
  //     const response = await deleteVehicleRegistration(vehicle.id);
  //     if (response.status === true) {
  //       const [registrations, activeVehicle] = await AsyncStorage.multiGet([
  //         'vehicle_registrations',
  //         'active_vehicle',
  //       ]);
  //       const parsedRegistrations = JSON.parse(registrations) || {};
  //       const updatedRegistrations = parsedRegistrations.filter(
  //         registration => registration.id !== vehicle.id,
  //       );
  //       await AsyncStorage.multiSet([
  //         ['vehicle_registrations', JSON.stringify(updatedRegistrations)],
  //         ['active_vehicle', activeVehicle],
  //       ]);
  //       console.log(updatedRegistrations);
  //       setVehicleRegistrations(updatedRegistrations); // Update the state here
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }, []);

  const handleDelete = useCallback(
    async vehicle => {
      try {
        const response = await deleteVehicleRegistration(vehicle.id);
        if (response.status === true) {
          const updatedRegistrations = vehicleRegistrations.filter(
            registration => registration.id !== vehicle.id,
          );
          setVehicleRegistrations(updatedRegistrations); // Update the state here
          await AsyncStorage.setItem(
            'vehicle_registrations',
            JSON.stringify(updatedRegistrations),
          );
        }
      } catch (error) {
        console.log(error);
      }
    },
    [vehicleRegistrations],
  );

  useEffect(() => {
    const getActiveVehicleId = async () => {
      try {
        const vehicle = await AsyncStorage.getItem('active_vehicle');
        if (vehicle !== null) {
          setActiveVehicleId(JSON.parse(vehicle).id.toString());
        }
      } catch (error) {
        console.log('Error retrieving active_vehicle:', error);
      }
    };
    getActiveVehicleId();
  }, []);

  // const handleUseNow = useCallback(
  //   async vehicle => {
  //     try {
  //       await AsyncStorage.multiSet([
  //         ['active_vehicle', JSON.stringify(vehicle)],
  //         ['total_kilometers', vehicle.distance],
  //       ]);
  //       setActiveVehicleId(vehicle.id.toString());
  //       navigation.navigate('Dashboard');
  //     } catch (error) {
  //       console.log('Error updating active_vehicle:', error);
  //     }
  //   },
  //   [navigation],
  // );

  const handleUseNow = useCallback(
    async vehicle => {
      try {
        if (vehicle.distance !== undefined) {
          console.log(vehicle);
          await AsyncStorage.multiSet([
            ['active_vehicle', JSON.stringify(vehicle)],
            ['total_kilometers', vehicle.distance.toString()],
          ]);
          // console.log('vehicle.distance', vehicle.distance);
          // console.log(
          //   'total_kilometers',
          //   await AsyncStorage.getItem('total_kilometers'),
          // );
        } else {
          await AsyncStorage.setItem('active_vehicle', JSON.stringify(vehicle));
        }
        setActiveVehicleId(vehicle.id.toString());
        navigation.navigate('Dashboard', {
          vehicle: vehicle,
        });
      } catch (error) {
        console.log('Error updating active_vehicle:', error);
      }
    },
    [navigation],
  );

  const handleVehicleParts = useCallback(
    async vehicle => {
      try {
        await AsyncStorage.setItem('active_vehicle', JSON.stringify(vehicle));
        setActiveVehicleId(vehicle.id.toString());
        navigation.navigate('PartsRegistration');
      } catch (error) {
        console.log('Error updating active_vehicle:', error);
      }
    },
    [navigation],
  );

  const handleCardClick = useCallback(
    vehicle => {
      navigation.navigate('InternalRoutes', {
        screen: 'AllPartsByVehicle',
        params: {vehicle},
      });
    },
    [navigation],
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {vehicleRegistrations.length > 0 && (
        <View style={styles.listContainer}>
          <Text style={styles.heading}>Vehicle List</Text>
          {vehicleRegistrations.map(vehicle => (
            <Card
              key={vehicle.id}
              style={styles.card}
              onPress={() => handleCardClick(vehicle)}>
              <Card.Content>
                <Title style={styles.cardText}>Name: {vehicle.name}</Title>
                <Text style={styles.cardText}>Number: {vehicle.number}</Text>
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
    color: 'black',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: 'black',
  },
  card: {
    marginBottom: 16,
  },
  cardText: {
    color: 'black',
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
