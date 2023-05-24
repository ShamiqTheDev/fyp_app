import fetchApi from './fetchApi';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const createPartsRegistration = async (name, description) => {
  try {
    const token = await AsyncStorage.getItem('token');
    const userData = await AsyncStorage.getItem('user');
    const userId = JSON.parse(userData).id;

    const params = {
      user_id: userId,
      name: name,
      description: description,
    };

    const response = await fetchApi('/parts/create', {
      method: 'POST',
      body: JSON.stringify(params),
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json', // Add the JSON response header
      },
    });

    return response;
  } catch (error) {
    throw error;
  }
};

export const fetchPartsRegistrations = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    const response = await fetchApi('/parts/getAll', {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json', // Add the JSON response header
      },
    });

    return response;
  } catch (error) {
    throw error;
  }
};
