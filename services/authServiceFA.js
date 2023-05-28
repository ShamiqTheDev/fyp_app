import fetchApi from './fetchApi';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const registerUser = async userData => {
  try {
    const response = await fetchApi('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
      headers: {
        'Content-Type': 'application/json', // Set the Content-Type header to JSON
      },
    });
    //   await AsyncStorage.getItem('token');
    return response;
  } catch (error) {
    console.log(error);
    // Handle any errors or validation errors from the API
    throw error;
  }
};

export const loginUser = async (email, password) => {
  try {
    const response = await fetchApi('/auth/login', {
      method: 'POST',
      body: JSON.stringify({email, password}), // Stringify the object as JSON
      headers: {
        'Content-Type': 'application/json', // Set the Content-Type header to JSON
      },
    });
    return response;
  } catch (error) {
    console.log(error);
    // Handle any errors or validation errors from the API
    throw error;
  }
};
