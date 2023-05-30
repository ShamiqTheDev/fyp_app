/* eslint-disable no-shadow */
/* eslint-disable no-catch-shadow */
import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Button, TextInput} from 'react-native-paper';

import {createPartsRegistration} from '../services/partsRegistrationServiceFA';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PartsRegistrationScreen = ({navigation}) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [activeVehicle, setActiveVehicle] = useState({});
  const [error, setError] = useState('');

  const handleRegistrationBase = async navigateTo => {
    try {
      const response = await createPartsRegistration(name, description);
      if (response.status === true) {
        setName('');
        setDescription('');
        navigation.navigate(navigateTo);
        console.log('Navifation to MyVehicleParts');
      }
      // Handle the response here
      console.log(response);
    } catch (error) {
      // Handle the error or validation errors here
      console.log(error);
    }
  };

  const handleRegistration = async vehicle => {
    navigation.navigate('InternalRoutes', {
      screen: 'AllPartsByVehicle',
      params: {vehicle},
    });
  };

  const handleMoreRegistration = () => {
    handleRegistrationBase('PartsRegistration');
  };

  // const handleExpiries = (vehicle, part) => {
  //   navigation.navigate('InternalRoutes', {
  //     screen: 'AddExpiry',
  //     params: {vehicle, part},
  //   });
  //   navigation.navigate('AddExpiry');
  // };
  const getActiveVehicle = async () => {
    const activeVehicle = await AsyncStorage.getItem('active_vehicle');

    setActiveVehicle(JSON.parse(activeVehicle));
  };
  useEffect(() => {
    getActiveVehicle();
  });
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Add Parts for {activeVehicle.name} ({activeVehicle.number})
      </Text>
      <TextInput
        mode="outlined"
        label="Name"
        value={name}
        onChangeText={text => setName(text)}
        style={styles.input}
      />
      <TextInput
        mode="outlined"
        multiline={true}
        numberOfLines={4}
        label="Description"
        value={description}
        onChangeText={text => setDescription(text)}
        style={styles.input}
      />
      <Button
        mode="contained"
        onPress={handleMoreRegistration}
        style={styles.button}>
        Register and Add more Parts
      </Button>
      <Button
        mode="outlined"
        onPress={() => handleRegistration(activeVehicle)}
        style={styles.button}>
        Register Part!
      </Button>
      {/* <Button
        mode="outlined"
        onPress={handleExpiries}
        textColor="#7f1416"
        style={styles.buttonExpiry}>
        Add Expiries Now?
      </Button> */}
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
  // buttonExpiry: {
  //   marginTop: 16,
  //   borderColor: '#7f1416',
  // },
  errorText: {
    color: 'red',
    marginTop: 16,
    textAlign: 'center',
  },
});

export default PartsRegistrationScreen;
