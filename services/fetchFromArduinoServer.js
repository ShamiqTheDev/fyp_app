function fetchFromArduino(url, options = {}) {
  const baseURL = 'http://192.168.4.1'; // Update with your Arduino's IP address

  const fetchOptions = {
    ...options,
    headers: {
      ...options.headers,
    },
  };

  return fetch(baseURL + url, fetchOptions)
    .then(response => response.text()) // We expect text, not JSON
    .then(data => {
      return data; // Return the fetched data
    })
    .catch(error => {
      console.error(error);
      throw error;
    });
}

export const status = async () => {
  try {
    const response = await fetchFromArduino('/');
    console.log("fetchFromArduino('/')::", response);
    return response;
  } catch (error) {
    console.error('Fetch request failed:', error);
    throw error;
  }
};

export const counter = async () => {
  try {
    const response = await fetchFromArduino('/counter');
    console.log("fetchFromArduino('/counter')::", response);
    return response;
  } catch (error) {
    console.error('Fetch request failed:', error);
    throw error;
  }
};

export const reset = async () => {
  try {
    // const response = await fetchFromArduino('/reset');
    const response = '___________counter_has_been_reset___________';
    console.log("fetchFromArduino('/reset')::", response);
    return response;
  } catch (error) {
    console.error('Fetch request failed:', error);
    throw error;
  }
};

export const distanceMetres = async () => {
  try {
    const totalPulsesInMetre = 998;
    const pulses = await counter();
    // const pulses = 1200000;
    const totalMetres = pulses / totalPulsesInMetre;
    // console.log('-------totalMetres', totalMetres);
    return totalMetres;
  } catch (error) {
    console.error('Fetch request failed:', error);
    throw error;
  }
};
