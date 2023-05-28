/* eslint-disable no-shadow */
/* eslint-disable no-catch-shadow */
import {loginUser} from '../services/authServiceFA';
import React, {useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigation = useNavigation();

  const handleLoginButtonPress = async () => {
    try {
      const response = await loginUser(email, password);
      if (response.status === true) {
        await AsyncStorage.setItem('token', response.token);
        await AsyncStorage.setItem('user', JSON.stringify(response.data));
        navigation.replace('AuthenticatedRoutes');

        console.log('Logged In', response);
      } else {
        setError(response.message);
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
      console.log(error);
    }
  };

  const handleSignup = () => {
    navigation.replace('Registration');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        label="Email"
        value={email}
        onChangeText={text => setEmail(text)}
        style={styles.input}
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={text => setPassword(text)}
        secureTextEntry={true}
        style={styles.input}
      />
      <Button
        mode="contained"
        onPress={handleLoginButtonPress}
        style={styles.button}>
        Login
      </Button>
      <Text style={styles.signupText}>
        Don't have an account?{' '}
        <Text style={styles.signupLink} onPress={handleSignup}>
          Signup
        </Text>
      </Text>
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
  signupText: {
    marginTop: 16,
    textAlign: 'center',
  },
  signupLink: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
  errorText: {
    color: 'red',
    marginTop: 16,
    textAlign: 'center',
  },
});

export default LoginScreen;
