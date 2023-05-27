import AsyncStorage from '@react-native-async-storage/async-storage';
import fetchApi from './fetchApi';

const vehicleId = AsyncStorage.getItem('vehicleId');
const updateGeolocation = async (totalKilometers, latitude, longitude) => {
  try {
    const payload = {
      vehicleId,
      totalKilometers,
      latitude,
      longitude,
    };

    const response = await fetchApi('/updateVehicleGeolocation', {
      method: 'POST',
      body: JSON.stringify(payload),
    });

    console.log('Geolocation data updated:', response);
  } catch (error) {
    console.log('Error updating geolocation:', error);
  }
};

export default updateGeolocation;
