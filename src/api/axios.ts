import axios from 'axios';

import { authStorage } from '../packages/localStorage/authStorage';
import { Token } from './services/auth/libs/types/Token.type';

export const BASE_URL = 'http://localhost:7000/';

const $baseAPI = axios.create({
  baseURL: BASE_URL,
});

$baseAPI.interceptors.request.use((config) => {
  if (config.headers.Authorization) return config;

  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  return config;
});

$baseAPI.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && error.config && !error.config._isRetry) {
      originalRequest._isRetry = true;
      try {
        const { data } = await axios.get<Token>(`${BASE_URL}/refresh`, {
          withCredentials: true,
        });
        authStorage.setTokens(data.authorizationToken, data.refreshToken);
        return $baseAPI.request(originalRequest);
      } catch (e) {
        alert('User is not authorized');
      }
    }
    throw error;
  }
);

export default $baseAPI;
