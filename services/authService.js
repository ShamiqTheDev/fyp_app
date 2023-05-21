import api from './api';
// import AsyncStorage from '@react-native-async-storage/async-storage';

export const registerUser = async userData => {
  try {
    const response = await api.post('/auth/register', userData);
    // if (response.status === true) {
    //   await AsyncStorage.setItem('token', response.token);
    //   await AsyncStorage.setItem('user', JSON.stringify(response.data));
    // }
    return response.data;
  } catch (error) {
    // Handle any errors or validation errors from the API
    throw error.response.data;
  }
};

export const loginUser = async (email, password) => {
  try {
    const response = await api.post('/auth/login', {email, password});
    // if (response.status === true) {
    //   await AsyncStorage.setItem('token', response.token);
    //   await AsyncStorage.setItem('user', JSON.stringify(response.data));
    // }
    return response.data;
  } catch (error) {
    // Handle any errors or validation errors from the API
    throw error.response.data;
  }
};
