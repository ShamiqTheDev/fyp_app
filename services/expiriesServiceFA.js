import fetchApi from './fetchApi';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const createExpiry = async (
  vehicle_id,
  part_id,
  // type,
  expiry,
  notify_before,
  note,
) => {
  try {
    const token = await AsyncStorage.getItem('token');

    const params = {
      vehicle_id: vehicle_id,
      part_id: part_id,
      // type: type,
      expiry: expiry,
      notify_before: notify_before,
      note: note,
    };

    const response = await fetchApi('/expiries/create', {
      method: 'POST',
      body: JSON.stringify(params),
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json', // Set the Content-Type header to JSON
      },
    });

    return response;
  } catch (error) {
    throw error;
  }
};

export const fetchExpirys = async () => {
  try {
    const token = await AsyncStorage.getItem('token');

    const response = await fetchApi('/expiries/getAll', {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json', // Set the Content-Type header to JSON
      },
    });

    return response;
  } catch (error) {
    throw error;
  }
};
