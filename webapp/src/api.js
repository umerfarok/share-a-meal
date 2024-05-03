// useApi.js
import { useContext } from 'react';
import { useQuery, useMutation } from 'react-query';
import axios from 'axios';
import { AuthContext } from './Auth/AuthContext';

export function useGetApi(endpoint, queryKey) {
  const { token } = useContext(AuthContext);

  const fetchData = async () => {
    const config = {
      method: 'get',
      url: `${import.meta.env.VITE_APP_API_BASE_URL}${endpoint}`,
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
      },
    };

    const response = await axios(config);
    return response.data;
  };

  return useQuery(queryKey, fetchData, { enabled: !!token, retry: 3 });
}

export function usePostApi(endpoint, data) {
  const { token } = useContext(AuthContext);

  const postData = async () => {
    const config = {
      method: 'post',
      url: `${import.meta.env.VITE_APP_API_BASE_URL}${endpoint}`,
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
      },
      data,
    };

    const response = await axios(config);
    return response.data;
  };

  return useMutation(postData);
}