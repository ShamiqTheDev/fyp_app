import api from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const createExpiry = async (
  vehicle_id,
  part_id,
  // type,
  expiry,
  notify_at,
  note,
) => {
  try {
    const token = await AsyncStorage.getItem('token');

    const params = {
      vehicle_id: vehicle_id,
      part_id: part_id,
      // type: type,
      expiry: expiry,
      notify_at: notify_at,
      note: note,
    };

    const response = await api.post('/expiries/create', params, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const fetchExpirys = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    const response = await api.get('/expiries/getAll', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
