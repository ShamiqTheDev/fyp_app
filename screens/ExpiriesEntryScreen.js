/* eslint-disable no-shadow */
/* eslint-disable no-catch-shadow */
import React, {useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Button, TextInput} from 'react-native-paper';

import {createExpiry} from '../services/expiriesService';

const ExpiriesEntryScreen = () => {
  const [vehicleId, setVehicleId] = useState('');
  const [partId, setPartId] = useState('');
  //   const [type, setType] = useState('');
  const [expiry, setExpiry] = useState('');
  const [notifyBefore, setNotifyBefore] = useState('');
  const [note, setNote] = useState('');
  const [error, setError] = useState('');

  const handleRegistration = async () => {
    try {
      const response = await createExpiry(
        vehicleId,
        partId,
        // type,
        expiry,
        notifyBefore,
        note,
      );

      // Handle the response here
      console.log(response);
    } catch (error) {
      // Handle the error or validation errors here
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Expiries Entry</Text>
      <TextInput
        label="Vehicle ID"
        value={vehicleId}
        onChangeText={text => setVehicleId(text)}
        style={styles.input}
      />
      <TextInput
        label="Part ID"
        value={partId}
        onChangeText={text => setPartId(text)}
        style={styles.input}
      />
      {/* <TextInput
        label="Type"
        value={type}
        onChangeText={text => setType(text)}
        style={styles.input}
      /> */}
      <TextInput
        label="Expiry(Kilo Metres)"
        value={expiry}
        onChangeText={text => setExpiry(text)}
        style={styles.input}
      />
      <TextInput
        label="Alert Before (Kilo Metres)"
        value={notifyBefore}
        onChangeText={text => setNotifyBefore(text)}
        style={styles.input}
      />
      <TextInput
        multiline={true}
        numberOfLines={4}
        label="Note"
        value={note}
        onChangeText={text => setNote(text)}
        style={styles.input}
      />
      <Button
        mode="contained"
        onPress={handleRegistration}
        style={styles.button}>
        Register Expiry
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

export default ExpiriesEntryScreen;
