import fetchApi from './fetchApi';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const createVehicleRegistration = async (name, number) => {
  try {
    const token = await AsyncStorage.getItem('token');
    const userData = await AsyncStorage.getItem('user');
    const userId = JSON.parse(userData).id;

    const params = {
      user_id: userId,
      name: name,
      number: number,
    };

    const response = await fetchApi('/vehicleRegistrations/create', {
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

export const updateVehicleRegistration = async (id, name, number) => {
  try {
    const token = await AsyncStorage.getItem('token');

    const params = {
      name: name,
      number: number,
    };

    const response = await fetchApi(`/vehicleRegistrations/update/${id}`, {
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

export const deleteVehicleRegistration = async id => {
  try {
    const token = await AsyncStorage.getItem('token');
    const response = await fetchApi(`/vehicleRegistrations/delete/${id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json', // Add the JSON response header
      },
    });
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const fetchVehicleRegistrations = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    const response = await fetchApi('/vehicleRegistrations/getAll', {
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
