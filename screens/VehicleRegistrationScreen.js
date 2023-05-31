/* eslint-disable no-shadow */
/* eslint-disable no-catch-shadow */
import React, {useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Button, TextInput} from 'react-native-paper';

import {createVehicleRegistration} from '../services/vehicleRegistrationServiceFA';
import AsyncStorage from '@react-native-async-storage/async-storage';

const VehicleRegistrationScreen = ({navigation}) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [error, setError] = useState('');

  const handleRegistration = async () => {
    handleRegistrationBase('MyVehicles');
  };

  const handleRegisterVehicleAndParts = async () => {
    handleRegistrationBase('PartsRegistration');
  };

  const handleRegistrationBase = async navigateTo => {
    try {
      const response = await createVehicleRegistration(name, number);

      if (response.status === true) {
        setName('');
        setNumber('');
        // Append the new vehicle registration to AsyncStorage
        const vehicleRegistrations = await AsyncStorage.getItem(
          'vehicle_registrations',
        );
        const parsedRegistrations = JSON.parse(vehicleRegistrations) || [];
        const updatedRegistrations = [...parsedRegistrations, response.data];

        console.log('SET active_vehicle', response.data);
        await AsyncStorage.multiSet([
          ['active_vehicle', JSON.stringify(response.data)],
          ['vehicle_registrations', JSON.stringify(updatedRegistrations)],
        ]);

        // Navigate to the "MyVehicle" screen
        navigation.navigate(navigateTo);
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
      <Text style={styles.title}>Vehicle Registration</Text>
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
      <Button
        mode="contained"
        onPress={handleRegistration}
        style={styles.button}>
        Register Vehicle
      </Button>
      <Button
        mode="contained"
        onPress={handleRegisterVehicleAndParts}
        style={styles.button}>
        Register Vehicle and Add Parts!
      </Button>
      {error !== '' && <Text style={styles.errorText}>{error}</Text>}
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
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 16,
  },
  errorText: {
    color: 'red',
    marginTop: 16,
    textAlign: 'center',
  },
});

export default VehicleRegistrationScreen;
