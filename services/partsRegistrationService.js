import api from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const createPartsRegistration = async (name, description) => {
  try {
    const token = await AsyncStorage.getItem('token');
    const userData = await AsyncStorage.getItem('user');
    const userId = JSON.parse(userData).id;

    const response = await api.post(
      '/parts/create',
      `user_id=${userId}&name=${encodeURIComponent(
        name,
      )}&description=${encodeURIComponent(description)}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const fetchPartsRegistrations = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    const response = await api.get('/parts/getAll', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
