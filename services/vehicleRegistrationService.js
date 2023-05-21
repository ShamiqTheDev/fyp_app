import api from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const createVehicleRegistration = async ( name, number) => {
  try {
    const token = await AsyncStorage.getItem('token');
    const userData = await AsyncStorage.getItem('user');
    const userId = JSON.parse(userData).id;

    const response = await api.post(
      '/vehicleRegistrations/create',
      `user_id=${userId}&name=${encodeURIComponent(
        name,
      )}&number=${encodeURIComponent(number)}`,
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

export const fetchVehicleRegistrations = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    const response = await api.get('/vehicleRegistrations/getAll', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
