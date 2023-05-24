// const baseURL = 'http://127.0.0.1:8888/fyp_backend/api';
// const baseURL = 'http://192.168.18.191:8888/fyp_backend/api';
const baseURL = 'http://10.0.2.2:8888/fyp_backend/api';

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/x-www-form-urlencoded',
  //   'Access-Control-Allow-Origin': '*',
  //   'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
};

function fetchApi(url, options = {}) {
  const fetchOptions = {
    ...options,
    headers: {
      ...headers,
      ...options.headers,
    },
  };

  return fetch(baseURL + url, fetchOptions)
    .then(response => response.json())
    .then(data => {
      // Handle the response data
      return data;
    })
    .catch(error => {
      // Handle the error
      console.error(error);
      throw error;
    });
}

export default fetchApi;
