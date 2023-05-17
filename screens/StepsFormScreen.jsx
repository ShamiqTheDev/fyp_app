import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Button, TextInput } from 'react-native-paper';

const StepsFormScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });

  const handleInputChange = (name, value) => {
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    // submit form data to server here
    navigation.navigate('Splash');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Steps Form</Text>
      <TextInput
        label="First Name"
        value={formData.firstName}
        onChangeText={text => handleInputChange('firstName', text)}
        style={styles.input}
      />
      <TextInput
        label="Last Name"
        value={formData.lastName}
        onChangeText={text => handleInputChange('lastName', text)}
        style={styles.input}
      />
      <TextInput
        label="Email"
        value={formData.email}
        onChangeText={text => handleInputChange('email', text)}
        style={styles.input}
      />
      <TextInput
        label="Phone"
        value={formData.phone}
        onChangeText={text => handleInputChange('phone', text)}
        style={styles.input}
      />
      <Button mode="contained" onPress={handleSubmit} style={styles.button}>
        Submit
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
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 16,
  },
});

export default StepsFormScreen;
