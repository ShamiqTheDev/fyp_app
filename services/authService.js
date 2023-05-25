import api from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const registerUser = async userData => {
  try {
    const response = await api.post('/auth/register', userData);
    //   await AsyncStorage.getItem('token');
    return response.data;
  } catch (error) {
    // Handle any errors or validation errors from the API
    throw error.response.data;
  }
};

export const loginUser = async (email, password) => {
  try {
    const response = await api.post('/auth/login', {email, password});
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
    // Handle any errors or validation errors from the API
    throw error.response.data;
  }
};
