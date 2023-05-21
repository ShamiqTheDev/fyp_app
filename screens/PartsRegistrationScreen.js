/* eslint-disable no-shadow */
/* eslint-disable no-catch-shadow */
import React, {useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Button, TextInput} from 'react-native-paper';

import {createPartsRegistration} from '../services/partsRegistrationService';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PartsRegistrationScreen = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const handleRegistration = async () => {
    try {
      const response = await createPartsRegistration(name, description);

      // Handle the response here
      console.log(response);
    } catch (error) {
      // Handle the error or validation errors here
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Parts Registration</Text>
      <TextInput
        label="Name"
        value={name}
        onChangeText={text => setName(text)}
        style={styles.input}
      />
      <TextInput
        multiline={true}
        numberOfLines={4}
        label="Description"
        value={description}
        onChangeText={text => setDescription(text)}
        style={styles.input}
      />
      <Button
        mode="contained"
        onPress={handleRegistration}
        style={styles.button}>
        Register Parts
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

export default PartsRegistrationScreen;
