/* eslint-disable no-shadow */
/* eslint-disable no-catch-shadow */
import {loginUser} from '../services/authServiceFA';
import React, {useState} from 'react';
import {View, StyleSheet, Text, Image, ScrollView} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import messaging from '@react-native-firebase/messaging';

import AsyncStorage from '@react-native-async-storage/async-storage';

// Import your application logo
import LogoImage from '../assets/logo_1.png';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigation = useNavigation();

  const handleLoginButtonPress = async () => {
    try {
      const response = await loginUser(email, password);
      if (response.status === true) {
        const fcm_token = await messaging().getToken();
        const token = response.token;
        console.log('FCM Token:', fcm_token);
        console.log('LogedIn', response.data);


        await AsyncStorage.multiSet([
          ['token', token],
          ['fcm_token', fcm_token],
          ['user', JSON.stringify(response.data)],
          [
            'vehicle_registrations',
            JSON.stringify(response.data.vehicle_registrations),
          ],
          [
            'active_vehicle',
            JSON.stringify(response.data.vehicle_registrations[0]),
          ],
          ['total_kilometers', response.data.vehicle_registrations[0].distance],
        ]);

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
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={LogoImage} style={styles.logo} />
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.title}>Login</Text>
        <TextInput
          label="Email"
          value={email}
          mode="outlined"
          onChangeText={text => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          label="Password"
          value={password}
          mode="outlined"
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 80, // Adjust the margin top value as needed
  },
  logo: {
    width: 260,
    height: 120,
    marginTop: 40,
    marginBottom: 0,
    alignSelf: 'center',
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: 'black',
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
    color: 'black',
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
