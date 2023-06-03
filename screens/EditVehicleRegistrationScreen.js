import React, {useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Button, TextInput} from 'react-native-paper';

import {updateVehicleRegistration} from '../services/vehicleRegistrationServiceFA';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EditVehicleRegistrationScreen = ({navigation, route}) => {
  const {vehicle} = route.params;
  const [name, setName] = useState(vehicle.name);
  const [number, setNumber] = useState(vehicle.number);

  const [error, setError] = useState('');

  const handleUpdate = async () => {
    try {
      const response = await updateVehicleRegistration(
        vehicle.id,
        name,
        number,
      );

      if (response.status === true) {
        // Retrieve the existing registrations from AsyncStorage
        const vehicleRegistrations = await AsyncStorage.getItem(
          'vehicle_registrations',
        );
        const parsedRegistrations = JSON.parse(vehicleRegistrations) || [];

        // Find the index of the record that needs to be updated based on the id
        const recordIndex = parsedRegistrations.findIndex(
          registration => registration.id === response.data.id,
        );

        // If the record with the specified id is found, update it
        if (recordIndex !== -1) {
          parsedRegistrations[recordIndex] = response.data;
        }

        // Store the updated registrations back to AsyncStorage
        await AsyncStorage.setItem(
          'vehicle_registrations',
          JSON.stringify(parsedRegistrations),
        );

        navigation.navigate('MyVehicles');
      } else {
        console.log(response.message);
      }
      console.log(response);
    } catch (error) {
      // Handle the error or validation errors here
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Vehicle Registration</Text>
      <TextInput
        mode="outlined"
        label="Name"
        value={name}
        onChangeText={text => setName(text)}
        style={styles.input}
      />
      <TextInput
        mode="outlined"
        label="Number"
        value={number}
        onChangeText={text => setNumber(text)}
        style={styles.input}
      />
      <Button mode="contained" onPress={handleUpdate} style={styles.button}>
        Update Vehicle
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: 'black',
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 16,
  },
});

export default EditVehicleRegistrationScreen;
