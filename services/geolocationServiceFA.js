import fetchApi from './fetchApi';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const updateGeolocation = async (distance, latitude, longitude) => {
  try {
    const token = await AsyncStorage.getItem('token');

    let activeVehicle = await AsyncStorage.getItem('active_vehicle');
    activeVehicle = JSON.parse(activeVehicle);
    const vehicleId = activeVehicle.id;

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

    // console.log('Geolocation data updated:', response);
  } catch (error) {
    console.log('Error updating geolocation:', error);
  }
};
