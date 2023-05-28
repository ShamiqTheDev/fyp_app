import fetchApi from './fetchApi';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const updateGeolocation = async (distance, latitude, longitude) => {
  try {
    const token = await AsyncStorage.getItem('token');
    // const vehicleId = await AsyncStorage.getItem('vehicleId');
    const vehicleId = 1;

    const params = new URLSearchParams();
    params.append('distance', distance.toString());
    params.append('latitude', latitude.toString());
    params.append('longitude', longitude.toString());

    const response = await fetchApi(
      `/vehicleRegistrations/updateVehicleGeolocation/${vehicleId}`,
      {
        method: 'POST',
        body: params.toString(),
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );

    console.log('Geolocation data updated:', response);
  } catch (error) {
    console.log('Error updating geolocation:', error);
  }
};
