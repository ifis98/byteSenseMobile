import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const backendLink = 'http://13.59.234.168:4000/';

// Create a new axios instance with base configuration
const api = axios.create({
  baseURL: backendLink,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to automatically add the token from AsyncStorage (if available)
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Generic error handler
const handleApiError = (error) => {
  let message = 'Something went wrong!';
  if (error.response) {
    message = error.response.data.message || message;
  } else if (error.message) {
    message = error.message;
  }
  return message;
};

// Login API
export const login = async (userName, password) => {
  try {
    const response = await api.post('/user/loginMobile', { userName, password });
    const { token } = response.data;

    await AsyncStorage.setItem('token', token);
    console.log('login api response',response);

    return token;
  } catch (error) {

    throw new Error(handleApiError(error));
  }
};

export const register = async (fName, lName, userName, email, password, confirmPassword, isDoctor) => {
  try {
    const response = await api.post('/user/signup', {
      fName,
      lName,
      userName,
      email,
      password,
      confirmPassword,
      isDoctor,
    });
    return response.data;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};
// Example for other APIs: Fetch user profile
export const fetchUserProfile = async () => {
  try {
    const response = await api.get('/user/profile');
    return response.data;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};
export const getObservers = async () => {
  try{
    const response = await api.get('/myDoctor');
    return response.data;
  }
  catch (error) {
    throw new Error(handleApiError(error));
  }
};
export const withdrawRequest = async (body) => {
  try{
    const response = await api.post('/withdrawRequest',body);
    return response.data;
  }
  catch (error) {
    throw new Error(handleApiError(error));
  }
};
export const sendRequest = async (body) => {
  try{
    const response = await api.post('/sendRequest',body);
    return response.data;
  }
  catch (error) {
    throw new Error(handleApiError(error));
  }
};
export default api;
