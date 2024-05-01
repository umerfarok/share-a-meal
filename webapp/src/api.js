
import axios from 'axios';
import { getIdToken } from './Auth/AuthContext'; 
import process from 'process'; 

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000',
});

api.interceptors.request.use(async (config) => {
  const token = await getIdToken();
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config;
});

export default api;