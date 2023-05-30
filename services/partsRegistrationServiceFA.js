import fetchApi from './fetchApi';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const createPartsRegistration = async (name, description) => {
  try {
    const token = await AsyncStorage.getItem('token');
    const userData = await AsyncStorage.getItem('user');
    const userId = JSON.parse(userData).id;

    let activeVehicle = await AsyncStorage.getItem('active_vehicle');
    activeVehicle = JSON.parse(activeVehicle);

    const vehicleId = activeVehicle.id;

    const params = {
      user_id: userId,
      vehicle_id: vehicleId,
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

export const updatePartRegistration = async (id, name, number) => {
  try {
    const token = await AsyncStorage.getItem('token');

    const params = {
      name: name,
      number: number,
    };

    const response = await fetchApi(`/parts/update/${id}`, {
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

export const deletePartRegistration = async id => {
  try {
    const token = await AsyncStorage.getItem('token');
    const response = await fetchApi(`/parts/delete/${id}`, {
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

export const fetchAllPartsRegistrationsByVehicleId = async id => {
  try {
    const token = await AsyncStorage.getItem('token');
    const response = await fetchApi(`/parts/getAllByVehicleId/${id}`, {
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
